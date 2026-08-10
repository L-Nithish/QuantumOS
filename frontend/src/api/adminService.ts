export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

export const adminService = {
  getUsers: async (): Promise<User[]> => {
    return [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
      { id: '2', name: 'Bob Jones', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    ];
  },
  getAuditLogs: async (): Promise<AuditLog[]> => {
    return [
      { id: 'AL-001', action: 'User login', user: 'Alice Smith', timestamp: new Date().toISOString() },
      { id: 'AL-002', action: 'Workspace created', user: 'Bob Jones', timestamp: new Date(Date.now() - 3600000).toISOString() },
    ];
  }
};
