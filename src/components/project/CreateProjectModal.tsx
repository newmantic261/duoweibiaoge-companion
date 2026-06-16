import React, { useState } from 'react';
import { Modal, Button, Input, Textarea } from '../common';
import { useAppStore } from '../../store/useAppStore';
import { mockTemplates } from '../../data/mockData';

interface CreateProjectModalProps { isOpen: boolean; onClose: () => void; }

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  const [loading, setLoading] = useState(false);
  const { addProject } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const template = mockTemplates.find(t => t.id === selectedTemplate);
    addProject({ name: name.trim(), description: description.trim(), coverImage: `https://picsum.photos/400/300?random=${Date.now()}`, ownerId: 'user-1', folderTree: template ? JSON.parse(JSON.stringify(template.folderTree)) : [], files: [] });
    setLoading(false);
    setName('');
    setDescription('');
    setSelectedTemplate('template-1');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="创建新项目" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="项目名称" value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入项目名称" required />
        <Textarea label="项目描述" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="请输入项目描述（可选）" rows={3} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">选择目录模板</label>
          <div className="grid grid-cols-1 gap-2">
            {mockTemplates.map((template) => (
              <label key={template.id} className={`flex items-start p-3 border rounded-sm cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-accent bg-accent-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="template" value={template.id} checked={selectedTemplate === template.id} onChange={(e) => setSelectedTemplate(e.target.value)} className="mt-1 mr-3" />
                <div><p className="font-medium text-gray-900">{template.name}</p><p className="text-sm text-gray-500">{template.description}</p></div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>取消</Button>
          <Button type="submit" variant="primary" loading={loading}>创建项目</Button>
        </div>
      </form>
    </Modal>
  );
};
