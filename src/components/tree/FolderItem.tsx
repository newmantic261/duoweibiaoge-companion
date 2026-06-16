import React, { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { FolderNode } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { Modal, Button, Input } from '../common';

interface FolderItemProps {
  folder: FolderNode;
  level: number;
  projectId: string;
  onSelect: (folder: FolderNode) => void;
  selectedFolderId: string | null;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder, level, projectId, onSelect, selectedFolderId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const { addFolder, deleteFolder, toggleFolderExpanded } = useAppStore();

  const handleAddFolder = (e: React.FormEvent) => { e.preventDefault(); if (newFolderName.trim()) { addFolder(projectId, newFolderName.trim(), folder.id); setNewFolderName(''); setShowAddModal(false); } };
  const handleDelete = () => { if (window.confirm(`确定要删除 "${folder.name}" 及其所有子文件夹吗？`)) deleteFolder(projectId, folder.id); setShowMenu(false); };

  return (
    <div>
      <div className={`flex items-center px-2 py-1.5 rounded-sm cursor-pointer group ${selectedFolderId === folder.id ? 'bg-accent-50 text-accent' : 'hover:bg-gray-100'} transition-colors`} style={{ paddingLeft: `${level * 16 + 8}px` }} onClick={() => onSelect(folder)}>
        <button onClick={(e) => { e.stopPropagation(); toggleFolderExpanded(folder.id); }} className="p-0.5 hover:bg-gray-200 rounded transition-colors">
          <ChevronRight className={`w-4 h-4 transition-transform ${folder.expanded ? 'rotate-90' : ''}`} />
        </button>
        {folder.expanded ? <FolderOpen className="w-4 h-4 mr-2 text-accent flex-shrink-0" /> : <Folder className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />}
        <span className="flex-1 text-sm truncate">{folder.name}</span>
        <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} className="p-1 hover:bg-gray-200 rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-sm shadow-lg border z-20">
                <button onClick={(e) => { e.stopPropagation(); setShowAddModal(true); setShowMenu(false); }} className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors"><Plus className="w-4 h-4 mr-2" />添加子文件夹</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(); }} className="w-full flex items-center px-3 py-2 text-sm text-error hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4 mr-2" />删除</button>
              </div>
            </>
          )}
        </div>
      </div>
      {folder.expanded && folder.children.length > 0 && (
        <div className="tree-expand">
          {folder.children.sort((a, b) => a.order - b.order).map((child) => (
            <FolderItem key={child.id} folder={child} level={level + 1} projectId={projectId} onSelect={onSelect} selectedFolderId={selectedFolderId} />
          ))}
        </div>
      )}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="添加子文件夹" size="sm">
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
