import { useEffect, useState } from 'react';
import type { WindowState } from '../types/os';
import type { AppConfig } from '../types/apps';
import { formatTime, formatDateShort } from '../utils/dateHelper';

interface TaskbarProps {
  windows: WindowState[];
  apps: AppConfig[];
  focusedWindowId: string | null;
  onToggleStartMenu: () => void;
  onToggleWindow: (id: string) => void;
  onShowNotificationTray: () => void;
}

export function Taskbar({
  windows,
  apps,
  focusedWindowId,
  onToggleStartMenu,
  onToggleWindow,
  onShowNotificationTray
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="taskbar">
      <div
        className="taskbar-start"
        id="taskbar-start"
        title="Start Menu"
        role="button"
        tabIndex={0}
        aria-label="Start Menu"
        onClick={onToggleStartMenu}
      >
        <span className="material-icons-outlined">grid_view</span>
      </div>

      <div className="taskbar-sep"></div>

      <div className="taskbar-apps" id="taskbar-apps">
        {windows.map((win) => {
          const app = apps.find((a) => a.id === win.appId);
          if (!app) return null;

          const isActive = focusedWindowId === win.id && !win.minimized;

          return (
            <div
              key={win.id}
              className={`taskbar-app ${isActive ? 'active' : ''}`}
              onClick={() => onToggleWindow(win.id)}
            >
              <span className="material-icons-outlined">{app.icon}</span>
              <span className="taskbar-app-label">{app.name}</span>
            </div>
          );
        })}
      </div>

      <div className="taskbar-tray">
        <div className="tray-item" title="Network">
          <span className="material-icons-outlined">wifi</span>
        </div>
        <div className="tray-item" title="Volume">
          <span className="material-icons-outlined">volume_up</span>
        </div>
        <div className="tray-item" title="Battery">
          <span className="material-icons-outlined">battery_5_bar</span>
        </div>
        <div
          className="tray-item"
          id="tray-notif"
          title="Notifications"
          onClick={onShowNotificationTray}
        >
          <span className="material-icons-outlined">notifications_none</span>
        </div>
        <div className="tray-sep"></div>
        <div className="tray-clock" id="tray-clock">
          <div className="tray-clock-time" id="tray-time">
            {formatTime(time)}
          </div>
          <div className="tray-clock-date" id="tray-date">
            {formatDateShort(time)}
          </div>
        </div>
      </div>
    </div>
  );
}
