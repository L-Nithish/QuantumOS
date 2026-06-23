import React, { useRef, useEffect, useState } from 'react';
import type { WindowState, WindowRect } from '../types/os';
import type { AppConfig } from '../types/apps';

interface WindowFrameProps {
  window: WindowState;
  app: AppConfig;
  isFocused: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdateRect: (id: string, rect: WindowRect) => void;
  children: React.ReactNode;
}

export function WindowFrame({
  window: win,
  app,
  isFocused,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdateRect,
  children
}: WindowFrameProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeStart = useRef<{
    dir: string;
    startX: number;
    startY: number;
    origRect: WindowRect;
  } | null>(null);

  const [isRestoring, setIsRestoring] = useState(false);

  // Focus on click
  const handleMouseDown = () => {
    onFocus(win.id);
  };

  // Drag start
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-btn')) return;

    let origX = win.rect.left;
    let origY = win.rect.top;
    let origW = win.rect.width;
    let origH = win.rect.height;

    if (win.maximized) {
      // Un-maximize and position under cursor
      const pctX = e.clientX / window.innerWidth;
      const prevW = win.prevRect ? win.prevRect.width : app.w;
      const prevH = win.prevRect ? win.prevRect.height : app.h;
      origW = prevW;
      origH = prevH;
      origX = e.clientX - prevW * pctX;
      origY = 0;
      onMaximize(win.id); // Toggle off maximization state
    }

    dragStart.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX,
      origY
    };

    onUpdateRect(win.id, { left: origX, top: origY, width: origW, height: origH });
    document.body.style.cursor = 'move';
    e.preventDefault();
  };

  // Resize start
  const handleResizeMouseDown = (e: React.MouseEvent, dir: string) => {
    if (win.maximized) return;
    resizeStart.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      origRect: { ...win.rect }
    };
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Handle drag
      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.startX;
        const dy = e.clientY - dragStart.current.startY;
        let nx = dragStart.current.origX + dx;
        let ny = dragStart.current.origY + dy;

        // Apply bounds
        const winEl = windowRef.current;
        const width = winEl ? winEl.offsetWidth : win.rect.width;
        nx = Math.max(-width + 100, Math.min(window.innerWidth - 100, nx));
        ny = Math.max(0, Math.min(window.innerHeight - 80, ny));

        onUpdateRect(win.id, {
          ...win.rect,
          left: nx,
          top: ny
        });
      }

      // Handle resize
      if (resizeStart.current) {
        const { dir, startX, startY, origRect } = resizeStart.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let left = origRect.left;
        let top = origRect.top;
        let width = origRect.width;
        let height = origRect.height;
        const minW = 360;
        const minH = 240;

        if (dir.includes('e')) {
          width = Math.max(minW, origRect.width + dx);
        }
        if (dir.includes('w')) {
          const proposedW = origRect.width - dx;
          width = Math.max(minW, proposedW);
          left = origRect.left + (origRect.width - width);
        }
        if (dir.includes('s')) {
          height = Math.max(minH, origRect.height + dy);
        }
        if (dir.includes('n')) {
          const proposedH = origRect.height - dy;
          height = Math.max(minH, proposedH);
          top = origRect.top + (origRect.height - height);
        }

        onUpdateRect(win.id, { left, top, width, height });
      }
    };

    const handleMouseUp = () => {
      if (dragStart.current || resizeStart.current) {
        dragStart.current = null;
        resizeStart.current = null;
        document.body.style.cursor = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [win.id, win.rect, onUpdateRect]);

  const handleHeaderDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-btn')) return;
    onMaximize(win.id);
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize(win.id);
  };

  const handleMaximizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMaximize(win.id);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRestoring(false);
    onClose(win.id);
  };

  // Minimize animations logic
  let windowClass = 'window';
  if (isFocused) windowClass += ' focused';
  if (win.maximized) windowClass += ' maximized';
  if (win.minimized) windowClass += ' minimizing';
  if (isRestoring) windowClass += ' restoring';

  const windowStyle: React.CSSProperties = win.maximized
    ? {}
    : {
        left: `${win.rect.left}px`,
        top: `${win.rect.top}px`,
        width: `${win.rect.width}px`,
        height: `${win.rect.height}px`
      };

  return (
    <div
      ref={windowRef}
      className={windowClass}
      id={win.id}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Resize handles */}
      {!win.maximized && (
        <>
          <div className="resize-handle resize-n" data-dir="n" onMouseDown={(e) => handleResizeMouseDown(e, 'n')}></div>
          <div className="resize-handle resize-s" data-dir="s" onMouseDown={(e) => handleResizeMouseDown(e, 's')}></div>
          <div className="resize-handle resize-e" data-dir="e" onMouseDown={(e) => handleResizeMouseDown(e, 'e')}></div>
          <div className="resize-handle resize-w" data-dir="w" onMouseDown={(e) => handleResizeMouseDown(e, 'w')}></div>
          <div className="resize-handle resize-ne" data-dir="ne" onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}></div>
          <div className="resize-handle resize-nw" data-dir="nw" onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}></div>
          <div className="resize-handle resize-se" data-dir="se" onMouseDown={(e) => handleResizeMouseDown(e, 'se')}></div>
          <div className="resize-handle resize-sw" data-dir="sw" onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}></div>
        </>
      )}

      {/* Header */}
      <div
        className="window-header"
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="window-header-left">
          <span className="material-icons-outlined">{app.icon}</span>
          <span className="window-title">{app.name}</span>
        </div>
        <div className="window-header-right">
          <button
            className="window-btn window-minimize"
            aria-label="Minimize"
            onClick={handleMinimizeClick}
          >
            <span className="material-icons-outlined">remove</span>
          </button>
          <button
            className="window-btn window-maximize"
            aria-label="Maximize"
            onClick={handleMaximizeClick}
          >
            <span className="material-icons-outlined">crop_square</span>
          </button>
          <button
            className="window-btn window-close"
            aria-label="Close"
            onClick={handleCloseClick}
          >
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="window-body">
        {children}
      </div>
    </div>
  );
}
