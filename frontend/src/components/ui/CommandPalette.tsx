import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, User, FileText, Activity, X } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const items = [
    { icon: <Settings size={18} />, label: 'Settings', shortcut: 'S' },
    { icon: <User size={18} />, label: 'Profile', shortcut: 'P' },
    { icon: <FileText size={18} />, label: 'Documentation', shortcut: 'D' },
    { icon: <Activity size={18} />, label: 'System Status', shortcut: 'A' },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-slate-800">
              <Search size={20} className="text-slate-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 transition-colors group text-left"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-slate-400 group-hover:text-blue-400">{item.icon}</span>
                    <span className="flex-1 font-medium">{item.label}</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-300">
                      {item.shortcut}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-slate-500">
                  No results found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
