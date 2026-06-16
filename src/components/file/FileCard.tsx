import React from 'react';
import { Image, FileText, Table, File, Trash2 } from 'lucide-react';
import { FileItem } from '../../types';
import { formatFileSize } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';

interface FileCardProps { file: FileItem; projectId: string; onClick: () => void; }

export const FileCard: React.FC<FileCardProps> = ({ file, projectId, onClick }) => {
  const { deleteFile } = useAppStore();
  const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); if (window.confirm(`确定要删除 "${file.name}" 吗？`)) deleteFile(projectId, file.id); };

  const getIcon = () => {
    switch (file.type) { case 'image': return <Image className="w-8 h-8" />; case 'pdf': return <FileText className="w-8 h-8" />; case 'word': return <FileText className="w-8 h-8" />; case 'excel': return <Table className="w-8 h-8" />; default: return <File className="w-8 h-8" />; }
  };
  const getColorClass = () => {
    switch (file.type) { case 'image': return 'text-success bg-green-50'; case 'pdf': return 'text-error bg-red-50'; case 'word': return 'text-accent-600 bg-blue-50'; case 'excel': return 'text-success bg-green-50'; default: return 'text-gray-500 bg-gray-50'; }
  };

  return (
    <div onClick={onClick} className="group relative bg-white rounded-lg border border-gray-100 p-3 cursor-pointer card-hover">
      <div className={`w-full h-32 rounded-sm mb-3 flex items-center justify-center ${getColorClass()}`}>
        {file.type === 'image' && file.preview ? <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded-sm" /> : getIcon()}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>{file.name}</p>
        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <button onClick={handleDelete} className="p-1.5 bg-white rounded-sm shadow-sm text-error hover:bg-red-50 transition-colors" title="删除"><Trash2 className="w-3 h-3" /></button>
      </div>
    </div>
  );
};
