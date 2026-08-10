import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';
import { notificationService, Notification } from '../../../api/notificationService';

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    notificationService.getNotifications().then(setNotifications);
  }, []);

  const filteredNotifications = notifications.filter(n => filter === 'all' || !n.read);

  const markAsRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="p-6 text-white h-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center"><Bell className="mr-2" /> Notifications</h2>
      
      <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
        <button 
          className={`pb-2 ${filter === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`pb-2 ${filter === 'unread' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notif) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg flex items-start justify-between border ${notif.read ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-800 border-gray-600'}`}
          >
            <div>
              <h3 className={`font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>{notif.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
              <span className="text-xs text-gray-500 mt-2 block">{new Date(notif.createdAt).toLocaleString()}</span>
            </div>
            {!notif.read && (
              <button 
                onClick={() => markAsRead(notif.id)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
                title="Mark as read"
              >
                <CheckCircle size={20} />
              </button>
            )}
          </motion.div>
        ))}
        {filteredNotifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">No notifications found.</div>
        )}
      </div>
    </div>
  );
};
