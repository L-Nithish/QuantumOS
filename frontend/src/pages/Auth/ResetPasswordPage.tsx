import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { authService } from '../../api/authService';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setStatus('error');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!token) return;
    
    setStatus('loading');
    try {
      await authService.resetPassword(token, password);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal text-zinc-100">
        <div className="bg-graphite p-8 rounded-lg shadow-xl text-center">
          <p className="text-red-400">Invalid or missing reset token.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-zinc-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-graphite p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Password</h2>
        
        {status === 'success' ? (
          <div className="text-center space-y-4">
            <div className="text-green-400 bg-green-900/20 p-4 rounded-md">
              Password has been reset successfully.
            </div>
            <a href="/login" className="inline-block text-blue-400 hover:text-blue-300">
              Return to Login
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-400 mb-1" htmlFor="password">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={20} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-charcoal border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-zinc-400 mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={20} />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-charcoal border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            {status === 'error' && (
              <div className="text-red-400 text-sm">Failed to reset password. The token may be expired.</div>
            )}
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
