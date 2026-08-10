import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { label: 'Command Palette', keys: ['⌘', 'K'] },
    { label: 'Show Shortcuts', keys: ['?'] },
    { label: 'Toggle Sidebar', keys: ['⌘', 'B'] },
    { label: 'Search', keys: ['/'] },
    { label: 'Go to Dashboard', keys: ['G', 'D'] },
    { label: 'Go to Settings', keys: ['G', 'S'] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                <div className="flex items-center text-white font-semibold">
                  <Keyboard size={20} className="mr-2 text-slate-400" />
                  Keyboard Shortcuts
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{shortcut.label}</span>
                      <div className="flex space-x-1">
                        {shortcut.keys.map((k, i) => (
                          <kbd
                            key={i}
                            className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 font-mono"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
