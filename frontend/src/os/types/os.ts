export interface WindowRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  minimized: boolean;
  maximized: boolean;
  prevRect: WindowRect | null;
  rect: WindowRect;
}

export interface SystemConfig {
  password?: string;
  bootDuration: number;
  windowSnapThreshold: number;
}

export interface DesktopSettings {
  animations: boolean;
  grid: boolean;
  blur: boolean;
  wallpaper: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
