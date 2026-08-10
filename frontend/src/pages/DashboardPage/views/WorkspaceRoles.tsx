import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const WorkspaceRoles = () => {
  const roles = [
    { name: 'Owner', description: 'Full access to all workspace settings and data.', users: 1 },
    { name: 'Admin', description: 'Can manage users and most settings, cannot delete workspace.', users: 3 },
    { name: 'Member', description: 'Can access and edit content, cannot change settings.', users: 12 },
    { name: 'Viewer', description: 'Read-only access to content.', users: 5 },
  ];

  return (
    <div className="p-6 text-white h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center"><Shield className="mr-2" /> Roles & Permissions</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Create Custom Role
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role, i) => (
          <motion.div 
            key={role.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{role.name}</h3>
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{role.users} users</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 flex-grow">{role.description}</p>
            <div className="pt-4 border-t border-gray-700 mt-auto">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit Permissions</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
