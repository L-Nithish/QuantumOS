import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, ChevronRight, Check } from 'lucide-react';

export const WorkspaceCreate = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="p-6 text-white h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 min-h-[300px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold mb-2">Name your workspace</h2>
                <p className="text-gray-400 mb-6">Choose a unique name for your team's workspace.</p>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Acme Corp" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold mb-2">Description</h2>
                <p className="text-gray-400 mb-6">What is the purpose of this workspace?</p>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your workspace..." 
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-bold mb-2">Review & Create</h2>
                <p className="text-gray-400 mb-6">You're ready to go.</p>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium text-lg mb-2">{name || 'Not provided'}</div>
                  <div className="text-sm text-gray-500">Description</div>
                  <div className="text-gray-300">{description || 'Not provided'}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-8 flex justify-between">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            >
              Back
            </button>
            <button 
              onClick={step === 3 ? () => console.log('Create workspace', {name, description}) : nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              {step === 3 ? 'Create Workspace' : (
                <>Next <ChevronRight size={18} className="ml-1" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
