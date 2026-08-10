import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type TourStep = {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

interface TourContextType {
  isActive: boolean;
  currentStepIndex: number;
  steps: TourStep[];
  startTour: (steps: TourStep[]) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);

  const startTour = useCallback((newSteps: TourStep[]) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsActive(true);
  }, []);

  const stopTour = useCallback(() => {
    setIsActive(false);
    setSteps([]);
    setCurrentStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      stopTour();
    }
  }, [currentStepIndex, steps.length, stopTour]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStepIndex,
        steps,
        startTour,
        stopTour,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

// Dummy steps for dashboard
export const dashboardTourSteps: TourStep[] = [
  {
    targetId: 'sidebar',
    title: 'Navigation Menu',
    content: 'Access all modules of QuantumOS from this sidebar.',
    position: 'right',
  },
  {
    targetId: 'search-bar',
    title: 'Global Search',
    content: 'Press Cmd+K or Ctrl+K to quickly find anything.',
    position: 'bottom',
  },
  {
    targetId: 'user-profile',
    title: 'User Profile',
    content: 'Manage your account settings and preferences here.',
    position: 'bottom',
  },
];
