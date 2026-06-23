import { useState, useCallback } from 'react';
import type { DirectoryNode, FSNode } from '../types/fs';
import { INITIAL_FS } from '../services/vfs';
import { fsResolve, fsParent } from '../utils/fsHelper';

export function useVFS() {
  const [fs, setFs] = useState<DirectoryNode>(INITIAL_FS);

  const resolve = useCallback((path: string): FSNode | null => {
    return fsResolve(fs, path);
  }, [fs]);

  const getParent = useCallback((path: string): string => {
    return fsParent(path);
  }, []);

  const writeFile = useCallback((path: string, content: string, size = '1 KB') => {
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
  }, []);

  return {
    fs,
    resolve,
    getParent,
    writeFile,
  };
}
