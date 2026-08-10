import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search } from 'lucide-react';
import { adminService, AuditLog } from '../../../api/adminService';

export const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    adminService.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6 text-white h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center"><ClipboardList className="mr-2" /> Audit Logs</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-medium text-gray-300">Log ID</th>
              <th className="p-4 font-medium text-gray-300">Action</th>
              <th className="p-4 font-medium text-gray-300">User</th>
              <th className="p-4 font-medium text-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="p-4 text-gray-500 font-mono text-sm">{log.id}</td>
                <td className="p-4 text-gray-200">{log.action}</td>
                <td className="p-4 text-gray-400">{log.user}</td>
                <td className="p-4 text-gray-400 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};
