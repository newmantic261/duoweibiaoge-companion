import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Download, Trash2, FolderTree, Copy } from 'lucide-react';
import { Header, Button, Card, CardContent, Modal, Input, Textarea } from '../components/common';
import { useAppStore } from '../store/useAppStore';
import { Template } from '../types';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { templates, addTemplate, deleteTemplate } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');

  const handleCreateTemplate = (e: React.FormEvent) => { e.preventDefault(); if (newTemplateName.trim()) { addTemplate({ name: newTemplateName.trim(), description: newTemplateDesc.trim(), folderTree: [], isBuiltIn: false }); setNewTemplateName(''); setNewTemplateDesc(''); setShowCreateModal(false); } };
  const handleDelete = (template: Template) => { if (template.isBuiltIn) { alert('内置模板无法删除'); return; } if (window.confirm(`确定要删除模板 "${template.name}" 吗？`)) deleteTemplate(template.id); };
  const handleExport = (template: Template) => { const dataStr = JSON.stringify(template, null, 2); const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr); const linkElement = document.createElement('a'); linkElement.setAttribute('href', dataUri); linkElement.setAttribute('download', `${template.name}.json`); linkElement.click(); };
  const handleDuplicate = (template: Template) => { addTemplate({ name: `${template.name} (副本)`, description: template.description, folderTree: JSON.parse(JSON.stringify(template.folderTree)), isBuiltIn: false }); };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center text-gray-600 hover:text-primary mb-2"><ArrowLeft className="w-4 h-4 mr-1" />返回</button>
            <h1 className="text-2xl font-bold text-gray-900">模板库</h1>
            <p className="text-gray-600 mt-1">管理您的目录配置模板</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />新建模板
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    {template.isBuiltIn && (<span className="inline-block px-2 py-0.5 bg-white/20 rounded-full text-xs mt-1">内置模板</span>)}
                  </div>
                  <FolderTree className="w-8 h-8 opacity-50" />
                </div>
              </div>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description || '暂无描述'}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>文件夹：{template.folderTree.length}</span>
                  <span>子文件夹：{template.folderTree.reduce((acc, f) => acc + countSubfolders(f), 0)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicate(template)} className="flex-1">
                    <Copy className="w-4 h-4 mr-1" />复制
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExport(template)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  {!template.isBuiltIn && (
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(template)} className="text-error hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FolderTree className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无模板</h3>
            <p className="text-gray-500 mb-4">创建您的第一个模板开始整理资料</p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />创建模板
            </Button>
          </div>
        )}
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="新建模板" size="md">
        <form onSubmit={handleCreateTemplate}>
          <Input label="模板名称" value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} placeholder="请输入模板名称" autoFocus />
          <Textarea label="模板描述" value={newTemplateDesc} onChange={(e) => setNewTemplateDesc(e.target.value)} placeholder="请输入模板描述（可选）" rows={3} className="mt-4" />
          <div className="flex justify-end space-x-3 mt-4">
            <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>取消</Button>
            <Button type="submit" variant="primary">创建</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

function countSubfolders(folder: { children: any[] }): number {
  return folder.children.reduce((acc, child) => acc + 1 + countSubfolders(child), 0);
}
