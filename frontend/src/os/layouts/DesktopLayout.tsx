import React from 'react';

interface DesktopLayoutProps {
  wallpaperBg: string;
  showGrid: boolean;
  children: React.ReactNode;
}

export function DesktopLayout({ wallpaperBg, showGrid, children }: DesktopLayoutProps) {
  return (
    <div id="desktop">
      <div
        className="wallpaper"
        id="wallpaper"
        style={{ background: wallpaperBg }}
      ></div>
      {showGrid && <div className="wallpaper-grid"></div>}
      {children}
    </div>
  );
}
