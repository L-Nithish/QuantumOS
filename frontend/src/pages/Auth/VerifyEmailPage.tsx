import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authService } from '../../api/authService';

export const VerifyEmailPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite p-8 rounded-lg shadow-xl max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 size={48} className="animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold">Verifying Email...</h2>
            <p className="text-zinc-400">Please wait while we verify your email address.</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle size={48} className="text-green-500" />
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-zinc-400">Your email has been successfully verified.</p>
            <a href="/login" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors inline-block">
              Continue to Login
            </a>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle size={48} className="text-red-500" />
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-zinc-400">The verification link is invalid or has expired.</p>
            <a href="/" className="mt-4 text-blue-400 hover:text-blue-300">
              Return to Home
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
