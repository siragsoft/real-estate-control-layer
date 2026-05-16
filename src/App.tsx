import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  ShieldCheck, 
  LayoutDashboard, 
  LogOut, 
  LogIn,
  Globe,
  Menu,
  X,
  CreditCard,
  PieChart,
  Settings,
  Bell,
  Fingerprint,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import PropertyDashboard from './components/PropertyDashboard';
import PropertyRegistration from './components/PropertyRegistration';
import GovernancePanel from './components/GovernancePanel';
import IntelligencePanel from './components/IntelligencePanel';
import MarketPulse from './components/MarketPulse';
import ComplianceBadges from './components/ComplianceBadges';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'register' | 'governance' | 'intelligence' | 'pulse'>('home');
  const [isArabic, setIsArabic] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNafathLoading, setIsNafathLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const loginWithNafath = async () => {
    setIsNafathLoading(true);
    // Simulate Nafath redirection and authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(isArabic ? 'تم التحقق عبر النفاذ الوطني الوطني (أبشر)' : 'Verified via National Single Sign-On (Nafath)');
    
    // In a real app, this would redirect to IAM or Absher portal
    // For this demo, we'll just log in with google to simulate a session
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setIsNafathLoading(false);
  };

  const logout = () => signOut(auth);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0F172A]">
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="bg-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <span className="text-white font-black tracking-widest uppercase text-xs">Real Estate Control Layer</span>
        </motion.div>
      </div>
    );
  }

  const t = {
    en: {
      title: "Real Estate Control Layer",
      subtitle: "The Operating System for Real Estate Markets",
      home: "Home",
      dashboard: "Market View",
      register: "Register Deal",
      pulse: "Smart Pulse",
      governance: "Governance",
      intelligence: "Intelligence",
      login: "Login",
      nafath: "Nafath Login",
      logout: "Logout",
    },
    ar: {
      title: "طبقة التحكم العقاري",
      subtitle: "نظام التشغيل للسوق العقاري",
      home: "الرئيسية",
      dashboard: "سوق العقارات",
      register: "تسجيل فرصة",
      pulse: "النبض الذكي",
      governance: "الحوكمة",
      intelligence: "الذكاء العقاري",
      login: "دخول",
      nafath: "دخول النفاذ الوطني",
      logout: "خروج",
    }
  };

  const currentT = isArabic ? t.ar : t.en;

  const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon?: any }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMenuOpen(false); }}
      className={`relative px-4 py-2 transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group ${
        activeTab === id 
        ? 'text-white' 
        : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {activeTab === id && (
        <motion.div 
          layoutId="nav-bg"
          className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-500/20"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span>{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col ${isArabic ? 'font-arabic' : 'font-sans'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-[#0F172A] text-white shadow-lg h-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl group-hover:rotate-6 transition-transform">
              RE
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black tracking-tight leading-none mb-1">
                {currentT.title}
              </h1>
              <div className="flex items-center gap-2">
                 <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">
                   Protocol v2.4 Sovereign
                 </span>
                 <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">
                    <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
                    <span className="text-[8px] font-black text-blue-400">VAL 1100000000</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50">
            <NavItem id="home" label={currentT.home} />
            <NavItem id="dashboard" label={currentT.dashboard} />
            <NavItem id="pulse" label={currentT.pulse} />
            <NavItem id="intelligence" label={currentT.intelligence} />
            {user && <NavItem id="register" label={currentT.register} />}
            <NavItem id="governance" label={currentT.governance} />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
             <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsArabic(!isArabic)}
              className="text-slate-400 hover:text-white hover:bg-slate-800 h-10 w-10 flex p-0 rounded-xl"
            >
              <Globe className="w-5 h-5" />
            </Button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <p className="text-xs font-black">{user.displayName}</p>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">{isArabic ? 'هوية موثقة (نفاذ)' : 'Verified Identity (Nafath)'}</p>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button type="button" className="w-10 h-10 bg-slate-700 rounded-2xl flex items-center justify-center border-2 border-slate-600 overflow-hidden cursor-pointer hover:border-blue-500 transition-all active:scale-95 shadow-xl outline-none">
                        {user.photoURL ? <img src={user.photoURL} alt="" /> : <span className="font-black">{user.displayName?.charAt(0)}</span>}
                      </button>
                    }
                  />
                  <DropdownMenuContent align={isArabic ? 'start' : 'end'} className="w-56 mt-2 bg-slate-900 border-slate-700 text-white rounded-2xl p-2 shadow-2xl">
                    <DropdownMenuItem className="gap-2 focus:bg-blue-600 focus:text-white rounded-xl py-3 cursor-pointer">
                      <CreditCard className="w-4 h-4" />
                      <span className="font-bold">{isArabic ? 'الاشتراك والمحفظة' : 'Billing & Wallet'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 focus:bg-blue-600 focus:text-white rounded-xl py-3 cursor-pointer">
                      <PieChart className="w-4 h-4" />
                      <span className="font-bold">{isArabic ? 'تقرير الأداء' : 'Performance'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 focus:bg-blue-600 focus:text-white rounded-xl py-3 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span className="font-bold">{isArabic ? 'الإعدادات' : 'Settings'}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800 my-1" />
                    <DropdownMenuItem onClick={logout} className="gap-2 focus:bg-red-600 focus:text-white rounded-xl py-3 cursor-pointer text-red-400">
                      <LogOut className="w-4 h-4" />
                      <span className="font-bold">{currentT.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={loginWithNafath} 
                  disabled={isNafathLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 font-black text-[10px] uppercase tracking-widest hidden sm:flex items-center gap-2 border-b-4 border-emerald-800 active:translate-y-1 active:border-b-0 transition-all"
                >
                  {isNafathLoading ? <LogOut className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
                  {currentT.nafath}
                </Button>
                <Button onClick={login} className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-2xl shadow-xl shadow-blue-500/20 font-black text-[10px] uppercase tracking-widest hidden md:flex">
                  <LogIn className="w-4 h-4 mr-2" />
                  {currentT.login}
                </Button>
              </div>
            )}

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white border border-slate-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-24 bg-[#0F172A] border-b border-slate-700 z-40 p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <NavItem id="home" label={currentT.home} />
              <NavItem id="dashboard" label={currentT.dashboard} />
              <NavItem id="pulse" label={currentT.pulse} />
              <NavItem id="intelligence" label={currentT.intelligence} />
              {user && <NavItem id="register" label={currentT.register} />}
              <NavItem id="governance" label={currentT.governance} />
              {!user && (
                <div className="flex flex-col gap-3 mt-4">
                  <Button onClick={loginWithNafath} className="w-full bg-emerald-600 h-14 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2">
                    <Fingerprint className="w-5 h-5" />
                    {currentT.nafath}
                  </Button>
                  <Button onClick={login} className="w-full bg-blue-600 h-14 rounded-2xl font-black uppercase text-xs tracking-widest">
                    {currentT.login}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-4 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero isArabic={isArabic} onStart={() => setActiveTab('dashboard')} />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyDashboard isArabic={isArabic} />
            </motion.div>
          )}

          {activeTab === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isArabic ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyRegistration isArabic={isArabic} onSuccess={() => setActiveTab('dashboard')} />
            </motion.div>
          )}

          {activeTab === 'intelligence' && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, rotateX: -10 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 10 }}
              transition={{ duration: 0.3 }}
            >
              <IntelligencePanel isArabic={isArabic} />
            </motion.div>
          )}

          {activeTab === 'pulse' && (
            <motion.div
              key="pulse"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <MarketPulse isArabic={isArabic} />
            </motion.div>
          )}

          {activeTab === 'governance' && (
            <motion.div
              key="governance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GovernancePanel isArabic={isArabic} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Compliance Section */}
      <ComplianceBadges isArabic={isArabic} />

      {/* System Footer */}
      <footer className="h-10 bg-[#0F172A] border-t border-slate-700 flex items-center justify-between px-8 text-[9px] text-slate-500 shrink-0 uppercase tracking-widest mt-auto font-black">
        <div className="flex gap-6 overflow-hidden items-center">
          <span className="whitespace-nowrap">{isArabic ? "بروتوكول التحكم v2.4.0-PRO" : "CONTROL PROTOCOL v2.4.0-PRO"}</span>
          <div className="hidden sm:flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
             <Fingerprint className="w-2.5 h-2.5 text-blue-400" />
             <span className="whitespace-nowrap text-blue-400">NAFATH SSO CONNECTED</span>
          </div>
          <span className="hidden lg:inline whitespace-nowrap opacity-50">SSL AES-256 ENCRYPTED LAYER</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-700">●</span>
          <span className="text-blue-500 italic whitespace-nowrap">{isArabic ? "منصة عقارية مرخصة" : "LICENSED REAL ESTATE PLATFORM"}</span>
        </div>
      </footer>

      <Toaster position={isArabic ? 'bottom-left' : 'bottom-right'} />
    </div>
  );
}
