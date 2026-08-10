import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', activeUsers: 4000, newSignups: 240 },
  { name: 'Tue', activeUsers: 3000, newSignups: 139 },
  { name: 'Wed', activeUsers: 2000, newSignups: 980 },
  { name: 'Thu', activeUsers: 2780, newSignups: 390 },
  { name: 'Fri', activeUsers: 1890, newSignups: 480 },
  { name: 'Sat', activeUsers: 2390, newSignups: 380 },
  { name: 'Sun', activeUsers: 3490, newSignups: 430 },
];

export const SystemAnalytics = () => {
  return (
    <div className="p-6 text-white h-full space-y-6">
      <h2 className="text-2xl font-bold flex items-center"><Activity className="mr-2" /> System Analytics</h2>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-6">Active Users</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }} 
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Area type="monotone" dataKey="activeUsers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-6">New Signups</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#e5e7eb' }}
                  cursor={{ fill: '#374151', opacity: 0.4 }}
                />
                <Bar dataKey="newSignups" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
