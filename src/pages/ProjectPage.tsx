import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { Button } from '../components/common';
import { FolderTree } from '../components/tree';
import { FileCard } from '../components/file';
import { FilePreview } from '../components/preview';
import { useAppStore } from '../store/useAppStore';
import { FolderNode, FileItem } from '../types';

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, setCurrentProject, currentProject, getFilesByFolderId } = useAppStore();

  const [selectedFolder, setSelectedFolder] = useState<FolderNode | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (id) {
      const project = getProjectById(id);
      if (project) { setCurrentProject(project); if (project.folderTree.length > 0) setSelectedFolder(project.folderTree[0]); }
      else navigate('/');
    }
    return () => setCurrentProject(null);
  }, [id]);

  if (!currentProject) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">加载中...</p>
      </div>
    </div>
  );

  const files = selectedFolder ? getFilesByFolderId(currentProject.id, selectedFolder.id) : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
              <div>
                <h1 className="font-semibold text-gray-900">{currentProject.name}</h1>
                <p className="text-xs text-gray-500">{currentProject.folderTree.length} 个文件夹 · {currentProject.files.length} 个文件</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto p-4">
        <div className="flex gap-4 h-[calc(100vh-8rem)]">
          <div className="w-72 bg-white rounded-lg shadow-sm border overflow-hidden flex-shrink-0">
            <FolderTree project={currentProject} selectedFolderId={selectedFolder?.id || null} onSelectFolder={setSelectedFolder} />
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div>
                <h2 className="font-medium text-gray-900">{selectedFolder?.name || '请选择文件夹'}</h2>
                <p className="text-xs text-gray-500">{files.length} 个文件</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-accent-50 text-accent' : 'text-gray-400 hover:bg-gray-100'}`}><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-accent-50 text-accent' : 'text-gray-400 hover:bg-gray-100'}`}><List className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {files.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <p className="text-sm">该文件夹暂无文件</p>
                    <p className="text-xs mt-1">拖拽文件到此处上传</p>
                  </div>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-2'}>
                  {files.map((file) => (<FileCard key={file.id} file={file} projectId={currentProject.id} onClick={() => { setSelectedFile(file); setShowPreview(true); }} />))}
                </div>
              )}
            </div>
          </div>

          {showPreview && selectedFile && (
            <div className="w-96 bg-white rounded-lg shadow-sm border overflow-hidden flex-shrink-0">
              <FilePreview file={selectedFile} onClose={() => { setShowPreview(false); setSelectedFile(null); }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
