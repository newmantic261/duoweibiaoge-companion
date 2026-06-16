import React from 'react';
import { X, FileText, Table, File } from 'lucide-react';
import { FileItem } from '../../types';
import { formatFileSize } from '../../data/mockData';
import { Button } from '../common';

interface FilePreviewProps { file: FileItem | null; onClose: () => void; }

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  if (!file) return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center text-gray-400">
        <File className="w-16 h-16 mx-auto mb-3 opacity-50" />
        <p className="text-sm">选择文件查看预览</p>
      </div>
    </div>
  );

  const getIcon = () => {
    switch (file.type) { case 'image': return <FileText className="w-16 h-16" />; case 'pdf': return <FileText className="w-16 h-16" />; case 'word': return <FileText className="w-16 h-16" />; case 'excel': return <Table className="w-16 h-16" />; default: return <File className="w-16 h-16" />; }
  };
  const getColorClass = () => {
    switch (file.type) { case 'image': return 'text-success'; case 'pdf': return 'text-error'; case 'word': return 'text-accent-600'; case 'excel': return 'text-success'; default: return 'text-gray-500'; }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50/50">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div className="flex items-center space-x-3 min-w-0">
          <span className={getColorClass()}>{getIcon()}</span>
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-full mx-auto">
          {file.type === 'image' ? (
            <div className="flex justify-center"><img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain rounded-sm shadow-lg" /></div>
          ) : file.type === 'pdf' ? (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center py-12">
                <FileText className={`w-24 h-24 mx-auto mb-4 ${getColorClass()}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{file.name}</h3>
                <p className="text-gray-500 mb-4">这是一个 PDF 文档</p>
                <p className="text-sm text-gray-400">完整预览需要下载后查看</p>
              </div>
            </div>
          ) : file.type === 'word' ? (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center py-12">
                <FileText className={`w-24 h-24 mx-auto mb-4 ${getColorClass()}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{file.name}</h3>
                <p className="text-gray-500 mb-4">这是一个 Word 文档</p>
                <p className="text-sm text-gray-400">完整预览需要下载后查看</p>
              </div>
            </div>
          ) : file.type === 'excel' ? (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center py-12">
                <Table className={`w-24 h-24 mx-auto mb-4 ${getColorClass()}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{file.name}</h3>
                <p className="text-gray-500 mb-4">这是一个 Excel 电子表格</p>
                <p className="text-sm text-gray-400">完整预览需要下载后查看</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center py-12">
                <File className={`w-24 h-24 mx-auto mb-4 ${getColorClass()}`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{file.name}</h3>
                <p className="text-gray-500 mb-4">暂不支持此文件类型的预览</p>
                <p className="text-sm text-gray-400">请下载后查看</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
