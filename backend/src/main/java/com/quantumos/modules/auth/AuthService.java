package com.quantumos.modules.auth;

import com.quantumos.modules.auth.dto.AuthResponse;
import com.quantumos.modules.auth.dto.LoginRequest;
import com.quantumos.modules.auth.dto.RegisterRequest;
import com.quantumos.modules.user.User;
import com.quantumos.modules.user.UserRepository;
import com.quantumos.security.CustomUserDetails;
import com.quantumos.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .isVerified(false)
                .build();

        userRepository.save(user);

        String jwtToken = jwtUtil.generateToken(new CustomUserDetails(user));

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        String jwtToken = jwtUtil.generateToken(new CustomUserDetails(user));

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        String token = java.util.UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(java.time.LocalDateTime.now().plusHours(24))
                .build();
        passwordResetTokenRepository.save(resetToken);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired token."));

        if (resetToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            throw new IllegalArgumentException("Token has expired.");
        }

        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }

    public void verifyEmail(String token) {
        String email = jwtUtil.extractUsername(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token."));
        
        user.setIsVerified(true);
        userRepository.save(user);
    }
}
