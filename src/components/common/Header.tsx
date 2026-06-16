import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Search, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from './Button';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useAppStore();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">多维伴侣</span>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索项目..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full transition-colors" title={theme === 'light' ? '深色模式' : '浅色模式'}>
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/templates')} className="hidden sm:flex">模板库</Button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <LogOut className="w-4 h-4 mr-2" />退出登录
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>登录</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>注册</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
