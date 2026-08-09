import { useState, useCallback, useEffect } from 'react';
import type { DirectoryNode, FSNode } from '../types/fs';
import { INITIAL_FS } from '../services/vfs';
import { fsResolve, fsParent } from '../utils/fsHelper';
import { vfsService } from '../../api/vfsService';

export function useVFS() {
  const [fs, setFs] = useState<DirectoryNode>(INITIAL_FS);

  useEffect(() => {
    // Only load if token exists
    if (!localStorage.getItem('quantumos_token')) return;
    
    const loadFs = async () => {
      try {
        const nodes = await vfsService.getAllNodes();
        
        setFs((prevFs) => {
          const newFs = JSON.parse(JSON.stringify(prevFs)) as DirectoryNode;
          
          nodes.forEach((node) => {
            const parts = node.path.replace(/\/+$/, '').split('/').filter(Boolean);
            if (parts.length === 0) return;
            
            let current: DirectoryNode = newFs;
            for (let i = 0; i < parts.length - 1; i++) {
              const part = parts[i];
              if (!current.children[part] || current.children[part].type !== 'dir') {
                current.children[part] = { type: 'dir', children: {} };
              }
              current = current.children[part] as DirectoryNode;
            }
            
            const fileName = parts[parts.length - 1];
            current.children[fileName] = {
              type: node.type as 'dir' | 'file',
              content: node.content,
              size: node.content ? `${(node.content.length / 1024).toFixed(1)} KB` : '0 KB',
              mod: node.updatedAt.split('T')[0]
            };
          });
          
          return newFs;
        });
      } catch (err) {
        console.error('Failed to load VFS from backend', err);
      }
    };
    
    loadFs();
  }, []);

  const resolve = useCallback((path: string): FSNode | null => {
    return fsResolve(fs, path);
  }, [fs]);

  const getParent = useCallback((path: string): string => {
    return fsParent(path);
  }, []);

  const writeFile = useCallback(async (path: string, content: string, size = '1 KB') => {
    // 1. Update local state
    setFs((prevFs) => {
      const newFs = JSON.parse(JSON.stringify(prevFs)) as DirectoryNode;
      const parts = path.replace(/\/+$/, '').split('/').filter(Boolean);
      let current: DirectoryNode = newFs;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current.children[part] || current.children[part].type !== 'dir') {
          current.children[part] = { type: 'dir', children: {} };
        }
        current = current.children[part] as DirectoryNode;
      }

      const fileName = parts[parts.length - 1];
      const today = new Date().toISOString().split('T')[0];
      current.children[fileName] = {
        type: 'file',
        size,
        mod: today,
        content
      };

      return newFs;
    });
    
    // 2. Persist to backend
    try {
      const fileName = path.split('/').pop() || 'unnamed';
      await vfsService.createNode({
        name: fileName,
        path: path,
        type: 'file',
        content: content
      });
    } catch (err) {
      console.error('Failed to save file to backend', err);
    }
  }, []);

  return {
    fs,
    resolve,
    getParent,
    writeFile,
  };
}
