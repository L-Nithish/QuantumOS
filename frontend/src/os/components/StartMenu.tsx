import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AppConfig } from '../types/apps';

interface StartMenuProps {
  isOpen: boolean;
  apps: AppConfig[];
  onOpenApp: (appId: string) => void;
  onClose: () => void;
  onShutdown: () => void;
}

export function StartMenu({ isOpen, apps, onOpenApp, onClose, onShutdown }: StartMenuProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const startButton = document.getElementById('taskbar-start');
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        (!startButton || !startButton.contains(e.target as Node))
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset search when menu opens or closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      id="start-menu"
      className="open"
      role="menu"
      aria-label="Start Menu"
    >
      <div className="start-search-wrap">
        <span className="material-icons-outlined">search</span>
        <input
          ref={searchInputRef}
          type="text"
          className="start-search"
          id="start-search"
          placeholder="Search applications..."
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="start-section-title">Applications</div>
      <div className="start-apps-grid" id="start-apps-grid">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="start-app-item"
            onClick={() => {
              onOpenApp(app.id);
              onClose();
            }}
          >
            <span className="material-icons-outlined">{app.icon}</span>
            <div className="start-app-name">{app.name}</div>
          </div>
        ))}
      </div>

      <div className="start-footer">
        <div className="start-user">
          <div className="start-user-avatar">A</div>
          <span>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="start-power"
            title="Exit to Dashboard"
            role="button"
            tabIndex={0}
            aria-label="Exit to Dashboard"
            onClick={() => navigate("/dashboard")}
            style={{ border: 'none', background: 'transparent' }}
          >
            <span className="material-icons-outlined" style={{ color: 'var(--accent)' }}>logout</span>
          </button>
          <div
            className="start-power"
            id="start-power"
            title="Shutdown"
            role="button"
            tabIndex={0}
            aria-label="Shutdown"
            onClick={onShutdown}
          >
            <span className="material-icons-outlined">power_settings_new</span>
          </div>
        </div>
      </div>
    </div>
  );
}
