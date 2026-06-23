export interface FileNode {
  type: 'file';
  size: string;
  mod: string;
  content?: string;
}

export interface DirectoryNode {
  type: 'dir';
  children: {
    [name: string]: FileNode | DirectoryNode;
  };
}

export type FSNode = FileNode | DirectoryNode;
