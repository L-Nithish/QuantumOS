import { useEffect, useState } from 'react';

const BOOT_TEXTS = [
  'Initializing kernel modules...',
  'Loading QuabtomOS kernel 6.8.0-qt...',
  'Mounting virtual filesystems...',
  'Starting system services...',
  'Loading desktop environment...',
  'Applying enterprise policies...',
  'Ready.'
];

interface BootScreenProps {
  bootDuration: number;
  onBootComplete: () => void;
}

export function BootScreen({ bootDuration, onBootComplete }: BootScreenProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < BOOT_TEXTS.length - 1) {
          return prev + 1;
        }
        clearInterval(textInterval);
        return prev;
      });
    }, bootDuration / BOOT_TEXTS.length);

    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, bootDuration);

    const completeTimeout = setTimeout(() => {
      onBootComplete();
    }, bootDuration + 800);

    return () => {
      clearInterval(textInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [bootDuration, onBootComplete]);

  return (
    <div id="boot-screen" className={isFadingOut ? 'fade-out' : ''}>
      <div className="boot-logo">QUABTOM<span>OS</span></div>
      <div className="boot-sub">ENTERPRISE EDITION</div>
      <div className="boot-progress-wrap">
        <div className="boot-progress-bar"></div>
      </div>
      <div className="boot-text" id="boot-text">
        {BOOT_TEXTS[textIndex]}
      </div>
    </div>
  );
}
