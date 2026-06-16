import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</div>}
      <input className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} border rounded-sm ${error ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-accent'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${className}`} {...props} />
    </div>
    {error && <p className="mt-1 text-sm text-error">{error}</p>}
  </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <textarea className={`w-full px-4 py-2 border rounded-sm ${error ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-accent'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 resize-none ${className}`} {...props} />
    {error && <p className="mt-1 text-sm text-error">{error}</p>}
  </div>
);
