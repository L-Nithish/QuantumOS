import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTour } from './TourProvider';

export const OnboardingTour: React.FC = () => {
  const { isActive, steps, currentStepIndex, stopTour, nextStep, prevStep } = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive || steps.length === 0) return;

    const step = steps[currentStepIndex];
    const targetElement = document.getElementById(step.targetId);

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }

    const handleResize = () => {
      if (targetElement) {
        setTargetRect(targetElement.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isActive, currentStepIndex, steps]);

  if (!isActive || steps.length === 0 || !targetRect) return null;

  const step = steps[currentStepIndex];
  
  const padding = 8;
  const spotlightX = targetRect.left - padding;
  const spotlightY = targetRect.top - padding;
  const spotlightWidth = targetRect.width + padding * 2;
  const spotlightHeight = targetRect.height + padding * 2;

  let popoverStyle: React.CSSProperties = {};
  
  switch (step.position) {
    case 'right':
      popoverStyle = { left: spotlightX + spotlightWidth + 16, top: spotlightY };
      break;
    case 'left':
      popoverStyle = { right: window.innerWidth - spotlightX + 16, top: spotlightY };
      break;
    case 'top':
      popoverStyle = { left: spotlightX, bottom: window.innerHeight - spotlightY + 16 };
      break;
    case 'bottom':
    default:
      popoverStyle = { left: spotlightX, top: spotlightY + spotlightHeight + 16 };
      break;
  }

  // Fallback to center if it would overflow (simplified logic)
  if (popoverStyle.left && (popoverStyle.left as number) + 300 > window.innerWidth) {
     popoverStyle.left = window.innerWidth - 320;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-black/60 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        className="absolute bg-transparent ring-2 ring-blue-500 rounded-lg pointer-events-none transition-all duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
        initial={false}
        animate={{
          left: spotlightX,
          top: spotlightY,
          width: spotlightWidth,
          height: spotlightHeight,
        }}
        style={{
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
          clipPath: `polygon(
            0% 0%, 0% 100%, ${spotlightX}px 100%,
            ${spotlightX}px ${spotlightY}px,
            ${spotlightX + spotlightWidth}px ${spotlightY}px,
            ${spotlightX + spotlightWidth}px ${spotlightY + spotlightHeight}px,
            ${spotlightX}px ${spotlightY + spotlightHeight}px,
            ${spotlightX}px 100%, 100% 100%, 100% 0%
          )`,
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 pointer-events-auto text-slate-200"
          style={popoverStyle}
        >
          <button
            onClick={stopTour}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
          
          <h3 className="text-lg font-semibold text-white mb-2 pr-6">{step.title}</h3>
          <p className="text-sm text-slate-400 mb-6">{step.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentStepIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextStep}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                <span>{currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}</span>
                {currentStepIndex !== steps.length - 1 && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
