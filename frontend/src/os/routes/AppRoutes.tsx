import { BootScreen } from '../components/BootScreen';
import { LockScreen } from '../components/LockScreen';
import { DesktopPage } from '../pages/DesktopPage';
import { ShutdownOverlay } from '../components/ShutdownOverlay';

interface AppRoutesProps {
  isBooting: boolean;
  isLocked: boolean;
  isShuttingDown: boolean;
  bootDuration: number;
  onBootComplete: () => void;
  onUnlock: () => void;
  onShutdown: () => void;
}

export function AppRoutes({
  isBooting,
  isLocked,
  isShuttingDown,
  bootDuration,
  onBootComplete,
  onUnlock,
  onShutdown
}: AppRoutesProps) {
  if (isShuttingDown) {
    return <ShutdownOverlay active={true} />;
  }

  if (isBooting) {
    return <BootScreen bootDuration={bootDuration} onBootComplete={onBootComplete} />;
  }

  if (isLocked) {
    return <LockScreen onUnlock={onUnlock} />;
  }

  return <DesktopPage onShutdown={onShutdown} />;
}
