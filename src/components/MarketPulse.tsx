import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, Overlay } from 'pigeon-maps';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, MapPin, Activity, PieChart, Search, Sparkles, Loader2, Database, Shield, Brain, ArrowRight, ArrowLeft, Building, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface MarketPulseProps {
  isArabic: boolean;
}

const initialData = [
  { name: 'Jan', price: 4200 },
  { name: 'Feb', price: 4400 },
  { name: 'Mar', price: 4300 },
  { name: 'Apr', price: 4700 },
  { name: 'May', price: 4900 },
  { name: 'Jun', price: 5200 },
];

const initialCityData = [
  { name: 'Riyadh', value: 85, color: '#2563eb' },
  { name: 'Jeddah', value: 65, color: '#3b82f6' },
  { name: 'Dammam', value: 45, color: '#60a5fa' },
  { name: 'Khobar', value: 35, color: '#93c5fd' },
];

export default function MarketPulse({ isArabic }: MarketPulseProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentLog, setAgentLog] = useState<{id: number, text: string, type: 'info' | 'success' | 'warn'}[]>([]);
  const [chartData, setChartData] = useState(initialData);
  const [marketStats, setMarketStats] = useState({ transactions: 12450, growth: 24.8 });
  const [activeView, setActiveView] = useState<'dashboard' | 'details'>('dashboard');
  const [detailTitle, setDetailTitle] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  const content = {
    ar: {
      title: "محرك الذكاء المتعدد",
      subtitle: "نظام وكلاء ذكاء اصطناعي يجمع البيانات من مصادر تشغيلية متعددة في وقت واحد",
      totalTransactions: "إجمالي العمليات الموثقة",
      avgPrice: "متوسط السعر المرجعي / متر",
      marketGrowth: "معدل النمو اللحظي",
      riyadhInsights: "تحليلات العاصمة",
      predictions: "تحليلات استشرافية",
      searchPlaceholder: "ابحث في قواعد بيانات السوق الموحدة...",
      liveBadge: "بث مباشر للبيانات",
      agentActivity: "نشاط الوكلاء الذكي",
      backToDashboard: "العودة للمؤشرات",
      mapView: "الخريطة الجغرافية للسيولة",
      verifiedOffers: "العروض العقارية الموثقة",
      detailsMode: "وضع التفاصيل الاستقصائية"
    },
    en: {
      title: "Multi-Agent Engine",
      subtitle: "AI agents aggregating real-time data from multiple infrastructure sources simultaneously",
      totalTransactions: "Total Verified Deals",
      avgPrice: "Avg Reference Price / SQM",
      marketGrowth: "Instant Market Growth",
      riyadhInsights: "Capital Analytics",
      predictions: "Prospective Analysis",
      searchPlaceholder: "Search unified market databases...",
      liveBadge: "LIVE DATA STREAM",
      agentActivity: "Intelligent Agent Activity",
      backToDashboard: "Back to Dashboard",
      mapView: "Geographic Liquidity Map",
      verifiedOffers: "Verified Real Estate Offers",
      detailsMode: "Investigative Details Mode"
    }
  };

  const c = isArabic ? content.ar : content.en;

  const addLog = (text: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setAgentLog(prev => [...prev.slice(-4), { id: Date.now(), text, type }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentLog]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || isProcessing) return;

    setIsProcessing(true);
    setAgentLog([]);
    
    // Simulate Multi-Agent Workflow
    const steps = isArabic ? [
      { t: "بدء بروتوكول البحث الموزع...", type: 'info' as const },
      { t: "العميل 1: فحص قاعدة بيانات VAL للرخص العقارية", type: 'info' as const },
      { t: "العميل 2: جلب سجلات الإفراغات من وزارة العدل", type: 'success' as const },
      { t: "العميل 3: تحليل اتجاهات السوق في حي " + query, type: 'info' as const },
      { t: "خوارزمية التدقيق: الكشف عن التكرارات والبيانات المضللة", type: 'warn' as const },
      { t: "توليد الخريطة الحرارية للسيولة...", type: 'info' as const },
      { t: "اكتمال التحليل: تم تحديث المؤشرات بنجاح", type: 'success' as const }
    ] : [
      { t: "Initiating Distributed Search Protocol...", type: 'info' as const },
      { t: "Agent 01: Scanning VAL Real Estate License Database", type: 'info' as const },
      { t: "Agent 02: Fetching MOJ Transaction Records", type: 'success' as const },
      { t: "Agent 03: Analyzing market trends in " + query, type: 'info' as const },
      { t: "Audit Algorithm: Detecting duplicates and noise", type: 'warn' as const },
      { t: "Generating Liquidity Heatmap...", type: 'info' as const },
      { t: "Analysis Complete: Indicators updated", type: 'success' as const }
    ];

    for (const step of steps) {
      addLog(step.t, step.type);
      await new Promise(r => setTimeout(r, 800));
    }

    // Dynamic data update simulation
    setChartData(prev => prev.map(d => ({ ...d, price: d.price + Math.floor(Math.random() * 500) - 250 })));
    setMarketStats(prev => ({ 
       transactions: prev.transactions + Math.floor(Math.random() * 100),
       growth: parseFloat((prev.growth + (Math.random() * 2 - 1)).toFixed(1))
    }));
    
    setIsProcessing(false);
    setDetailTitle(query);
    setActiveView('details');
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-2xl">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black mb-4 border border-blue-200"
           >
             <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
             {c.liveBadge}
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{c.title}</h2>
           <p className="text-slate-500 font-bold text-lg leading-relaxed">{c.subtitle}</p>
        </div>
        
        <div className="flex flex-col gap-4 w-full lg:max-w-md">
           <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full h-16 pl-12 pr-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold shadow-xl text-lg"
              />
              <button 
                type="submit"
                disabled={isProcessing}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              </button>
           </form>

           {/* Agent Log Console */}
           <div className="bg-slate-900 rounded-2xl p-4 h-32 overflow-y-auto font-mono text-[10px] border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 text-blue-400 mb-2 border-b border-slate-800 pb-1">
                 <Brain className="w-3 h-3" />
                 <span className="font-black uppercase tracking-widest">{c.agentActivity}</span>
              </div>
              <div className="space-y-1">
                 {agentLog.map(log => (
                   <motion.div 
                     key={log.id} 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }}
                     className={`flex items-start gap-2 ${
                       log.type === 'success' ? 'text-emerald-400' : 
                       log.type === 'warn' ? 'text-amber-400' : 'text-slate-400'
                     }`}
                   >
                     <span className="opacity-40">[{new Date(log.id).toLocaleTimeString([], {hour12: false})}]</span>
                     <span className="font-bold">{log.text}</span>
                   </motion.div>
                 ))}
                 {!agentLog.length && <p className="text-slate-600 italic">{isArabic ? 'بانتظار استعلام المحرك...' : 'Awaiting engine query...'}</p>}
                 <div ref={logEndRef} />
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'dashboard' ? (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[220px]"
          >
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:col-span-8 md:row-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl overflow-hidden relative group"
        >
          {isProcessing && (
             <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                   <div className="relative">
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                      <Database className="w-5 h-5 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   </div>
                   <span className="text-sm font-black text-slate-900 animate-pulse">{isArabic ? 'جاري تجميع البيانات...' : 'Aggregating Data...'}</span>
                </div>
             </div>
          )}

          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{isArabic ? 'مؤشر الثبات السعري الجغرافي' : 'Geographic Price Stability Index'}</h3>
              <p className="text-xs text-blue-600 font-black uppercase tracking-[0.2em] mt-1 italic">Multi-Source Infrastructure Layer</p>
            </div>
            <div className="text-right">
              <motion.span 
                key={chartData[5].price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-black text-blue-600"
              >
                {chartData[5].price.toLocaleString()} SAR
              </motion.span>
              <div className="flex items-center gap-1 text-emerald-500 font-black text-xs mt-1">
                <TrendingUp className="w-4 h-4" />
                +12.5% {isArabic ? 'تصحيح موجه' : 'Guided Correction'}
              </div>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    fontFamily: 'Almarai, sans-serif',
                    padding: '12px 16px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Total Transactions */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex flex-col justify-between h-full">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                <Shield className="w-6 h-6 text-blue-400" />
             </div>
             <div>
                <motion.div 
                  key={marketStats.transactions}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl font-black mb-1"
                >
                  {marketStats.transactions.toLocaleString()}
                </motion.div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{c.totalTransactions}</div>
             </div>
          </div>
        </motion.div>

        {/* Growth Stats */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="md:col-span-4 bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
           <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                 <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                 <motion.div 
                   key={marketStats.growth}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-4xl font-black mb-1"
                 >
                   {marketStats.growth > 0 ? '+' : ''}{marketStats.growth}%
                 </motion.div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-80">{c.marketGrowth}</div>
              </div>
           </div>
        </motion.div>

        {/* City Stats List */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="md:col-span-4 md:row-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl"
        >
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                 <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">{isArabic ? 'توزع السيولة' : 'Liquidity Dist.'}</h3>
           </div>
           
           <div className="space-y-7">
              {initialCityData.map((city, i) => (
                <div 
                  key={city.name} 
                  className="space-y-3 cursor-pointer p-2 -mx-2 hover:bg-slate-50 transition-colors rounded-xl"
                  onClick={() => {
                    setDetailTitle(city.name);
                    setActiveView('details');
                  }}
                >
                   <div className="flex justify-between items-end">
                      <span className="text-sm font-black text-slate-900">{isArabic ? (city.name === 'Riyadh' ? 'الرياض' : city.name === 'Jeddah' ? 'جدة' : city.name === 'Dammam' ? 'الدمام' : 'الخبر') : city.name}</span>
                      <span className="text-xs font-black text-slate-400">{city.value}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${city.value}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="h-full rounded-full" 
                        style={{ backgroundColor: city.color }}
                      />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* District Highlight */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="md:col-span-4 bg-slate-50 rounded-[2.5rem] p-8 relative overflow-hidden group hover:bg-slate-100 transition-colors"
        >
           <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-md font-black text-slate-900">{isArabic ? 'حي الملقا' : 'Al Malga District'}</h3>
           </div>
           <div className="text-3xl font-black text-slate-900">7,200 <span className="text-xs font-bold opacity-40">SAR/m</span></div>
           <p className="text-xs font-bold text-slate-400 mt-2">{isArabic ? 'الحي الأعلى طلباً هذا الأسبوع' : 'Most trending district this week'}</p>
        </motion.div>

        {/* Smart Insights Notification */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="md:col-span-4 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group hover:border-blue-300 transition-colors bg-white/50"
        >
           <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
              <Sparkles className="w-7 h-7" />
           </div>
           <h3 className="text-md font-black text-slate-900 mb-1">{c.predictions}</h3>
           <p className="text-xs font-bold text-slate-400 max-w-[180px]">{isArabic ? 'صعود متوقع بنسبة 4.5٪ في شمال الرياض' : '4.5% uptick projected for North Riyadh'}</p>
        </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8"
          >
             <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                   <button 
                     onClick={() => setActiveView('dashboard')}
                     className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                   >
                     {isArabic ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                   </button>
                   <div>
                     <h3 className="text-2xl font-black text-slate-900">{detailTitle || "نتائج البحث"}</h3>
                     <p className="text-xs text-blue-600 font-black uppercase tracking-[0.2em] mt-1">{c.detailsMode}</p>
                   </div>
                </div>
                <div className="hidden md:flex gap-2">
                   <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {isArabic ? 'موثق عبر العقود الذكية' : 'Smart Contract Verified'}
                   </span>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Map View */}
                <div className="lg:col-span-8 bg-slate-100 rounded-[3rem] h-[600px] relative overflow-hidden ring-1 ring-slate-200/50 shadow-inner group">
                   <Map 
                     height={600} 
                     center={
                       detailTitle.includes('Jeddah') || detailTitle.includes('جدة') ? [21.4858, 39.1925]
                       : detailTitle.includes('Dammam') || detailTitle.includes('الدمام') ? [26.4207, 50.0888]
                       : detailTitle.includes('Khobar') || detailTitle.includes('الخبر') ? [26.2172, 50.1971]
                       : [24.7136, 46.6753]
                     } 
                     defaultZoom={11}
                   >
                     <Overlay 
                       anchor={
                         detailTitle.includes('Jeddah') || detailTitle.includes('جدة') ? [21.5, 39.15]
                         : detailTitle.includes('Dammam') || detailTitle.includes('الدمام') ? [26.4, 50.1]
                         : detailTitle.includes('Khobar') || detailTitle.includes('الخبر') ? [26.2, 50.2]
                         : [24.75, 46.65]
                       } 
                       offset={[30, 60]}
                     >
                       <div className="flex flex-col items-center">
                          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-xl mb-1">4.2M SAR</div>
                          <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg relative cursor-pointer"><div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-50" /></div>
                       </div>
                     </Overlay>
                     <Overlay 
                       anchor={
                         detailTitle.includes('Jeddah') || detailTitle.includes('جدة') ? [21.55, 39.18]
                         : detailTitle.includes('Dammam') || detailTitle.includes('الدمام') ? [26.45, 50.12]
                         : detailTitle.includes('Khobar') || detailTitle.includes('الخبر') ? [26.22, 50.18]
                         : [24.68, 46.72]
                       } 
                       offset={[30, 60]}
                     >
                       <div className="flex flex-col items-center">
                          <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-xl mb-1">2.1M SAR</div>
                          <div className="w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg relative cursor-pointer"><div className="absolute inset-0 bg-emerald-600 rounded-full animate-ping opacity-50" /></div>
                       </div>
                     </Overlay>
                     <Overlay 
                       anchor={
                         detailTitle.includes('Jeddah') || detailTitle.includes('جدة') ? [21.45, 39.22]
                         : detailTitle.includes('Dammam') || detailTitle.includes('الدمام') ? [26.38, 50.05]
                         : detailTitle.includes('Khobar') || detailTitle.includes('الخبر') ? [26.25, 50.22]
                         : [24.79, 46.62]
                       } 
                       offset={[30, 60]}
                     >
                       <div className="flex flex-col items-center">
                          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-xl mb-1">8.5M SAR</div>
                          <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg relative cursor-pointer"><div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-50" /></div>
                       </div>
                     </Overlay>
                   </Map>
                   
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/20 shadow-lg">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                               <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                               <div className="text-sm font-black text-slate-900">{c.mapView}</div>
                               <div className="text-[10px] font-bold text-slate-500">{isArabic ? 'خريطة تفاعلية للأسعار المرجعية' : 'Interactive reference prices'}</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Properties List */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                   <h3 className="text-xl font-black text-slate-900 px-2">{c.verifiedOffers}</h3>
                   <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 pb-8">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                         <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                     <span className="text-[10px] font-bold text-emerald-600">{isArabic ? 'متاح للاستحواذ' : 'Available for acquisition'}</span>
                                  </div>
                                  <h4 className="font-black text-slate-900">{isArabic ? `فيلا سكنية - ${detailTitle || 'الملقا'}` : `Residential Villa - ${detailTitle || 'Al Malga'}`}</h4>
                                  <p className="text-xs text-slate-400 font-bold mt-1">{200 + (i*40)} {isArabic ? 'متر مربع' : 'sqm'}</p>
                               </div>
                               <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {isArabic ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                               </div>
                            </div>
                            <div className="flex items-end justify-between pt-4 border-t border-slate-50">
                               <div>
                                  <div className="text-[10px] text-slate-400 font-bold uppercase">{isArabic ? 'السعر الموثق' : 'Verified Price'}</div>
                                  <div className="text-lg font-black text-blue-600">{(4.2 - (i*0.3)).toFixed(1)}M <span className="text-xs font-bold opacity-60">SAR</span></div>
                               </div>
                               <Building className="w-5 h-5 text-slate-200" />
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

