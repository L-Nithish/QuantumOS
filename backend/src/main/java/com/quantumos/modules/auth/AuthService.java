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
}
