import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MoreHorizontal } from 'lucide-react';
import { adminService, User } from '../../../api/adminService';

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    adminService.getUsers().then(setUsers);
  }, []);

  return (
    <div className="p-6 text-white h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center"><Users className="mr-2" /> User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Invite User
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-medium text-gray-300">Name</th>
              <th className="p-4 font-medium text-gray-300">Email</th>
              <th className="p-4 font-medium text-gray-300">Role</th>
              <th className="p-4 font-medium text-gray-300">Status</th>
              <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-gray-200">{user.name}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4 text-gray-300">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
