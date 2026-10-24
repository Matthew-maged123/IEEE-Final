import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Shirt,
  Crown,
  Coffee,
  Tag,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Check,
  AlertTriangle,
  RotateCcw
} from './ui/icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { generateWhatsAppLink, YUZERSEF_WHATSAPP } from '../lib/utils';
import { PRODUCTS_LIST } from '../lib/products-data';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user' | 'system';
  text: string;
  timestamp: string;
  action?: {
    type: 'navigate' | 'confirm_action' | 'handoff';
    label: string;
    payload?: string;
  };
  citation?: string;
}

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [pendingConfirmation, setPendingConfirmation] = useState<{
    action: string;
    callback: () => void;
  } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [isOnGreen, setIsOnGreen] = useState<boolean>(false);

  // Initialize session-only chat on mount
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'أهلاً بك في يوزرسيف! أنا مساعدك الذكي للمواصفات والطلبات. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      citation: 'قاعدة المعرفة المعتمدة • خدمات يوزرسيف',
    };
    setMessages([welcomeMsg]);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Adaptive background detection: changes button background based on what is behind it
  useEffect(() => {
    const isGreenOrDarkColor = (colorStr: string): boolean => {
      if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') return false;

      // Brand greens: #012C2B, #073B35, #0B5F55, #065E5A, #052925
      if (/(073[bB]35|012[cC]2[bB]|0[bB]5[fF]55|065[eE]5[aA]|052925|001716)/i.test(colorStr)) return true;

      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
        if (a < 0.2) return false;

        const isGreenish = g > r && g > 25 && r < 80;
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        return isGreenish || (luminance < 90 && g >= r);
      }
      return false;
    };

    const isGreenClassOrTag = (el: Element): boolean => {
      if (el.tagName.toLowerCase() === 'footer') return true;
      if (el.getAttribute('data-bg') === 'dark-green') return true;
      const classStr = el.getAttribute('class') || '';
      return (
        /(bg|from|via|to)-\[#(073[bB]35|012[cC]2[bB]|0[bB]5[fF]55|065[eE]5[aA]|052925|001716)\]/i.test(classStr) ||
        classStr.includes('bg-emerald-9') ||
        classStr.includes('bg-emerald-8') ||
        classStr.includes('bg-teal-9')
      );
    };

    const isGreenGradient = (style: CSSStyleDeclaration): boolean => {
      const bgImg = style.backgroundImage;
      if (!bgImg || bgImg === 'none') return false;
      return (
        /(073[bB]35|012[cC]2[bB]|0[bB]5[fF]55|065[eE]5[aA]|052925|001716)/i.test(bgImg) ||
        /rgba?\(\s*(?:7,\s*59,\s*53|1,\s*44,\s*43|11,\s*95,\s*85|6,\s*94,\s*90|5,\s*41,\s*37|0,\s*23,\s*22)/i.test(bgImg)
      );
    };

    const detectBackground = () => {
      const btn = triggerButtonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // 1. Direct geometric overlap check with designated dark green sections (Hero, Footer, etc.)
      const darkSections = document.querySelectorAll<HTMLElement>('[data-bg="dark-green"], footer');
      for (const section of darkSections) {
        const sRect = section.getBoundingClientRect();
        if (
          rect.bottom > sRect.top &&
          rect.top < sRect.bottom &&
          rect.right > sRect.left &&
          rect.left < sRect.right
        ) {
          setIsOnGreen(true);
          return;
        }
      }

      // 2. Sample elements under the button's center point
      if (x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight) {
        const elements = document.elementsFromPoint(x, y);
        for (const el of elements) {
          if (el === btn || btn.contains(el)) continue;

          let curr: Element | null = el;
          while (curr && curr !== document.documentElement) {
            const style = window.getComputedStyle(curr);

            if (isGreenClassOrTag(curr) || isGreenGradient(style)) {
              setIsOnGreen(true);
              return;
            }

            const bg = style.backgroundColor;
            if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
              if (isGreenOrDarkColor(bg)) {
                setIsOnGreen(true);
                return;
              }
              // Found a solid non-green background (e.g. cream/white)
              setIsOnGreen(false);
              return;
            }
            curr = curr.parentElement;
          }
        }
      }

      setIsOnGreen(false);
    };

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detectBackground);
    };

    detectBackground();
    const timer1 = setTimeout(detectBackground, 50);
    const timer2 = setTimeout(detectBackground, 250);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [location.pathname, isOpen]);

  // Context Layer A: Detect current page context
  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') return 'الصفحة الرئيسية';
    if (path.startsWith('/services')) return 'صفحة استعراض ومواصفات الخدمات';
    if (path === '/portfolio') return 'معرض الأعمال السابقة';
    if (path === '/request') return 'معالج تقديم طلب جديد';
    if (path === '/track') return 'شاشة تتبع الطلبات';
    if (path === '/contact') return 'صفحة التواصل والمساعدة';
    return 'موقع يوزرسيف';
  };

  // Context Layer B & C: Knowledge retrieval & conversation response generator
  const generateAssistantResponse = (userText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = '';
      let citation = 'قاعدة المعرفة المعتمدة • سياسات يوزرسيف';
      let action: ChatMessage['action'] = undefined;

      // Intent 1: Clothing / T-shirts / Hoodies
      if (lower.includes('تيشرت') || lower.includes('هودي') || lower.includes('ملابس')) {
        replyText =
          'نوفر طباعة وتطريز على التيشرتات والهوديز والسويت شيرت بـ 5 ألوان أساسية (أبيض، أسود، رمادي، أخضر يوزرسيف، بيج كريمي). معالج الطلب يتأكد من توزيع المقاسات وموضع الطباعة (الصدر أو الظهر).';
        citation = 'دليل خدمات الملابس • products-data.ts';
        action = {
          type: 'navigate',
          label: 'الانتقال إلى معالج طلب الملابس',
          payload: '/request?service=clothing-hoodies',
        };
      }
      // Intent 2: Caps / Embroidery
      else if (lower.includes('كاب') || lower.includes('تطريز')) {
        replyText =
          'الكابات متوفرة بمقاس موحد قابل للتعديل (Adjustable Strap)، وندعم التطريز الدقيق أو الفينيل الحراري البارز على الواجهة أو الجانب.';
        citation = 'دليل الكابات والتطريز';
        action = {
          type: 'navigate',
          label: 'بدء طلب كابات',
          payload: '/request?service=caps-embroidery',
        };
      }
      // Intent 3: Mugs / Gifts
      else if (lower.includes('مج') || lower.includes('كوب') || lower.includes('هدية')) {
        replyText =
          'نوفر مجات سيراميك بيضاء مع ميزة المعاينة ثلاثية الأبعاد 360°، بالإضافة إلى المجات الملونة والثيرموسات الحرارية.';
        citation = 'دليل الهدايا والمجات • استوديو المعاينة';
        action = {
          type: 'navigate',
          label: 'معاينة المج في الاستوديو',
          payload: '/services/mugs-promotional-gifts',
        };
      }
      // Intent 4: Stickers
      else if (lower.includes('استيكر') || lower.includes('ملصق')) {
        replyText =
          'الاستيكرات متوفرة بقص داي-كت (Die-cut) أو شيتات، على فينيل مقاوم للماء والخدوش بلمعان لامع أو مطفي.';
        citation = 'دليل الاستيكرات واللواصق';
        action = {
          type: 'navigate',
          label: 'طلب استيكرات',
          payload: '/request?service=stickers-labels',
        };
      }
      // Intent 5: Pricing / Quotes (Strict adherence: do not invent unconfirmed prices)
      else if (lower.includes('سعر') || lower.includes('تكلفة') || lower.includes('بكام')) {
        replyText =
          'الأسعار الرسمية النهائية تخضع لاعتماد المعمل بحسب الكمية والمقاسات وطريقة الطباعة. يمكنك إرسال مواصفاتك للحصول على عرض سعر معتمد (طلب عرض سعر).';
        citation = 'سياسة عروض الأسعار والتسعير (Quote Policy)';
        action = {
          type: 'navigate',
          label: 'طلب عرض سعر فوري',
          payload: '/request',
        };
      }
      // Intent 6: Track order
      else if (lower.includes('تتبع') || lower.includes('طلبي') || lower.includes('yz-')) {
        replyText =
          'يمكنك تتبع أي طلب باستخدام الكود الصادر لك (مثل YZ-0001) لمعرفة قرار المعمل والمرحلة الحالية.';
        citation = 'نظام التتبع المباشر للطلبات';
        action = {
          type: 'navigate',
          label: 'الانتقال لشاشة التتبع',
          payload: '/track',
        };
      }
      // Intent 7: Human Handoff / Contact / WhatsApp
      else if (lower.includes('واتساب') || lower.includes('تواصل') || lower.includes('مسؤول') || lower.includes('انسان')) {
        replyText =
          'سأقوم بتحويلك مباشرة للتواصل مع ممثل خدمة العملاء عبر الواتساب المعتمد لمتابعة حالتك يدوياً.';
        citation = 'قنوات التواصل المعتمدة • واتساب 01116891025';
        action = {
          type: 'handoff',
          label: `مراسلة المعمل على واتساب (${YUZERSEF_WHATSAPP})`,
          payload: generateWhatsAppLink(undefined, 'مرحباً، أود التحدث مع المسؤول بخصوص استفسار لدي.'),
        };
      }
      // Fallback: Honest lack of knowledge -> Offer human handoff
      else {
        replyText =
          'أنا مبرمج للإجابة عن خدمات ومواصفات وسياسات يوزرسيف فقط. لم أجد معلومة مؤكدة في قاعدة بياناتي بخصوص هذا السؤال. هل تود أن أقوم بتحويلك إلى المسؤول البشري عبر واتساب؟';
        citation = 'فحص الدقة وعدم التأكيد (Human Handoff Fallback)';
        action = {
          type: 'handoff',
          label: 'تحدث مع المسؤول البشري عبر واتساب',
          payload: generateWhatsAppLink(undefined, `استفسار عميل من المساعد الذكي: ${userText}`),
        };
      }

      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        citation,
        action,
      };

      setMessages((prev) => [...prev, newMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputMessage.trim();
    setInputMessage('');
    generateAssistantResponse(query);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['action']>) => {
    if (action.type === 'navigate' && action.payload) {
      navigate(action.payload);
      setIsOpen(false);
    } else if (action.type === 'handoff' && action.payload) {
      window.open(action.payload, '_blank', 'noopener,noreferrer');
    }
  };

  const clearChatSession = () => {
    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'assistant',
      text: 'تم بدء جلسة جديدة. كيف يمكنني مساعدتك بخصوص منتجات أو خدمات يوزرسيف؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      citation: 'جلسة محادثة جديدة (Session Reset)',
    };
    setMessages([welcomeMsg]);
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom-Start) */}
      <div className="fixed bottom-6 start-6 z-50">
        {!isOpen && (
          <button
            ref={triggerButtonRef}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#073B35] transition-all cursor-pointer group"
            aria-label="فتح المساعد الذكي"
          >
            <div className="relative translate-y-[1px]">
              <Bot className="w-6 h-6 text-[#073B35] transition-transform duration-300 group-hover:rotate-12" />
              <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-[#073B35] animate-ping" />
              <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-[#073B35]" />
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-4 start-4 sm:bottom-6 sm:start-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-[#073B35] text-white p-4 flex items-center justify-between border-b border-[#0B5F55]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0B5F55] border border-[#E3A92F]/40 flex items-center justify-center text-[#E3A92F]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm">مساعد يوزرسيف</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-emerald-200/70">
                  سياق الصفحة: {getPageContext()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChatSession}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                title="بدء جلسة محادثة جديدة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="bg-[#F6F1E7] px-3 py-2 border-b border-[#d9d2c3]/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <button
              onClick={() => generateAssistantResponse('تيشرتات وهوديز')}
              className="px-3 py-1 rounded-xl bg-white border-2 border-[#073B35] shadow-[2px_2px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] text-[#073B35] hover:bg-[#E3A92F]/20 shrink-0 font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Shirt className="w-3.5 h-3.5 text-[#073B35]" /><span>ملابس وهوديز</span>
            </button>
            <button
              onClick={() => generateAssistantResponse('كابات')}
              className="px-3 py-1 rounded-xl bg-white border-2 border-[#073B35] shadow-[2px_2px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] text-[#073B35] hover:bg-[#E3A92F]/20 shrink-0 font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5 text-[#073B35]" /><span>كابات</span>
            </button>
            <button
              onClick={() => generateAssistantResponse('مجات')}
              className="px-3 py-1 rounded-xl bg-white border-2 border-[#073B35] shadow-[2px_2px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] text-[#073B35] hover:bg-[#E3A92F]/20 shrink-0 font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Coffee className="w-3.5 h-3.5 text-[#073B35]" /><span>مجات 360°</span>
            </button>
            <button
              onClick={() => generateAssistantResponse('استيكرات')}
              className="px-3 py-1 rounded-xl bg-white border-2 border-[#073B35] shadow-[2px_2px_0px_#073B35] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#073B35] text-[#073B35] hover:bg-[#E3A92F]/20 shrink-0 font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Tag className="w-3.5 h-3.5 text-[#073B35]" /><span>استيكرات</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F6]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0B5F55] text-white rounded-be-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-bs-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Action Link button */}
                  {m.action && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <Button
                        size="sm"
                        onClick={() => handleActionClick(m.action!)}
                        className="w-full text-xs font-black gap-1.5"
                      >
                        {m.action.type === 'handoff' ? (
                          <PhoneCall className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        )}
                        <span>{m.action.label}</span>
                      </Button>
                    </div>
                  )}

                  {/* RAG Citation Note */}
                  {m.citation && (
                    <div className="mt-1.5 text-[9px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#0B5F55]" />
                      <span>{m.citation}</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2">
                <span className="w-2 h-2 rounded-full bg-[#0B5F55] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#0B5F55] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#0B5F55] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-slate-400 ms-1">جاري البحث في قاعدة المعرفة...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className="flex-1 text-xs h-10 border-slate-300 focus-visible:ring-[#0B5F55]"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!inputMessage.trim()}
              className="h-10 px-4 shrink-0"
              aria-label="إرسال"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </form>

          {/* Privacy & Session Footer Notice */}
          <div className="bg-[#F6F1E7] px-3 py-1.5 text-center text-[9px] text-[#4d6560] border-t border-[#d9d2c3]/60">
            * الجلسة مؤقتة وتنتهي بمغادرة الموقع. للمواضيع الحساسة يتم التحويل للمسؤول البشري.
          </div>
        </div>
      )}
    </>
  );
};
