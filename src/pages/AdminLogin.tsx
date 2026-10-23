import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, AlertCircle, KeyRound } from '../components/ui/icons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input, Label } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { BrandLogo } from '../components/BrandLogo';
import { loginAdmin } from '../lib/mock-api';
import { DEMO_ADMIN_CREDENTIALS } from '../lib/mock-data';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFillDemo = () => {
    setUsername(DEMO_ADMIN_CREDENTIALS.username);
    setPassword(DEMO_ADMIN_CREDENTIALS.password);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('يرجى ملء اسم المستخدم وكلمة المرور');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await loginAdmin(username, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 flex items-center justify-center bg-[#EFEFEA] min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-md space-y-6">
        <div className="text-center space-y-3">
          {/* Logo on paper background */}
          <div className="flex justify-center mb-2">
            <BrandLogo variant="green-on-paper" className="h-16 w-auto" />
          </div>

          <Badge variant="demo" className="text-xs bg-[#065E5A]/10 text-[#065E5A] border-[#065E5A]/30">
            لوحة الإدارة التجريبية (Hardcoded Demo Auth)
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-[#012C2B]">تسجيل دخول المشرف</h1>
          <p className="text-xs text-slate-600">
            قم بتسجيل الدخول لمتابعة الطلبات، قبولها، رفضها، أو تعديل حالاتها الحية.
          </p>
        </div>

        {/* Demo Credentials Box with Quick Fill */}
        <div className="p-4 rounded-xl bg-white border border-[#065E5A]/20 text-slate-800 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#065E5A]">
              <KeyRound className="w-4 h-4 text-[#065E5A]" />
              <span>بيانات الدخول التجريبية الجاهزة:</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-[#065E5A] bg-[#065E5A]/10 px-2.5 py-1 rounded-md border border-[#065E5A]/30 hover:bg-[#065E5A]/20 transition-colors cursor-pointer"
            >
              تعبئة تلقائية بنقرة واحدة
            </button>
          </div>
          <div className="font-mono text-xs text-slate-700 space-y-1 bg-[#EFEFEA] p-2.5 rounded-lg border border-slate-200">
            <div>المستخدم: <strong className="text-[#065E5A] font-bold">admin</strong></div>
            <div>كلمة المرور: <strong className="text-[#065E5A] font-bold">demo123</strong></div>
          </div>
        </div>

        {/* Login Form Card */}
        <Card className="border-slate-200 shadow-xl bg-white">
          <CardContent className="p-6 sm:p-8 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label required>اسم المستخدم</Label>
                <div className="relative">
                  <Input
                    dir="ltr"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="font-mono text-start focus-visible:ring-[#065E5A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label required>كلمة المرور</Label>
                <div className="relative">
                  <Input
                    type="password"
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="font-mono text-start focus-visible:ring-[#065E5A]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                className="w-full gap-2 bg-[#065E5A] hover:bg-[#012C2B] text-white shadow-md shadow-[#065E5A]/25"
              >
                <Lock className="w-4 h-4" />
                <span>دخول لوحة التحكم</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-xs text-slate-600 hover:text-[#065E5A] transition-colors font-medium">
            ← العودة للصفحة الرئيسية للموقع
          </Link>
        </div>
      </div>
    </div>
  );
};
