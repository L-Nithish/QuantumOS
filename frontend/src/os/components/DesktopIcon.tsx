import React from 'react';
import type { AppConfig } from '../types/apps';

interface DesktopIconProps {
  app: AppConfig;
  onOpen: (appId: string) => void;
}

export function DesktopIcon({ app, onOpen }: DesktopIconProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onOpen(app.id);
    }
  };

  return (
    <div
      className="desktop-icon"
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.name}`}
      onDoubleClick={() => onOpen(app.id)}
      onKeyDown={handleKeyDown}
    >
      <span className="material-icons-outlined">{app.icon}</span>
      <div className="desktop-icon-label">{app.name}</div>
    </div>
  );
}
