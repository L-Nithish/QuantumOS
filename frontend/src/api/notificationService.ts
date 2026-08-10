export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    return [
      { id: '1', title: 'Welcome to QuantumOS', message: 'Thanks for signing up.', read: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'System Update', message: 'Version 2.0 is now live.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    ];
  },
  markAsRead: async (id: string): Promise<void> => {
    // Mock API call
    return Promise.resolve();
  }
};
