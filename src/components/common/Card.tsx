import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-100 ${hover ? 'card-hover cursor-pointer' : ''} ${className}`} onClick={onClick}>{children}</div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-4 py-3 border-b border-gray-100 ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-4 py-3 border-t border-gray-100 ${className}`}>{children}</div>
);
