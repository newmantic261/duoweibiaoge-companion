import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, FolderOpen, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import { formatDate } from '../../data/mockData';
import { Card, CardContent } from '../common';

interface ProjectCardProps { project: Project; }

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  return (
    <Card hover onClick={() => navigate(`/project/${project.id}`)} className="overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-semibold text-lg truncate">{project.name}</h3></div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{formatDate(project.updatedAt)}</span>
            <span className="flex items-center"><FolderOpen className="w-3 h-3 mr-1" />{project.folderTree.length}</span>
            <span className="flex items-center"><FileText className="w-3 h-3 mr-1" />{project.files.length}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <span className="text-accent text-sm flex items-center group-hover:translate-x-1 transition-transform">查看详情 <ArrowRight className="w-4 h-4 ml-1" /></span>
        </div>
      </CardContent>
    </Card>
  );
};
