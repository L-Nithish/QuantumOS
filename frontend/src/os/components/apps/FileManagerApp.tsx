import { useState, useEffect } from 'react';
import { getFileIcon } from '../../utils/fsHelper';

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: 'home', label: 'Home', path: '/home/admin' },
  { icon: 'description', label: 'Documents', path: '/home/admin/Documents' },
  { icon: 'download', label: 'Downloads', path: '/home/admin/Downloads' },
  { icon: 'image', label: 'Pictures', path: '/home/admin/Pictures' },
  { icon: 'folder', label: 'Root /', path: '/' },
  { icon: 'settings', label: 'etc', path: '/etc' },
  { icon: 'storage', label: 'var', path: '/var' },
];

interface FileManagerAppProps {
  currentPath: string;
  onChangePath: (path: string) => void;
  vfs: {
    resolve: (path: string) => any;
  };
  onOpenFileInEditor: (name: string, content: string) => void;
  onShowNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export function FileManagerApp({
  currentPath,
  onChangePath,
  vfs,
  onOpenFileInEditor,
  onShowNotification
}: FileManagerAppProps) {
  const node = vfs.resolve(currentPath);
  const [entries, setEntries] = useState<[string, any][]>([]);

  useEffect(() => {
    if (node && node.type === 'dir') {
      const sortedEntries = Object.entries(node.children).sort((a: [string, any], b: [string, any]) => {
        if (a[1].type === b[1].type) {
          return a[0].localeCompare(b[0]);
        }
        return a[1].type === 'dir' ? -1 : 1;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEntries(sortedEntries);
    } else {
      setEntries([]);
    }
  }, [node, currentPath]);

  const navigate = (path: string) => {
    const targetNode = vfs.resolve(path);
    if (targetNode && targetNode.type === 'dir') {
      // Normalize double slashes
      const normalized = path.replace(/\/+$/, '') || '/';
      onChangePath(normalized);
    }
  };

  const handleSidebarClick = (path: string) => {
    navigate(path);
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  const handleEntryDoubleClick = (name: string, entry: any) => {
    if (entry.type === 'dir') {
      const separator = currentPath === '/' ? '' : '/';
      navigate(`${currentPath}${separator}${name}`);
    } else {
      if (entry.content !== undefined) {
        onOpenFileInEditor(name, entry.content);
      } else {
        onShowNotification('Cannot open file', `${name} is not a text file.`, 'warning');
      }
    }
  };

  // Breadcrumbs parsing
  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="fm-container">
      <div className="fm-sidebar" id="fm-sidebar">
        {SIDEBAR_ITEMS.map((item) => (
          <div
            key={item.path}
            className={`fm-sidebar-item ${currentPath === item.path ? 'active' : ''}`}
            onClick={() => handleSidebarClick(item.path)}
          >
            <span className="material-icons-outlined">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="fm-main">
        <div className="fm-breadcrumb" id="fm-breadcrumb">
          <span onClick={() => handleBreadcrumbClick('/')} data-path="/">
            /
          </span>
          {pathParts.map((part, index) => {
            const accumulatedPath = '/' + pathParts.slice(0, index + 1).join('/');
            return (
              <span key={accumulatedPath}>
                <span className="sep">/</span>
                <span onClick={() => handleBreadcrumbClick(accumulatedPath)} data-path={accumulatedPath}>
                  {part}
                </span>
              </span>
            );
          })}
        </div>

        <div className="fm-files" id="fm-files">
          {entries.length === 0 ? (
            <div style={{ padding: '20px', color: 'var(--text-muted)' }}>
              Folder is empty
            </div>
          ) : (
            entries.map(([name, entry]) => {
              const icon = entry.type === 'dir' ? 'folder' : getFileIcon(name);
              return (
                <div
                  key={name}
                  className={`fm-file ${entry.type}`}
                  onDoubleClick={() => handleEntryDoubleClick(name, entry)}
                >
                  <span className="material-icons-outlined">{icon}</span>
                  <div className="fm-file-name">{name}</div>
                </div>
              );
            })
          )}
        </div>

        <div className="fm-status" id="fm-status">
          {entries.length} item{entries.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
