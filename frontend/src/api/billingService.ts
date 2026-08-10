export interface Plan {
  name: string;
  price: string;
  features: string[];
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

export const billingService = {
  getCurrentPlan: async (): Promise<Plan> => {
    return { name: 'Pro Plan', price: '$29/mo', features: ['Unlimited Workspaces', 'Priority Support', 'Advanced Analytics'] };
  },
  getInvoices: async (): Promise<Invoice[]> => {
    return [
      { id: 'INV-001', date: '2023-10-01', amount: '$29.00', status: 'Paid' },
      { id: 'INV-002', date: '2023-11-01', amount: '$29.00', status: 'Pending' },
    ];
  }
};
