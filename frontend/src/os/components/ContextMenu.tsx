import { useRef, useEffect } from 'react';

export interface ContextMenuItem {
  icon?: string;
  label?: string;
  action?: () => void;
  sep?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
}

export function ContextMenu({ x, y, visible, onClose, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (visible && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  // Approximate dimensions for boundary checks
  const menuWidth = 200;
  const menuHeight = items.length * 36 + 12; // 36px per item, plus margins/padding
  const left = Math.min(x, window.innerWidth - menuWidth - 8);
  const top = Math.min(y, window.innerHeight - menuHeight - 8);

  return (
    <div
      ref={menuRef}
      id="context-menu"
      role="menu"
      style={{
        display: 'block',
        left: `${left}px`,
        top: `${top}px`
      }}
    >
      {items.map((item, index) => {
        if (item.sep) {
          return <div key={`sep-${index}`} className="ctx-sep" />;
        }

        return (
          <div
            key={`item-${index}`}
            className="ctx-item"
            onClick={() => {
              if (item.action) item.action();
              onClose();
            }}
          >
            {item.icon && <span className="material-icons-outlined">{item.icon}</span>}
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
