import { useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import './index.css';

export default function OSApp() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);

    // Simulate system shutdown spinner, then reboot after 2500ms
    setTimeout(() => {
      setIsShuttingDown(false);
      setIsBooting(true);
      setIsLocked(true);
    }, 2500);
  };

  return (
    <div id="os-root">
      <AppRoutes
        isBooting={isBooting}
        isLocked={isLocked}
        isShuttingDown={isShuttingDown}
        bootDuration={4500}
        onBootComplete={handleBootComplete}
        onUnlock={handleUnlock}
        onShutdown={handleShutdown}
      />
    </div>
  );
}
