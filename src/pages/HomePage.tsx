import React, { useState } from 'react';
import { Plus, Layers, Zap, Shield, FolderOpen } from 'lucide-react';
import { Header, Button } from '../components/common';
import { ProjectCard, CreateProjectModal } from '../components/project';
import { useAppStore } from '../store/useAppStore';

export const HomePage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { projects, user } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-700 to-accent-600 text-white">
        <div className="absolute inset-0 light-effect" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm">让资料组卷变得简单有序</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">多维伴侣<br /><span className="text-accent-200">您的资料管理助手</span></h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">告别繁琐的文件夹管理，一站式整理、预览、归档您的项目资料。支持飞书多维表格，让协作更高效。</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" onClick={() => setShowCreateModal(true)} className="bg-white text-primary hover:bg-white/90">
                <Plus className="w-5 h-5 mr-2" />创建新项目
              </Button>
              {user ? (
                <Button variant="outline" size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="border-white text-white hover:bg-white hover:text-primary">
                  浏览项目
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/register'} className="border-white text-white hover:bg-white hover:text-primary">
                  立即体验
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择多维伴侣？</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">我们专注于解决资料管理中的痛点，让您的资料整理工作更加高效</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md card-hover">
              <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">可视化目录树</h3>
              <p className="text-gray-600 text-sm">直观的树形结构展示，支持拖拽排序，让目录组织一目了然</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md card-hover">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">文件预览</h3>
              <p className="text-gray-600 text-sm">支持图片、PDF、Word、Excel等常见格式的在线预览，无需下载即可查看</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">安全可靠</h3>
              <p className="text-gray-600 text-sm">本地优先的数据存储，保障您的资料安全，支持配置模板复用</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user ? '我的项目' : '示例项目'}</h2>
              <p className="text-gray-600 mt-1">{user ? `共 ${projects.length} 个项目` : '探索多维伴侣的强大功能'}</p>
            </div>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />新建项目
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
              <p className="text-gray-500 mb-4">创建您的第一个项目开始整理资料</p>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />创建项目
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (<ProjectCard key={project.id} project={project} />))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Layers className="w-6 h-6" />
              <span className="font-semibold">多维伴侣</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 多维伴侣. 使用 TRAE AI 打造</p>
          </div>
        </div>
      </footer>

      <CreateProjectModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};
