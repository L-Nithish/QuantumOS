import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Receipt, Package } from 'lucide-react';
import { billingService, Plan, Invoice } from '../../../api/billingService';

export const Billing = () => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    billingService.getCurrentPlan().then(setPlan);
    billingService.getInvoices().then(setInvoices);
  }, []);

  return (
    <div className="p-6 text-white h-full space-y-8">
      <h2 className="text-2xl font-bold flex items-center"><CreditCard className="mr-2" /> Billing & Plans</h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center"><Package className="mr-2 text-blue-400" /> Current Plan</h3>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">Active</span>
        </div>
        {plan && (
          <div>
            <div className="text-3xl font-bold mb-4">{plan.name} <span className="text-lg text-gray-400 font-normal">{plan.price}</span></div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Upgrade Plan
            </button>
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center"><Receipt className="mr-2" /> Invoices</h3>
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 font-medium text-gray-300">Invoice ID</th>
                <th className="p-4 font-medium text-gray-300">Date</th>
                <th className="p-4 font-medium text-gray-300">Amount</th>
                <th className="p-4 font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="p-4 text-gray-300">{inv.id}</td>
                  <td className="p-4 text-gray-400">{inv.date}</td>
                  <td className="p-4 text-gray-300">{inv.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                      inv.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
