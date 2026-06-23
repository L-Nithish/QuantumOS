interface ShutdownOverlayProps {
  active: boolean;
}

export function ShutdownOverlay({ active }: ShutdownOverlayProps) {
  if (!active) return null;

  return (
    <div id="shutdown-overlay" className="active">
      <div className="shutdown-spinner"></div>
      <div className="shutdown-text">Shutting down...</div>
    </div>
  );
}
