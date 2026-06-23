import React, { useEffect, useState, useRef } from 'react';
import { formatTime, formatDate } from '../utils/dateHelper';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState(new Date());
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const hintTimeout = setTimeout(() => {
      setShowHint(true);
    }, 1500);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      clearInterval(timer);
      clearTimeout(hintTimeout);
    };
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsUnlocked(true);
    setTimeout(() => {
      onUnlock();
    }, 600);
  };

  return (
    <div id="lock-screen" className={isUnlocked ? 'unlock' : ''}>
      <div className="lock-time" id="lock-time">{formatTime(time)}</div>
      <div className="lock-date" id="lock-date">{formatDate(time)}</div>
      <div className="lock-avatar">A</div>
      <div className="lock-user">Administrator</div>
      <form onSubmit={handleUnlock} className="lock-input-wrap">
        <input
          ref={inputRef}
          type="password"
          className="lock-input"
          id="lock-input"
          placeholder="Enter password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="lock-submit" id="lock-submit">
          <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
            arrow_forward
          </span>
        </button>
      </form>
      <div className={`lock-hint ${showHint ? 'show' : ''}`} id="lock-hint">
        Press Enter or click arrow to unlock
      </div>
    </div>
  );
}
