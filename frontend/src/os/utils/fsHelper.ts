import type { DirectoryNode, FSNode } from '../types/fs';

export function fsResolve(fs: DirectoryNode, path: string): FSNode | null {
  const parts = path.replace(/\/+$/, '').split('/').filter(Boolean);
  let node: FSNode = fs;
  for (const p of parts) {
    if (!node || node.type !== 'dir' || !node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}

export function fsParent(path: string): string {
  const parts = path.replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return '/';
  parts.pop();
  return '/' + parts.join('/');
}

export function getFileIcon(name: string): string {
  if (name.endsWith('.pdf')) return 'picture_as_pdf';
  if (name.endsWith('.txt') || name.endsWith('.md')) return 'description';
  if (name.endsWith('.xlsx') || name.endsWith('.csv')) return 'table_chart';
  if (name.endsWith('.png') || name.endsWith('.jpg')) return 'image';
  if (name.endsWith('.html')) return 'code';
  if (name.endsWith('.deb')) return 'deployed_code';
  if (name.endsWith('.json')) return 'data_object';
  if (name.endsWith('.log')) return 'receipt_long';
  if (name.startsWith('.')) return 'settings';
  return 'insert_drive_file';
}
