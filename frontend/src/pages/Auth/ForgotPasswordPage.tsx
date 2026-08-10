import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '../../api/authService';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await authService.forgotPassword(email);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="flex items-center mb-6">
          <button onClick={() => window.history.back()} className="text-zinc-400 hover:text-white mr-4">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">Reset Password</h2>
        </div>
        
        {status === 'success' ? (
          <div className="text-green-400 bg-green-900/20 p-4 rounded-md">
            If an account exists for {email}, you will receive a password reset link shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-400 mb-1" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Mail size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-charcoal border border-zinc-700 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            {status === 'error' && (
              <div className="text-red-400 text-sm">An error occurred. Please try again.</div>
            )}
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
