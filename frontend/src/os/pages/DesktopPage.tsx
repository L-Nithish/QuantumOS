import { useState, useEffect, useRef } from 'react';
import type { AppConfig } from '../types/apps';
import type { WindowState, WindowRect, DesktopSettings, NotificationItem } from '../types/os';
import { useVFS } from '../hooks/useVFS';
import { getUptime } from '../utils/dateHelper';

// Components
import { DesktopLayout } from '../layouts/DesktopLayout';
import { DesktopIcon } from '../components/DesktopIcon';
import { Taskbar } from '../components/Taskbar';
import { StartMenu } from '../components/StartMenu';
import { ContextMenu } from '../components/ContextMenu';
import type { ContextMenuItem } from '../components/ContextMenu';
import { Notifications } from '../components/Notifications';
import { WindowFrame } from '../components/WindowFrame';

// Apps
import { TerminalApp } from '../components/apps/TerminalApp';
import { FileManagerApp } from '../components/apps/FileManagerApp';
import { SystemMonitorApp } from '../components/apps/SystemMonitorApp';
import { TextEditorApp } from '../components/apps/TextEditorApp';
import { CalculatorApp } from '../components/apps/CalculatorApp';
import { CalendarApp } from '../components/apps/CalendarApp';
import { WeatherApp } from '../components/apps/WeatherApp';
import { SettingsApp, WALLPAPERS } from '../components/apps/SettingsApp';

export const APP_REGISTRY: AppConfig[] = [
  { id: 'terminal', name: 'Terminal', icon: 'terminal', w: 720, h: 460 },
  { id: 'files', name: 'File Manager', icon: 'folder', w: 780, h: 500 },
  { id: 'monitor', name: 'System Monitor', icon: 'monitor_heart', w: 820, h: 520 },
  { id: 'notes', name: 'Text Editor', icon: 'edit_note', w: 640, h: 460 },
  { id: 'calculator', name: 'Calculator', icon: 'calculate', w: 320, h: 480 },
  { id: 'calendar', name: 'Calendar', icon: 'calendar_month', w: 360, h: 420 },
  { id: 'weather', name: 'Weather', icon: 'cloud', w: 400, h: 480 },
  { id: 'settings', name: 'Settings', icon: 'settings', w: 560, h: 480 },
];

interface DesktopPageProps {
  onShutdown: () => void;
}

export function DesktopPage({ onShutdown }: DesktopPageProps) {
  const vfs = useVFS();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number; visible: boolean } | null>(null);
  
  // App-specific paths and documents state
  const [terminalCwd, setTerminalCwd] = useState('/home/admin');
  const [fileManagerPath, setFileManagerPath] = useState('/home/admin');
  const [editorFile, setEditorFile] = useState<{ name: string; content: string } | null>(null);

  const [settings, setSettings] = useState<DesktopSettings>({
    animations: true,
    grid: true,
    blur: true,
    wallpaper: 'default'
  });

  const uptimeStart = useRef(Date.now());
  const maxZIndex = useRef(100);

  // Initialize welcome notification
  useEffect(() => {
    showNotification('Welcome back, Admin', 'QuabtomOS Enterprise v3.2.1 is ready.', 'success');
  }, []);

  // Update styles (animation transitions) based on settings.animations
  useEffect(() => {
    if (settings.animations) {
      document.body.style.setProperty('--anim-duration', '');
    } else {
      document.body.style.setProperty('--anim-duration', '0s');
    }
  }, [settings.animations]);

  // Update blur styles in body
  useEffect(() => {
    const taskbar = document.getElementById('taskbar');
    const startMenu = document.getElementById('start-menu');
    if (!settings.blur) {
      if (taskbar) taskbar.style.backdropFilter = 'none';
      if (startMenu) startMenu.style.backdropFilter = 'none';
    } else {
      if (taskbar) taskbar.style.backdropFilter = '';
      if (startMenu) startMenu.style.backdropFilter = '';
    }
  }, [settings.blur]);

  const showNotification = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error'
  ) => {
    const newNotif: NotificationItem = {
      id: Math.random().toString(),
      title,
      message,
      type
    };
    setNotifications((prev) => [...prev, newNotif]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Window operations
  const openWindow = (appId: string) => {
    // If window is already open, restore and focus it
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.minimized) {
        restoreWindow(existing.id);
      }
      focusWindow(existing.id);
      setStartMenuOpen(false);
      return;
    }

    const app = APP_REGISTRY.find((a) => a.id === appId);
    if (!app) return;

    const winId = 'w_' + Math.random().toString(36).substring(2, 11);
    const offset = (windows.length % 8) * 28;
    const x = Math.min(120 + offset, window.innerWidth - app.w - 20);
    const y = Math.min(60 + offset, window.innerHeight - app.h - 80);

    maxZIndex.current += 1;
    const newWindow: WindowState = {
      id: winId,
      appId,
      minimized: false,
      maximized: false,
      prevRect: null,
      rect: { left: x, top: y, width: app.w, height: app.h }
    };

    setWindows((prev) => [...prev, newWindow]);
    setFocusedWindowId(winId);
    setStartMenuOpen(false);
  };

  const closeWindow = (winId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== winId));
    if (focusedWindowId === winId) {
      setFocusedWindowId(null);
    }
  };

  const minimizeWindow = (winId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === winId ? { ...w, minimized: true } : w))
    );
    if (focusedWindowId === winId) {
      setFocusedWindowId(null);
    }
  };

  const restoreWindow = (winId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === winId ? { ...w, minimized: false } : w))
    );
  };

  const focusWindow = (winId: string) => {
    maxZIndex.current += 1;
    setFocusedWindowId(winId);
  };

  const toggleMaximizeWindow = (winId: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== winId) return w;
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            rect: w.prevRect || w.rect
          };
        } else {
          return {
            ...w,
            maximized: true,
            prevRect: { ...w.rect }
          };
        }
      })
    );
  };

  const toggleWindowFromTaskbar = (winId: string) => {
    const win = windows.find((w) => w.id === winId);
    if (!win) return;

    if (win.minimized) {
      restoreWindow(winId);
      focusWindow(winId);
    } else if (focusedWindowId === winId) {
      minimizeWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  const updateWindowRect = (winId: string, nextRect: WindowRect) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === winId ? { ...w, rect: nextRect } : w))
    );
  };

  // Desktop double click to open files
  const handleOpenFileInEditor = (name: string, content: string) => {
    setEditorFile({ name, content });
    openWindow('notes');
  };

  const handleUpdateSetting = (key: keyof DesktopSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Right-click Context Menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('.window') ||
      (e.target as HTMLElement).closest('.desktop-icon')
    ) {
      return;
    }
    e.preventDefault();
    setCtxMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true
    });
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      icon: 'refresh',
      label: 'Refresh Desktop',
      action: () => showNotification('Desktop refreshed', '', 'info')
    },
    {
      icon: 'wallpaper',
      label: 'Change Wallpaper',
      action: () => openWindow('settings')
    },
    { sep: true },
    {
      icon: 'terminal',
      label: 'Open Terminal',
      action: () => openWindow('terminal')
    },
    {
      icon: 'folder',
      label: 'Open File Manager',
      action: () => openWindow('files')
    },
    { sep: true },
    {
      icon: 'info',
      label: 'About QuabtomOS',
      action: () => openWindow('settings')
    }
  ];

  // Resolve wallpaper background details
  const currentWP = WALLPAPERS.find((w) => w.id === settings.wallpaper) || WALLPAPERS[0];

  const renderAppContent = (appId: string, winId: string) => {
    switch (appId) {
      case 'terminal':
        return (
          <TerminalApp
            windowId={winId}
            cwd={terminalCwd}
            onChangeCwd={setTerminalCwd}
            vfs={vfs}
            uptime={getUptime(uptimeStart.current)}
            onCloseWindow={closeWindow}
          />
        );
      case 'files':
        return (
          <FileManagerApp
            currentPath={fileManagerPath}
            onChangePath={setFileManagerPath}
            vfs={vfs}
            onOpenFileInEditor={handleOpenFileInEditor}
            onShowNotification={showNotification}
          />
        );
      case 'monitor':
        return <SystemMonitorApp />;
      case 'notes':
        return (
          <TextEditorApp
            initialContent={editorFile?.content}
            initialFileName={editorFile?.name}
            onSave={(content) => {
              if (editorFile) {
                // Save updated contents in virtual FS documents path
                const separator = fileManagerPath === '/' ? '' : '/';
                const fullPath = `${fileManagerPath}${separator}${editorFile.name}`;
                vfs.writeFile(fullPath, content);
                setEditorFile({ name: editorFile.name, content });
              }
            }}
            onShowNotification={showNotification}
          />
        );
      case 'calculator':
        return <CalculatorApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'weather':
        return <WeatherApp />;
      case 'settings':
        return (
          <SettingsApp
            settings={settings}
            onUpdateSetting={handleUpdateSetting}
            onShowNotification={showNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
      onContextMenu={handleContextMenu}
    >
      <DesktopLayout wallpaperBg={currentWP.bg} showGrid={settings.grid}>
        {/* Desktop Icons */}
        <div className="desktop-icons" id="desktop-icons">
          {APP_REGISTRY.map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={openWindow} />
          ))}
        </div>

        {/* Window Containers */}
        <div id="windows-container">
          {windows.map((win) => {
            const app = APP_REGISTRY.find((a) => a.id === win.appId);
            if (!app) return null;

            return (
              <WindowFrame
                key={win.id}
                window={win}
                app={app}
                isFocused={focusedWindowId === win.id}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={toggleMaximizeWindow}
                onFocus={focusWindow}
                onUpdateRect={updateWindowRect}
              >
                {renderAppContent(win.appId, win.id)}
              </WindowFrame>
            );
          })}
        </div>
      </DesktopLayout>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        apps={APP_REGISTRY}
        focusedWindowId={focusedWindowId}
        onToggleStartMenu={() => setStartMenuOpen(!startMenuOpen)}
        onToggleWindow={toggleWindowFromTaskbar}
        onShowNotificationTray={() =>
          showNotification('No new notifications', 'Your inbox is clear.', 'info')
        }
      />

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        apps={APP_REGISTRY}
        onOpenApp={openWindow}
        onClose={() => setStartMenuOpen(false)}
        onShutdown={onShutdown}
      />

      {/* Desktop Context Menu */}
      <ContextMenu
        x={ctxMenu?.x || 0}
        y={ctxMenu?.y || 0}
        visible={ctxMenu?.visible || false}
        onClose={() => setCtxMenu(null)}
        items={contextMenuItems}
      />

      {/* Notifications system */}
      <Notifications notifications={notifications} onRemove={removeNotification} />
    </div>
  );
}
