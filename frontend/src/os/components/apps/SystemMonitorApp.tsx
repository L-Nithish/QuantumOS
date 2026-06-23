import { useEffect, useRef } from 'react';
import { useSystemMonitor } from '../../hooks/useSystemMonitor';

export function SystemMonitorApp() {
  const {
    cpuVal,
    memVal,
    cpuHistory,
    memHistory,
    processes
  } = useSystemMonitor();

  const cpuCanvasRef = useRef<HTMLCanvasElement>(null);
  const memCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawChart = (
    canvas: HTMLCanvasElement | null,
    data: number[],
    color: string,
    fillStart: string,
    fillEnd: string,
    maxVal: number
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);
    if (w === 0 || h === 0) return; // Prevent drawing if layout is unmeasured
    ctx.clearRect(0, 0, w, h);

    // Draw Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (data.length === 0) return;

    // Fill Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, fillStart);
    grad.addColorStop(1, fillEnd);

    ctx.beginPath();
    ctx.moveTo(0, h);
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / maxVal) * h;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / maxVal) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Redraw charts when history updates
  useEffect(() => {
    drawChart(
      cpuCanvasRef.current,
      cpuHistory,
      'rgba(0, 212, 170, 1)',
      'rgba(0, 212, 170, 0.35)',
      'rgba(0, 212, 170, 0.0)',
      100
    );
  }, [cpuHistory]);

  useEffect(() => {
    drawChart(
      memCanvasRef.current,
      memHistory,
      'rgba(14, 165, 233, 1)',
      'rgba(14, 165, 233, 0.35)',
      'rgba(14, 165, 233, 0.0)',
      32
    );
  }, [memHistory]);

  return (
    <div className="monitor-container">
      <div className="monitor-row">
        <div className="monitor-card">
          <div className="monitor-card-title">CPU Usage</div>
          <div>
            <span className="monitor-value" id="mon-cpu-val">
              {cpuVal.toFixed(0)}
            </span>
            <span className="monitor-unit">%</span>
          </div>
          <canvas ref={cpuCanvasRef} className="monitor-canvas" id="mon-cpu-canvas"></canvas>
        </div>
        <div className="monitor-card">
          <div className="monitor-card-title">Memory Usage</div>
          <div>
            <span className="monitor-value" id="mon-mem-val">
              {memVal.toFixed(1)}
            </span>
            <span className="monitor-unit"> / 32 GB</span>
          </div>
          <canvas ref={memCanvasRef} className="monitor-canvas" id="mon-mem-canvas"></canvas>
        </div>
      </div>
      <div className="monitor-row" style={{ flex: 1.2 }}>
        <div className="monitor-card" style={{ flex: 1 }}>
          <div className="monitor-card-title">Processes</div>
          <div className="monitor-processes" id="mon-procs">
            <div className="proc-row header">
              <span>Process</span>
              <span>PID</span>
              <span>CPU %</span>
              <span>MEM %</span>
            </div>
            {processes.map((p) => (
              <div key={`${p.name}-${p.pid}`} className="proc-row">
                <span>{p.name}</span>
                <span>{p.pid}</span>
                <span>{p.cpu}</span>
                <span>{p.mem}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
