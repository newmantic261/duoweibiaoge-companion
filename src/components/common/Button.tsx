import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', loading = false, children, className = '', disabled, ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-error text-white hover:bg-red-600 focus:ring-error',
  };
  const sizeStyles = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
