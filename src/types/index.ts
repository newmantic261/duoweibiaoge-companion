export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface FolderNode {
  id: string;
  name: string;
  parentId: string | null;
  children: FolderNode[];
  order: number;
  createdAt: string;
  expanded?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  folderId: string;
  type: 'image' | 'pdf' | 'word' | 'excel' | 'other';
  size: number;
  url: string;
  preview?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  folderTree: FolderNode[];
  files: FileItem[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  folderTree: FolderNode[];
  isBuiltIn: boolean;
  createdAt: string;
}
