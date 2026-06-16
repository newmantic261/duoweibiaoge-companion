import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Layers, ArrowRight } from 'lucide-react';
import { Button, Input } from '../components/common';
import { useAppStore } from '../store/useAppStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('请填写所有字段'); return; }
    if (password !== confirmPassword) { setError('两次密码输入不一致'); return; }
    if (password.length < 6) { setError('密码长度至少为6位'); return; }
    setLoading(true);
    const success = await register(name, email, password);
    setLoading(false);
    if (success) navigate('/');
    else setError('注册失败，请重试');
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
          <p className="text-white/70 mt-2">创建您的账户</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">{error}</div>)}
            <Input label="姓名" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="请输入您的姓名" icon={<User className="w-4 h-4" />} />
            <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="请输入邮箱" icon={<Mail className="w-4 h-4" />} />
            <Input label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码（至少6位）" icon={<Lock className="w-4 h-4" />} />
            <Input label="确认密码" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="请再次输入密码" icon={<Lock className="w-4 h-4" />} />
            <div className="text-sm">
              <label className="flex items-start">
                <input type="checkbox" className="mt-1 mr-2" required />
                <span className="text-gray-600">我已阅读并同意 <a href="#" className="text-accent hover:underline">服务条款</a> 和 <a href="#" className="text-accent hover:underline">隐私政策</a></span>
              </label>
            </div>
            <Button type="submit" variant="primary" loading={loading} className="w-full">
              注册 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">已有账户？</span>
            <Link to="/login" className="text-accent hover:underline font-medium ml-1">立即登录</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
