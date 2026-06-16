import { Project, Template, FolderNode, FileItem } from '../types';

const createFolder = (id: string, name: string, parentId: string | null, order: number, children: FolderNode[] = []): FolderNode => ({
  id,
  name,
  parentId,
  children,
  order,
  createdAt: new Date().toISOString(),
  expanded: true,
});

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: '通用资料模板',
    description: '适用于一般资料整理：基础资料、业绩材料、证书证明三大类',
    isBuiltIn: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    folderTree: [
      createFolder('f1-1', '基础资料', null, 0, [
        createFolder('f1-1-1', '身份证件', 'f1-1', 0),
        createFolder('f1-1-2', '学历证明', 'f1-1', 1),
        createFolder('f1-1-3', '社保证明', 'f1-1', 2),
      ]),
      createFolder('f1-2', '业绩材料', null, 1, [
        createFolder('f1-2-1', '项目业绩', 'f1-2', 0),
        createFolder('f1-2-2', '获奖证明', 'f1-2', 1),
      ]),
      createFolder('f1-3', '证书证明', null, 2, [
        createFolder('f1-3-1', '职业资格证书', 'f1-3', 0),
        createFolder('f1-3-2', '职称证书', 'f1-3', 1),
      ]),
    ],
  },
  {
    id: 'template-2',
    name: '职称评审模板',
    description: '专用于职称评审材料整理：个人材料、学术成果、业绩材料',
    isBuiltIn: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    folderTree: [
      createFolder('f2-1', '个人材料', null, 0, [
        createFolder('f2-1-1', '评审表', 'f2-1', 0),
        createFolder('f2-1-2', '公示证明', 'f2-1', 1),
      ]),
      createFolder('f2-2', '学术成果', null, 1, [
        createFolder('f2-2-1', '论文发表', 'f2-2', 0),
        createFolder('f2-2-2', '专著专利', 'f2-2', 1),
      ]),
      createFolder('f2-3', '业绩材料', null, 2, [
        createFolder('f2-3-1', '工作总结', 'f2-3', 0),
        createFolder('f2-3-2', '项目证明', 'f2-3', 1),
      ]),
    ],
  },
  {
    id: 'template-3',
    name: '项目归档模板',
    description: '适用于项目全过程资料归档：文档、设计、验收',
    isBuiltIn: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    folderTree: [
      createFolder('f3-1', '项目文档', null, 0, [
        createFolder('f3-1-1', '前期文件', 'f3-1', 0),
        createFolder('f3-1-2', '过程文件', 'f3-1', 1),
      ]),
      createFolder('f3-2', '设计图纸', null, 1, [
        createFolder('f3-2-1', '方案设计', 'f3-2', 0),
        createFolder('f3-2-2', '施工图纸', 'f3-2', 1),
      ]),
      createFolder('f3-3', '验收报告', null, 2, [
        createFolder('f3-3-1', '中期验收', 'f3-3', 0),
        createFolder('f3-3-2', '竣工验收', 'f3-3', 1),
      ]),
    ],
  },
];

const mockFiles: FileItem[] = [
  { id: 'file-1', name: '身份证正面.jpg', folderId: 'f1-1-1', type: 'image', size: 1024000, url: 'https://picsum.photos/800/600?random=1', preview: 'https://picsum.photos/400/300?random=1', createdAt: '2024-03-01T00:00:00.000Z' },
  { id: 'file-2', name: '学历证书.pdf', folderId: 'f1-1-2', type: 'pdf', size: 2048000, url: '/sample.pdf', preview: '', createdAt: '2024-03-02T00:00:00.000Z' },
  { id: 'file-3', name: '项目业绩表.xlsx', folderId: 'f1-2-1', type: 'excel', size: 512000, url: '/sample.xlsx', preview: '', createdAt: '2024-03-03T00:00:00.000Z' },
  { id: 'file-4', name: '职称申报表.docx', folderId: 'f2-1-1', type: 'word', size: 768000, url: '/sample.docx', preview: '', createdAt: '2024-03-04T00:00:00.000Z' },
  { id: 'file-5', name: '项目全景.jpg', folderId: 'f3-1-1', type: 'image', size: 1536000, url: 'https://picsum.photos/800/600?random=2', preview: 'https://picsum.photos/400/300?random=2', createdAt: '2024-03-05T00:00:00.000Z' },
];

export const mockProjects: Project[] = [
  {
    id: 'project-1', name: '2025年职称评审', description: '2025年度工程系列职称申报材料整理',
    coverImage: 'https://picsum.photos/400/300?random=10', createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-06-10T00:00:00.000Z', ownerId: 'user-1',
    folderTree: JSON.parse(JSON.stringify(mockTemplates[1].folderTree)), files: mockFiles,
  },
  {
    id: 'project-2', name: 'XX项目资料包', description: '某工程项目全过程资料归档',
    coverImage: 'https://picsum.photos/400/300?random=11', createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-06-08T00:00:00.000Z', ownerId: 'user-1',
    folderTree: JSON.parse(JSON.stringify(mockTemplates[2].folderTree)), files: [mockFiles[4]],
  },
  {
    id: 'project-3', name: '资质申请材料', description: '企业资质申请整理',
    coverImage: 'https://picsum.photos/400/300?random=12', createdAt: '2025-04-10T00:00:00.000Z',
    updatedAt: '2025-06-05T00:00:00.000Z', ownerId: 'user-1',
    folderTree: JSON.parse(JSON.stringify(mockTemplates[0].folderTree)), files: [],
  },
];

export const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days}天前`;
  if (days < 30) return `${Math.floor(days / 7)}周前`;
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
