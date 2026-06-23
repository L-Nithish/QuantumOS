import { useState, useEffect } from 'react';

export interface ProcessItem {
  name: string;
  pid: number;
  cpu: string;
  mem: string;
}

const INITIAL_PROCESSES = [
  { name: 'qt-desktop', pid: 1024 },
  { name: 'qt-compositor', pid: 1012 },
  { name: 'qsh', pid: 2048 },
  { name: 'qt-filemanager', pid: 3100 },
  { name: 'qt-terminal', pid: 3200 },
  { name: 'qt-system-monitor', pid: 3300 },
  { name: 'qt-network-daemon', pid: 512 },
  { name: 'qt-audio-service', pid: 780 },
  { name: 'qt-security-agent', pid: 620 },
  { name: 'qt-indexer', pid: 890 },
  { name: 'qt-notification-d', pid: 950 },
  { name: 'kernel-task', pid: 0 },
];

export function useSystemMonitor() {
  const [cpuVal, setCpuVal] = useState(25);
  const [memVal, setMemVal] = useState(8.2);
  const [cpuHistory, setCpuHistory] = useState<number[]>(() => Array(60).fill(25));
  const [memHistory, setMemHistory] = useState<number[]>(() => Array(60).fill(8.2));
  const [processes, setProcesses] = useState<ProcessItem[]>([]);

  useEffect(() => {
    const updateMetrics = () => {
      setCpuVal((prev) => {
        const next = Math.max(5, Math.min(95, prev + (Math.random() - 0.48) * 12));
        setCpuHistory((history) => [...history.slice(1), next]);
        return next;
      });

      setMemVal((prev) => {
        const next = Math.max(4, Math.min(28, prev + (Math.random() - 0.5) * 1.5));
        setMemHistory((history) => [...history.slice(1), next]);
        return next;
      });

      const updatedProcs = INITIAL_PROCESSES.map((p) => ({
        ...p,
        cpu: (Math.random() * 8 + 0.1).toFixed(1),
        mem: (Math.random() * 4 + 0.2).toFixed(1),
      }));
      setProcesses(updatedProcs);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    cpuVal,
    memVal,
    cpuHistory,
    memHistory,
    processes,
  };
}
