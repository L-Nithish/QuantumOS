import React from 'react';
import { motion } from 'framer-motion';
import { Settings, AlertTriangle } from 'lucide-react';

export const WorkspaceSettings = () => {
  return (
    <div className="p-6 text-white h-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center"><Settings className="mr-2" /> Workspace Settings</h2>
      
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Workspace Name</label>
              <input type="text" defaultValue="My Workspace" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Workspace ID</label>
              <div className="flex">
                <input type="text" readOnly value="ws_123456789" className="w-full bg-gray-900/50 border border-gray-700 rounded-l-lg p-2 text-gray-500 cursor-not-allowed" />
                <button className="bg-gray-700 hover:bg-gray-600 px-4 rounded-r-lg transition-colors">Copy</button>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-2">
              Save Changes
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-red-900/20 rounded-xl p-6 border border-red-900/50">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-red-500"><AlertTriangle className="mr-2" /> Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-red-900/30">
              <div>
                <div className="font-medium text-gray-200">Transfer Ownership</div>
                <div className="text-sm text-gray-500">Transfer this workspace to another user.</div>
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">Transfer</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-red-900/30">
              <div>
                <div className="font-medium text-red-400">Delete Workspace</div>
                <div className="text-sm text-gray-500">Permanently remove this workspace and all its data.</div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">Delete</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
