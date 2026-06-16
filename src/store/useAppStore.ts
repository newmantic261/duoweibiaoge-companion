import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Project, Template, FolderNode, FileItem } from '../types';
import { mockProjects, mockTemplates, generateId } from '../data/mockData';

interface AppStore {
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  templates: Template[];
  theme: 'light' | 'dark';

  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  setCurrentProject: (project: Project | null) => void;

  addFolder: (projectId: string, name: string, parentId: string | null) => void;
  updateFolder: (projectId: string, folder: FolderNode) => void;
  deleteFolder: (projectId: string, folderId: string) => void;
  toggleFolderExpanded: (folderId: string) => void;

  addFile: (projectId: string, file: Omit<FileItem, 'id' | 'createdAt'>) => void;
  deleteFile: (projectId: string, fileId: string) => void;

  setTemplates: (templates: Template[]) => void;
  addTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => Template;
  deleteTemplate: (templateId: string) => void;

  toggleTheme: () => void;

  getProjectById: (id: string) => Project | undefined;
  getFilesByFolderId: (projectId: string, folderId: string) => FileItem[];
}

const findFolderById = (folders: FolderNode[], id: string): FolderNode | null => {
  for (const folder of folders) {
    if (folder.id === id) return folder;
    const found = findFolderById(folder.children, id);
    if (found) return found;
  }
  return null;
};

const updateFolderInTree = (folders: FolderNode[], updatedFolder: FolderNode): FolderNode[] => {
  return folders.map(folder => {
    if (folder.id === updatedFolder.id) return { ...updatedFolder };
    if (folder.children.length > 0) return { ...folder, children: updateFolderInTree(folder.children, updatedFolder) };
    return folder;
  });
};

const deleteFolderFromTree = (folders: FolderNode[], folderId: string): FolderNode[] => {
  return folders.filter(folder => folder.id !== folderId).map(folder => ({ ...folder, children: deleteFolderFromTree(folder.children, folderId) }));
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: null,
      projects: mockProjects,
      currentProject: null,
      templates: mockTemplates,
      theme: 'light',

      setUser: (user) => set({ user }),

      login: async (email, password) => {
        if (email && password) {
          const user: User = { id: 'user-1', name: email.split('@')[0], email, createdAt: new Date().toISOString() };
          set({ user });
          return true;
        }
        return false;
      },

      register: async (name, email, password) => {
        if (name && email && password) {
          const user: User = { id: generateId(), name, email, createdAt: new Date().toISOString() };
          set({ user });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null }),

      setProjects: (projects) => set({ projects }),

      addProject: (projectData) => {
        const newProject: Project = { ...projectData, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        set(state => ({ projects: [...state.projects, newProject] }));
        return newProject;
      },

      updateProject: (project) => {
        set(state => ({
          projects: state.projects.map(p => p.id === project.id ? { ...project, updatedAt: new Date().toISOString() } : p),
          currentProject: state.currentProject?.id === project.id ? { ...project, updatedAt: new Date().toISOString() } : state.currentProject,
        }));
      },

      deleteProject: (projectId) => {
        set(state => ({
          projects: state.projects.filter(p => p.id !== projectId),
          currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
        }));
      },

      setCurrentProject: (project) => set({ currentProject: project }),

      addFolder: (projectId, name, parentId) => {
        const newFolder: FolderNode = { id: generateId(), name, parentId, children: [], order: 0, createdAt: new Date().toISOString(), expanded: true };
        set(state => {
          const projects = state.projects.map(project => {
            if (project.id !== projectId) return project;
            if (parentId === null) return { ...project, folderTree: [...project.folderTree, newFolder], updatedAt: new Date().toISOString() };
            const folder = findFolderById(project.folderTree, parentId);
            if (folder) folder.children.push(newFolder);
            return { ...project, folderTree: [...project.folderTree], updatedAt: new Date().toISOString() };
          });
          return { projects, currentProject: projects.find(p => p.id === projectId) || state.currentProject };
        });
      },

      updateFolder: (projectId, folder) => {
        set(state => {
          const projects = state.projects.map(project => {
            if (project.id !== projectId) return project;
            return { ...project, folderTree: updateFolderInTree(project.folderTree, folder), updatedAt: new Date().toISOString() };
          });
          return { projects, currentProject: projects.find(p => p.id === projectId) || state.currentProject };
        });
      },

      deleteFolder: (projectId, folderId) => {
        set(state => {
          const projects = state.projects.map(project => {
            if (project.id !== projectId) return project;
            return { ...project, folderTree: deleteFolderFromTree(project.folderTree, folderId), files: project.files.filter(f => f.folderId !== folderId), updatedAt: new Date().toISOString() };
          });
          return { projects, currentProject: projects.find(p => p.id === projectId) || state.currentProject };
        });
      },

      toggleFolderExpanded: (folderId) => {
        set(state => {
          if (!state.currentProject) return state;
          const folder = findFolderById(state.currentProject.folderTree, folderId);
          if (folder) folder.expanded = !folder.expanded;
          return { currentProject: { ...state.currentProject, folderTree: [...state.currentProject.folderTree] } };
        });
      },

      addFile: (projectId, fileData) => {
        const newFile: FileItem = { ...fileData, id: generateId(), createdAt: new Date().toISOString() };
        set(state => {
          const projects = state.projects.map(project => project.id !== projectId ? project : { ...project, files: [...project.files, newFile], updatedAt: new Date().toISOString() });
          return { projects, currentProject: projects.find(p => p.id === projectId) || state.currentProject };
        });
      },

      deleteFile: (projectId, fileId) => {
        set(state => {
          const projects = state.projects.map(project => project.id !== projectId ? project : { ...project, files: project.files.filter(f => f.id !== fileId), updatedAt: new Date().toISOString() });
          return { projects, currentProject: projects.find(p => p.id === projectId) || state.currentProject };
        });
      },

      setTemplates: (templates) => set({ templates }),

      addTemplate: (templateData) => {
        const newTemplate: Template = { ...templateData, id: generateId(), createdAt: new Date().toISOString() };
        set(state => ({ templates: [...state.templates, newTemplate] }));
        return newTemplate;
      },

      deleteTemplate: (templateId) => {
        set(state => ({ templates: state.templates.filter(t => t.id !== templateId) }));
      },

      toggleTheme: () => { set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })); },

      getProjectById: (id) => get().projects.find(p => p.id === id),

      getFilesByFolderId: (projectId, folderId) => {
        const project = get().projects.find(p => p.id === projectId);
        return project ? project.files.filter(f => f.folderId === folderId) : [];
      },
    }),
    { name: 'duowei-storage', partialize: (state) => ({ user: state.user, projects: state.projects, templates: state.templates, theme: state.theme }) }
  )
);
