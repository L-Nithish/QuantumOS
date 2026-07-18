import type { DesktopSettings } from '../../types/os';

interface WallpaperOption {
  id: string;
  bg: string;
}

const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'default',
    bg: 'radial-gradient(ellipse at 15% 50%,rgba(0,212,170,0.06) 0%,transparent 55%),radial-gradient(ellipse at 85% 25%,rgba(14,165,233,0.05) 0%,transparent 50%),radial-gradient(ellipse at 50% 90%,rgba(245,158,11,0.03) 0%,transparent 45%),linear-gradient(160deg,#050910 0%,#0a1220 40%,#08101c 100%)'
  },
  {
    id: 'sunset',
    bg: 'radial-gradient(ellipse at 50% 100%,rgba(239,68,68,0.12) 0%,transparent 50%),radial-gradient(ellipse at 30% 30%,rgba(245,158,11,0.08) 0%,transparent 50%),linear-gradient(180deg,#0a0812 0%,#150a0a 100%)'
  },
  {
    id: 'ocean',
    bg: 'radial-gradient(ellipse at 50% 50%,rgba(14,165,233,0.1) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(0,212,170,0.06) 0%,transparent 40%),linear-gradient(160deg,#040a14 0%,#081828 100%)'
  },
  {
    id: 'forest',
    bg: 'radial-gradient(ellipse at 40% 60%,rgba(34,197,94,0.08) 0%,transparent 50%),radial-gradient(ellipse at 70% 20%,rgba(0,212,170,0.05) 0%,transparent 50%),linear-gradient(150deg,#040a06 0%,#0a1a10 100%)'
  },
  {
    id: 'midnight',
    bg: 'radial-gradient(ellipse at 50% 50%,rgba(100,116,139,0.06) 0%,transparent 60%),linear-gradient(180deg,#020408 0%,#0a0e18 100%)'
  },
  {
    id: 'ember',
    bg: 'radial-gradient(ellipse at 50% 80%,rgba(245,158,11,0.1) 0%,transparent 50%),radial-gradient(ellipse at 20% 20%,rgba(239,68,68,0.06) 0%,transparent 40%),linear-gradient(160deg,#0a0604 0%,#1a0e08 100%)'
  },
  {
    id: 'arctic',
    bg: 'radial-gradient(ellipse at 60% 40%,rgba(186,230,253,0.06) 0%,transparent 50%),radial-gradient(ellipse at 30% 70%,rgba(14,165,233,0.04) 0%,transparent 50%),linear-gradient(160deg,#040810 0%,#0a1420 100%)'
  },
  {
    id: 'void',
    bg: 'linear-gradient(135deg,#000000 0%,#0a0a0a 50%,#000000 100%)'
  }
];

interface SettingsAppProps {
  settings: DesktopSettings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdateSetting: (key: keyof DesktopSettings, value: any) => void;
  onShowNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
}

export function SettingsApp({
  settings,
  onUpdateSetting,
  onShowNotification
}: SettingsAppProps) {
  const handleToggle = (key: keyof DesktopSettings) => {
    const nextVal = !settings[key];
    onUpdateSetting(key, nextVal);
    onShowNotification('Setting updated', 'Your preference has been saved.', 'success', 2000);
  };

  const handleWallpaperSelect = (id: string) => {
    onUpdateSetting('wallpaper', id);
    onShowNotification('Wallpaper changed', 'Desktop wallpaper updated.', 'success', 2000);
  };


  return (
    <div className="settings-container">
      <div className="settings-section">
        <div className="settings-title">
          <span className="material-icons-outlined">palette</span>Appearance
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Animations</div>
            <div className="settings-desc">Enable desktop and window animations</div>
          </div>
          <div
            className={`toggle-switch ${settings.animations ? 'on' : ''}`}
            id="set-anim"
            onClick={() => handleToggle('animations')}
          ></div>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Background Grid</div>
            <div className="settings-desc">Show subtle grid pattern on desktop</div>
          </div>
          <div
            className={`toggle-switch ${settings.grid ? 'on' : ''}`}
            id="set-grid"
            onClick={() => handleToggle('grid')}
          ></div>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Window Blur</div>
            <div className="settings-desc">Apply backdrop blur to windows and taskbar</div>
          </div>
          <div
            className={`toggle-switch ${settings.blur ? 'on' : ''}`}
            id="set-blur"
            onClick={() => handleToggle('blur')}
          ></div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <span className="material-icons-outlined">wallpaper</span>Wallpaper
        </div>
        <div className="wallpaper-options" id="wp-options">
          {WALLPAPERS.map((w) => (
            <div
              key={w.id}
              className={`wallpaper-opt ${settings.wallpaper === w.id ? 'active' : ''}`}
              style={{ background: w.bg }}
              onClick={() => handleWallpaperSelect(w.id)}
            ></div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <span className="material-icons-outlined">info</span>About
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '15px' }}>
              QuabtomOS Enterprise
            </div>
            <div className="settings-desc" style={{ marginTop: '6px', lineHeight: 1.6 }}>
              Version 3.2.1 (Build 20241221)
              <br />
              Kernel: qt-kernel 6.8.0-qt
              <br />
              Desktop: Quabtom Desktop Environment 3.0
              <br />
              License: Enterprise
              <br />
              <span style={{ color: 'var(--text-muted)', marginTop: '4px', display: 'inline-block' }}>
                Copyright 2024 Quabtom Technologies Inc.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WALLPAPERS };
