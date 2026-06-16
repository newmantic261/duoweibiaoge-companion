import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Layers, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components/common';
import { useAppStore } from '../store/useAppStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('请填写所有字段'); return; }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate('/');
    else setError('登录失败，请检查邮箱和密码');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-700 to-accent-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 light-effect" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <Layers className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">多维伴侣</h1>
          <p className="text-white/70 mt-2">登录您的账户</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">{error}</div>)}
            <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="请输入邮箱" icon={<Mail className="w-4 h-4" />} />
            <Input label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" icon={<Lock className="w-4 h-4" />} />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center"><input type="checkbox" className="mr-2" /> <span className="text-gray-600">记住我</span></label>
              <a href="#" className="text-accent hover:underline">忘记密码？</a>
            </div>
            <Button type="submit" variant="primary" loading={loading} className="w-full">
              登录 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">还没有账户？</span>
            <Link to="/register" className="text-accent hover:underline font-medium ml-1">立即注册</Link>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">演示模式：输入任意邮箱和密码即可登录</p>
      </div>
    </div>
  );
};
