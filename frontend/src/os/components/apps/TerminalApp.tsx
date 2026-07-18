import React, { useState, useRef, useEffect } from 'react';

interface TerminalAppProps {
  windowId: string;
  cwd: string;
  onChangeCwd: (path: string) => void;
  vfs: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (path: string) => any;
    getParent: (path: string) => string;
  };
  uptime: string;
  onCloseWindow: (id: string) => void;
}

interface LogLine {
  id: string;
  html: string;
}

export function TerminalApp({
  windowId,
  cwd,
  onChangeCwd,
  vfs,
  uptime,
  onCloseWindow
}: TerminalAppProps) {
  const [lines, setLines] = useState<LogLine[]>(() => [
    { id: 'welcome-1', html: '<span class="terminal-info">QuabtomOS Enterprise Terminal v2.4.0</span>' },
    { id: 'welcome-2', html: 'Type <span style="color:var(--accent)">help</span> for available commands.<br>' }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [inputValue, setInputValue] = useState('');

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const addLine = (html: string) => {
    setLines((prev) => [...prev, { id: Math.random().toString(), html }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim();
      const currentPromptHtml = `<span class="terminal-prompt">admin@quabtom</span>:<span class="terminal-path">${cwd}</span>$ ${inputValue}`;
      addLine(currentPromptHtml);

      if (cmd) {
        const nextHistory = [...history, cmd];
        setHistory(nextHistory);
        setHistoryIdx(nextHistory.length);
        processCommand(cmd);
      }

      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      } else {
        setHistoryIdx(history.length);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = inputValue.split(' ');
      const partial = parts.pop() || '';
      const cmds = [
        'help', 'clear', 'echo', 'date', 'whoami', 'ls', 'cd', 'cat',
        'pwd', 'neofetch', 'uptime', 'ping', 'uname', 'hostname',
        'history', 'exit'
      ];
      const match = cmds.find((c) => c.startsWith(partial));
      if (match) {
        parts.push(match);
        setInputValue(parts.join(' '));
      }
    }
  };

  const processCommand = (cmdStr: string) => {
    const parts = cmdStr.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        addLine(`<span class="terminal-info">Available commands:</span>
  help          Show this help message
  clear         Clear the terminal
  echo [text]   Print text
  date          Show current date/time
  whoami        Show current user
  hostname      Show hostname
  uname [-a]    System information
  pwd           Print working directory
  ls [path]     List directory contents
  cd [path]     Change directory
  cat [file]    Display file contents
  neofetch      System information display
  uptime        System uptime
  ping [host]   Ping a host
  history       Command history
  exit          Close terminal`);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'echo':
        addLine(args.join(' '));
        break;
      case 'date':
        addLine(new Date().toString());
        break;
      case 'whoami':
        addLine('admin');
        break;
      case 'hostname':
        addLine('quabtom-enterprise');
        break;
      case 'uname':
        if (args.includes('-a')) {
          addLine('QuabtomOS 3.2.1 qt-kernel 6.8.0-qt x86_64 GNU/Quabtom');
        } else {
          addLine('QuabtomOS');
        }
        break;
      case 'pwd':
        addLine(cwd);
        break;
      case 'ls': {
        const target = args[0] ? (args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`) : cwd;
        const node = vfs.resolve(target);
        if (!node || node.type !== 'dir') {
          addLine(`<span class="terminal-error">ls: cannot access '${args[0] || '.'}': No such directory</span>`);
          break;
        }
        const entries = Object.entries(node.children);
        if (entries.length === 0) break;
        let lineHtml = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        entries.forEach(([name, entry]: [string, any]) => {
          const color = entry.type === 'dir' ? 'color:var(--accent-secondary)' : 'color:var(--text-secondary)';
          const suffix = entry.type === 'dir' ? '/' : '';
          lineHtml += `<span style="${color}">${name}${suffix}</span>  `;
        });
        addLine(lineHtml);
        break;
      }
      case 'cd': {
        if (!args[0] || args[0] === '~') {
          onChangeCwd('/home/admin');
          break;
        }
        if (args[0] === '..') {
          onChangeCwd(vfs.getParent(cwd));
          break;
        }
        const target = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
        const node = vfs.resolve(target);
        if (!node || node.type !== 'dir') {
          addLine(`<span class="terminal-error">cd: no such directory: ${args[0]}</span>`);
          break;
        }
        // Normalize
        const normalized = target.replace(/\/+$/, '') || '/';
        onChangeCwd(normalized);
        break;
      }
      case 'cat': {
        if (!args[0]) {
          addLine(`<span class="terminal-error">cat: missing operand</span>`);
          break;
        }
        const target = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
        const node = vfs.resolve(target);
        if (!node) {
          addLine(`<span class="terminal-error">cat: ${args[0]}: No such file</span>`);
          break;
        }
        if (node.type === 'dir') {
          addLine(`<span class="terminal-error">cat: ${args[0]}: Is a directory</span>`);
          break;
        }
        const content = node.content
          ? node.content.replace(/</g, '&lt;').replace(/\n/g, '<br>')
          : '<span class="terminal-error">(binary file, no text content)</span>';
        addLine(content);
        break;
      }
      case 'neofetch':
        addLine(`<span style="color:var(--accent);font-weight:700">
   ╔═══════════════════════╗
   ║     Q U A B T O M    ║
   ║         O S           ║
   ║     Enterprise        ║
   ╚═══════════════════════╝</span>
  <span class="terminal-info">OS:</span>       QuabtomOS Enterprise v3.2.1
  <span class="terminal-info">Kernel:</span>   qt-kernel 6.8.0-qt
  <span class="terminal-info">Shell:</span>    qsh 2.4.0
  <span class="terminal-info">DE:</span>       Quabtom Desktop Environment 3.0
  <span class="terminal-info">Resolution:</span> ${window.innerWidth}x${window.innerHeight}
  <span class="terminal-info">CPU:</span>      Quabtom Q9-7850X (16) @ 5.2GHz
  <span class="terminal-info">GPU:</span>      Quabtom Arc RTX 5090 24GB
  <span class="terminal-info">Memory:</span>   8.2 GiB / 32 GiB
  <span class="terminal-info">Uptime:</span>   ${uptime}`);
        break;
      case 'uptime':
        addLine(` ${new Date().toLocaleTimeString()} up ${uptime}, 1 user, load average: 0.42, 0.38, 0.35`);
        break;
      case 'ping': {
        if (!args[0]) {
          addLine(`<span class="terminal-error">ping: missing host operand</span>`);
          break;
        }
        const host = args[0];
        let i = 0;
        const printPing = () => {
          if (i < 4) {
            const ms = (Math.random() * 30 + 5).toFixed(1);
            addLine(`64 bytes from ${host}: icmp_seq=${i + 1} ttl=64 time=${ms} ms`);
            i++;
            setTimeout(printPing, 100);
          } else {
            addLine(`<span class="terminal-info">--- ${host} ping statistics ---</span>
4 packets transmitted, 4 received, 0% packet loss`);
          }
        };
        printPing();
        break;
      }
      case 'history':
        history.forEach((h, index) => addLine(`  ${index + 1}  ${h}`));
        break;
      case 'exit':
        onCloseWindow(windowId);
        break;
      default:
        addLine(`<span class="terminal-error">qsh: command not found: ${cmd}</span>`);
    }
  };

  return (
    <div className="terminal-body" id="term-body" ref={bodyRef} onClick={focusInput}>
      {lines.map((l) => (
        <div key={l.id} className="terminal-line" dangerouslySetInnerHTML={{ __html: l.html }} />
      ))}
      <div className="terminal-input-line">
        <span className="terminal-prompt">admin@quabtom</span>:
        <span className="terminal-path">{cwd}</span>$ &nbsp;
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          autoComplete="off"
          spellCheck="false"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
