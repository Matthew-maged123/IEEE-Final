import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeSlash,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Shirt,
  Google,
  Apple,
  X,
  WhatsApp,
  ExternalLink
} from '../components/ui/icons';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input, Label } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { BrandLogo } from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';
import { YUZERSEF_WHATSAPP, generateWhatsAppLink } from '../lib/utils';
import { DEMO_ADMIN_CREDENTIALS } from '../lib/mock-data';

export const Auth: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, user } = useAuth();

  // Mode: 'signin' or 'signup'
  const modeParam = searchParams.get('mode');
  const [mode, setMode] = useState<'signin' | 'signup'>(
    modeParam === 'signup' ? 'signup' : 'signin'
  );
  const redirectTarget = searchParams.get('redirect') || '/';

  // Form states - Sign In
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Form states - Sign Up
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Sync mode with URL search params
  useEffect(() => {
    if (modeParam === 'signup' && mode !== 'signup') {
      setMode('signup');
    } else if (modeParam === 'signin' && mode !== 'signin') {
      setMode('signin');
    }
  }, [modeParam, mode]);

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    const newParams = new URLSearchParams(searchParams);
    newParams.set('mode', newMode);
    setSearchParams(newParams, { replace: true });
  };

  // If already authenticated and not loading, redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin' && redirectTarget === '/') {
        navigate('/admin');
      } else {
        navigate(redirectTarget);
      }
    }
  }, [isAuthenticated, user, navigate, redirectTarget]);

  // Egyptian phone validator
  const isValidEgyptianPhone = (phone: string) => {
    return /^01[0125][0-9]{8}$/.test(phone.trim());
  };

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'ضعيفة', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'متوسطة', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'جيدة', color: 'bg-emerald-500' };
    return { score: 4, label: 'قوية جداً', color: 'bg-teal-600' };
  };

  const passwordStrength = getPasswordStrength(signUpPassword);

  // Handle Demo Fill
  const handleFillDemoCustomer = () => {
    setSignInIdentifier('ahmed@yuzersef.com');
    setSignInPassword('demo123');
    setErrorMessage('');
  };

  const handleFillDemoAdmin = () => {
    setSignInIdentifier('admin');
    setSignInPassword(DEMO_ADMIN_CREDENTIALS.password);
    setErrorMessage('');
  };

  // Handle Sign In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signInIdentifier.trim()) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني أو رقم الهاتف');
      return;
    }
    if (!signInPassword.trim()) {
      setErrorMessage('يرجى كتابة كلمة المرور');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(signInIdentifier, signInPassword);
      setSuccessMessage(`أهلاً بك مجدداً، ${loggedUser.name}! جاري الدخول...`);
      setTimeout(() => {
        if (loggedUser.role === 'admin' && redirectTarget === '/') {
          navigate('/admin');
        } else {
          navigate(redirectTarget);
        }
      }, 700);
    } catch (err: any) {
      setErrorMessage(err?.message || 'بيانات الدخول غير صحيحة، يرجى التحقق والمحاولة ثانية.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signUpName.trim() || signUpName.trim().length < 2) {
      setErrorMessage('يرجى إدخال اسمك الكريم (حرفين على الأقل)');
      return;
    }
    if (!signUpEmail.trim() || !/\S+@\S+\.\S+/.test(signUpEmail.trim())) {
      setErrorMessage('يرجى كتابة بريد إلكتروني صحيح');
      return;
    }
    if (!signUpPhone.trim()) {
      setErrorMessage('يرجى كتابة رقم هاتفك المحمول');
      return;
    }
    if (!isValidEgyptianPhone(signUpPhone)) {
      setErrorMessage('يرجى إدخال رقم هاتف محمول مصري صحيح (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)');
      return;
    }
    if (signUpPassword.length < 6) {
      setErrorMessage('كلمة المرور يجب ألا تقل عن 6 أحرف أو أرقام');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('يرجى الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة');
      return;
    }

    setLoading(true);
    try {
      const newUser = await register({
        name: signUpName,
        email: signUpEmail,
        phone: signUpPhone,
        password: signUpPassword,
      });

      setSuccessMessage(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${newUser.name} في عائلة يوزرسيف.`);
      setTimeout(() => {
        navigate(redirectTarget);
      }, 900);
    } catch (err: any) {
      setErrorMessage(err?.message || 'حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  // Social login placeholder
  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    setErrorMessage('');
    setTimeout(() => {
      setSocialLoading(null);
      setErrorMessage(`تسجيل الدخول عبر ${provider} متاح حالياً بالتواصل المباشر. يرجى استخدام البريد الإلكتروني أو الحساب التجريبي.`);
    }, 600);
  };

  return (
    <div className="py-8 sm:py-14 min-h-[85vh] flex items-center justify-center bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Top Header & Breadcrumb */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#065E5A] mb-1 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة إلى الرئيسية</span>
          </Link>

          <div className="flex justify-center">
            <BrandLogo variant="green-on-paper" className="h-14 sm:h-16 w-auto" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#012C2B] tracking-tight">
            {mode === 'signin' ? 'تسجيل الدخول إلى حسابك' : 'إنشاء حساب جديد في يوزرسيف'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            بوابتك لمتابعة وتصميم وتطريز أروع الملابس والهدايا التذكارية في أسوان
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (Desktop col-span-7) */}
          <div className="lg:col-span-7">
            <Card className="border-2 border-[#073B35] shadow-[6px_6px_0px_#073B35] bg-white rounded-3xl overflow-hidden">
              {/* Segmented Mode Switcher Tabs */}
              <div className="p-2 sm:p-3 bg-[#FAF8F5] border-b-2 border-[#073B35] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    mode === 'signin'
                      ? 'bg-[#073B35] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>تسجيل الدخول</span>
                </button>

                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-[#073B35] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>إنشاء حساب جديد</span>
                </button>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Alert: Error Message */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-rose-600 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Alert: Success Message */}
                {successMessage && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-600 mt-0.5" />
                    <span className="font-bold leading-relaxed">{successMessage}</span>
                  </div>
                )}

                {/* ============================================================== */}
                {/* 1. SIGN IN FORM */}
                {/* ============================================================== */}
                {mode === 'signin' && (
                  <form onSubmit={handleSignIn} className="space-y-5">
                    {/* Demo Accounts Quick-Fill Pill */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-amber-200 space-y-2.5 shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#073B35] flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-[#E3A92F]" />
                          <span>تعبئة سريعة للحسابات التجريبية:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleFillDemoCustomer}
                            className="text-[11px] font-black bg-white hover:bg-amber-50 text-[#073B35] border border-[#073B35] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            عميل (أحمد)
                          </button>
                          <button
                            type="button"
                            onClick={handleFillDemoAdmin}
                            className="text-[11px] font-black bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] border border-[#073B35] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            مشرف (Admin)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Email / Phone Field */}
                    <div className="space-y-1.5">
                      <Label required>البريد الإلكتروني أو رقم الهاتف</Label>
                      <div className="relative">
                        <Input
                          dir="ltr"
                          type="text"
                          value={signInIdentifier}
                          onChange={(e) => setSignInIdentifier(e.target.value)}
                          placeholder="example@mail.com أو 01012345678"
                          className="ps-10 text-left font-medium"
                          required
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label required>كلمة المرور</Label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPasswordModal(true)}
                          className="text-xs font-bold text-[#0B5F55] hover:underline cursor-pointer"
                        >
                          نسيت كلمة المرور؟
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          dir="ltr"
                          type={showSignInPassword ? 'text' : 'password'}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••"
                          className="ps-10 pe-10 font-mono"
                          required
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => setShowSignInPassword(!showSignInPassword)}
                          className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                          title={showSignInPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                        >
                          {showSignInPassword ? (
                            <EyeSlash className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 font-semibold">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-[#073B35] focus:ring-[#073B35] accent-[#073B35] cursor-pointer"
                        />
                        <span>تذكر بياناتي في هذا المتصفح</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      isLoading={loading}
                      className="w-full text-base font-black py-3.5 shadow-[4px_4px_0px_#073B35] cursor-pointer"
                    >
                      <span>تسجيل الدخول</span>
                    </Button>

                    {/* Switch to Signup */}
                    <div className="text-center pt-2 text-xs text-slate-600">
                      <span>ليس لديك حساب بعد؟ </span>
                      <button
                        type="button"
                        onClick={() => switchMode('signup')}
                        className="font-black text-[#0B5F55] hover:underline cursor-pointer"
                      >
                        إنشاء حساب مجاني جديد
                      </button>
                    </div>
                  </form>
                )}

                {/* ============================================================== */}
                {/* 2. SIGN UP FORM */}
                {/* ============================================================== */}
                {mode === 'signup' && (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label required>الاسم الكامل</Label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="مثال: أحمد عبد الله"
                          className="ps-10 font-medium"
                          required
                        />
                        <User className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <Label required>البريد الإلكتروني</Label>
                        <div className="relative">
                          <Input
                            dir="ltr"
                            type="email"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            placeholder="name@domain.com"
                            className="ps-10 font-medium text-left"
                            required
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <Label required>رقم المحمول (مصر)</Label>
                        <div className="relative">
                          <Input
                            dir="ltr"
                            type="tel"
                            value={signUpPhone}
                            onChange={(e) => setSignUpPhone(e.target.value)}
                            placeholder="01012345678"
                            className="ps-10 font-medium text-left"
                            required
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium -mt-2">
                      * يرجى كتابة رقم هاتف مصري (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015) للتواصل لتأكيد الطلبات وتتبع الشحن.
                    </p>

                    {/* Password & Confirm Password Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Password */}
                      <div className="space-y-1.5">
                        <Label required>كلمة المرور</Label>
                        <div className="relative">
                          <Input
                            dir="ltr"
                            type={showSignUpPassword ? 'text' : 'password'}
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            placeholder="••••••••"
                            className="ps-10 pe-10 font-mono"
                            required
                          />
                          <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                          >
                            {showSignUpPassword ? (
                              <EyeSlash className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1.5">
                        <Label required>تأكيد كلمة المرور</Label>
                        <div className="relative">
                          <Input
                            dir="ltr"
                            type={showSignUpConfirmPassword ? 'text' : 'password'}
                            value={signUpConfirmPassword}
                            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="ps-10 pe-10 font-mono"
                            required
                          />
                          <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <button
                            type="button"
                            onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                            className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                          >
                            {showSignUpConfirmPassword ? (
                              <EyeSlash className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Password Strength Indicator */}
                    {signUpPassword && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-600">قوة كلمة المرور:</span>
                          <span className="text-slate-800">{passwordStrength.label}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={`h-full flex-1 transition-all duration-300 rounded-full ${
                                step <= passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Terms Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-700 leading-relaxed font-semibold">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-[#073B35] focus:ring-[#073B35] accent-[#073B35] cursor-pointer shrink-0"
                          required
                        />
                        <span>
                          أوافق على{' '}
                          <Link to="/policies" target="_blank" className="text-[#0B5F55] font-black underline">
                            الشروط والأحكام
                          </Link>{' '}
                          و{' '}
                          <Link to="/policies" target="_blank" className="text-[#0B5F55] font-black underline">
                            سياسة الخصوصية
                          </Link>{' '}
                          الخاصة ببراند يوزرسيف.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      isLoading={loading}
                      className="w-full text-base font-black py-3.5 shadow-[4px_4px_0px_#073B35] cursor-pointer mt-2"
                    >
                      <span>إنشاء حسابي في يوزرسيف</span>
                    </Button>

                    {/* Switch to Sign In */}
                    <div className="text-center pt-2 text-xs text-slate-600">
                      <span>لديك حساب بالفعل؟ </span>
                      <button
                        type="button"
                        onClick={() => switchMode('signin')}
                        className="font-black text-[#0B5F55] hover:underline cursor-pointer"
                      >
                        تسجيل الدخول هنا
                      </button>
                    </div>
                  </form>
                )}

                {/* Social Login Options */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-slate-500 font-bold">
                      أو المتابعة السريعة عبر
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    disabled={socialLoading !== null}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-slate-200 hover:border-[#073B35] text-xs font-bold text-slate-700 hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Google className="w-4 h-4 text-red-500" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    disabled={socialLoading !== null}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-slate-200 hover:border-[#073B35] text-xs font-bold text-slate-700 hover:bg-[#FAF8F5] transition-all cursor-pointer shadow-2xs active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Apple className="w-4 h-4 text-slate-900" />
                    <span>Apple ID</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Brand & Perks Panel (Desktop col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Emerald Promo Card */}
            <div className="bg-gradient-to-br from-[#012C2B] to-[#073B35] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#073B35] shadow-[6px_6px_0px_#073B35] space-y-6 relative overflow-hidden">
              {/* Background ambient craft decorative pattern */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#E3A92F]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <Badge className="bg-[#E3A92F] text-[#073B35] font-black border-none text-xs">
                  مزايا عضوية يوزرسيف 🌟
                </Badge>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  كل ما تحتاجه لتصميم وتنفيذ طلبيتك في مكان واحد
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                  انضم إلى أكثر من 1,500 عميل وشخص ومؤسسة يثقون في جودة التطريز والطباعة الرقمية من يوزرسيف أسوان.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#E3A92F]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">تتبع الطلبات لحظة بلحظة</h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      شاهد مراحل تنفيذ طلبيتك: التصميم، البروفة، المكائن، وحتى التوصيل لباب بيتك.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#E3A92F]">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">حفظ المقاسات والتصاميم</h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      سجل تفاصيل مقاساتك وملفات اللوجو والرسومات لإعادة الطلب في ثوانٍ.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#E3A92F]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">ضمان الجودة وخصومات الأعضاء</h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      عروض موسمية وخصومات حصرية لطلبات التخرج والجامعات والشركات في الصعيد.
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Testimonial Quote */}
              <div className="p-4 rounded-2xl bg-black/20 border border-white/10 text-xs text-emerald-50 space-y-1.5">
                <div className="flex items-center gap-1 text-[#E3A92F]">
                  {'★'.repeat(5)}
                </div>
                <p className="italic leading-relaxed">
                  "التطريز كان نظيف ومتقن جداً، والتيشرتات الهودي خاماتها محترمة وشحن سريع لأسوان."
                </p>
                <div className="text-[11px] font-bold text-white/80">
                  — عبد الرحمن الشريف، أسوان
                </div>
              </div>
            </div>

            {/* Need Direct Help Pill */}
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-0.5">
                <div className="text-xs font-black text-slate-900">هل تحتاج لمساعدة فورية؟</div>
                <div className="text-[11px] text-slate-500 font-medium">فريق خدمة العملاء متاح على واتساب 24/7</div>
              </div>
              <a
                href={generateWhatsAppLink('مرحباً يوزرسيف، أحتاج استفسار بخصوص تسجيل الدخول')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black px-3.5 py-2 rounded-xl border border-emerald-700 shadow-xs transition-colors shrink-0"
              >
                <WhatsApp className="w-4 h-4" />
                <span>محادثة واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl border-2 border-[#073B35] shadow-[6px_6px_0px_#073B35] max-w-md w-full p-6 sm:p-7 space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(false)}
              className="absolute end-4 top-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#073B35] flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-[#E3A92F]" />
              </div>
              <h3 className="text-lg font-black text-[#012C2B]">استعادة كلمة المرور</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                أدخل بريدك الإلكتروني أو رقم هاتفك المسجل وسنرسل لك تعليمات استعادة الدخول، أو تواصل فورياً مع دعم يوزرسيف عبر واتساب.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label>البريد أو الهاتف المسجل</Label>
                <Input
                  dir="ltr"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="name@domain.com أو 01012345678"
                  className="font-medium text-left"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="gold"
                  onClick={() => {
                    alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك/هاتفك بنجاح.');
                    setShowForgotPasswordModal(false);
                  }}
                  className="w-full text-xs font-black cursor-pointer"
                >
                  إرسال رابط الاستعادة
                </Button>

                <a
                  href={generateWhatsAppLink(
                    `مرحباً يوزرسيف، نسيت كلمة المرور لحسابي: ${forgotInput || 'يرجى المساعدة'}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-black transition-colors"
                >
                  <WhatsApp className="w-4 h-4 text-[#25D366]" />
                  <span>استعادة فورية عبر واتساب ({YUZERSEF_WHATSAPP})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
