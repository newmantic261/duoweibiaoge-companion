import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { FolderNode, Project } from '../../types';
import { FolderItem } from './FolderItem';
import { Modal, Button, Input } from '../common';
import { useAppStore } from '../../store/useAppStore';

interface FolderTreeProps {
  project: Project;
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderNode) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ project, selectedFolderId, onSelectFolder }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const { addFolder } = useAppStore();

  const handleAddFolder = (e: React.FormEvent) => { e.preventDefault(); if (newFolderName.trim()) { addFolder(project.id, newFolderName.trim(), null); setNewFolderName(''); setShowAddModal(false); } };

  return (
    <div className="h-full flex flex-col bg-gray-50/50">
      <div className="px-4 py-3 border-b bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center"><Folder className="w-4 h-4 mr-2 text-accent" />目录结构</h3>
          <button onClick={() => setShowAddModal(true)} className="p-1.5 text-accent hover:bg-accent-50 rounded-sm transition-colors" title="添加根文件夹"><Plus className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {project.folderTree.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Folder className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">暂无文件夹</p><p className="text-xs mt-1">点击上方 + 添加</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {project.folderTree.sort((a, b) => a.order - b.order).map((folder) => (
              <FolderItem key={folder.id} folder={folder} level={0} projectId={project.id} onSelect={onSelectFolder} selectedFolderId={selectedFolderId} />
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="添加根文件夹" size="sm">
        <form onSubmit={handleAddFolder}>
          <Input label="文件夹名称" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="请输入文件夹名称" autoFocus />
          <div className="flex justify-end space-x-3 mt-4">
            <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>取消</Button>
            <Button type="submit" variant="primary">添加</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
