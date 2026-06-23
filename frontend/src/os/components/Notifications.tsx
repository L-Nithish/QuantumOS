import { useEffect, useState } from 'react';
import type { NotificationItem as NotifItemType } from '../types/os';

interface NotificationsProps {
  notifications: NotifItemType[];
  onRemove: (id: string) => void;
}

export function Notifications({ notifications, onRemove }: NotificationsProps) {
  return (
    <div id="notifications" aria-live="polite">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} onDismiss={() => onRemove(n.id)} />
      ))}
    </div>
  );
}

interface NotificationCardProps {
  notification: NotifItemType;
  onDismiss: () => void;
}

function NotificationCard({ notification, onDismiss }: NotificationCardProps) {
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    // Automatically trigger out animation after 3.2s (since typical duration is 3.5s)
    const outTimer = setTimeout(() => {
      setIsOut(true);
    }, 3200);

    // Call onDismiss after animation finishes (300ms after isOut is true)
    const dismissTimer = setTimeout(() => {
      onDismiss();
    }, 3500);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  const icons: Record<string, string> = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error'
  };

  return (
    <div className={`notification ${isOut ? 'out' : ''}`}>
      <div className={`notif-icon ${notification.type}`}>
        <span className="material-icons-outlined">
          {icons[notification.type] || 'info'}
        </span>
      </div>
      <div className="notif-content">
        <div className="notif-title">{notification.title}</div>
        <div className="notif-msg">{notification.message}</div>
      </div>
    </div>
  );
}
