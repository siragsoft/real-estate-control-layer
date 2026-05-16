import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Target, Zap, TrendingUp, Users, Building2, Check } from 'lucide-react';

interface HeroProps {
  isArabic: boolean;
  onStart: () => void;
}

export default function Hero({ isArabic, onStart }: HeroProps) {
  const content = {
    ar: {
      badge: "مستقبل العقارات الرقمي",
      title: "أكثر من مجرد منصة... هذه هي",
      titleBlue: "طبقة التحكم العقاري",
      description: "بنية رقمية وسيطة تحول السوق العقاري من العشوائية إلى نظام موحد، موثق، وقابل للقياس. نحمي حقوق الوسطاء ونوفر شفافية كاملة للمستثمرين.",
      cta: "استكشف الفرص الموثقة",
      stats: [
        { label: "كفاءة السوق", value: "+40%", icon: TrendingUp },
        { label: "ثقة الوسطاء", value: "100%", icon: ShieldCheck },
        { label: "سرعة التنفيذ", value: "2x", icon: Zap },
      ],
      pricing: {
        title: "خطط الاشتراك والتشغيل",
        subtitle: "اختر المستوى المناسب لأعمالك العقارية",
        plans: [
          { name: "وسيط ناشئ", price: "499", unit: "ر.س/شهر", features: ["دخول السوق الموحد", "توثيق 5 صفقات", "دعم فني قياسي"] },
          { name: "وكالة متقدمة", price: "1,499", unit: "ر.س/شهر", features: ["ذكاء السوق AI", "تحقق لانهائي", "أدوات الربط الحكومي"] },
          { name: "مطور مؤسسي", price: "4,999", unit: "ر.س/شهر", features: ["API سيادي", "لوحة تحكم إقليمية", "دعم مخصص 24/7"] }
        ]
      },
      about: {
        title: "البروتوكول السيادي",
        subtitle: "الركائز الأساسية لبنيتنا التحتية الرقمية",
        sections: [
          {
            id: "about-us",
            title: "من نحن",
            desc: "البنية التحتية الرقمية السيادية للعقارات السعودية، نوفر طبقة تحكم موحدة للتوثيق وكفاءة السوق.",
            icon: Building2
          },
          {
            id: "vision",
            title: "رؤيتنا",
            desc: "أن نصبح العمود الفقري الرقمي الموثوق للمملكة، مما يضمن أمان كل صفقة وحكمها ببروتوكولات بيانات سيادية.",
            icon: Target
          },
          {
            id: "message",
            title: "رسالتنا",
            desc: "الارتقاء بالصناعة من خلال دمج الذكاء الاصطناعي والتحقق المتقدم لحماية حقوق الوسطاء ومصالح المستثمرين.",
            icon: Zap
          },
          {
            id: "how-we-work",
            title: "منطق التشغيل",
            desc: "ربط البيانات الحكومية مع المشاركين في السوق من خلال محرك فوري يضمن السلامة المطلقة للبيانات.",
            icon: ShieldCheck
          }
        ]
      },
      howItWorks: {
        title: "آلية العمل التقنية",
        subtitle: "كيف نقوم بحماية وتوثيق الأصول الرقمية",
        steps: [
          { title: "ربط البيانات", desc: "تكامل مباشر مع قواعد البيانات العقارية والأنظمة الحكومية (فال، وزارة العدل)." },
          { title: "بروتوكول التدقيق", desc: "خوارزميات ذكاء اصطناعي تتحقق من صحة الملكية وعدم تكرار الإعلانات." },
          { title: "التوثيق السيادي", desc: "إصدار شهادة ثقة رقمية تضمن للطرفين اكتمال أركان الصفقة قانونياً." }
        ]
      },
      brokerRights: {
        title: "وثيقة حقوق الوسيط الرقمية",
        desc: "نظامنا يضمن تسجيل كل فرصة بالوقت والتاريخ، مما يمنع المنازعات ويضمن شفافية كاملة للهيئة العامة للعقار."
      }
    },
    en: {
      badge: "Digital Future of Real Estate",
      title: "More than a platform... This is",
      titleBlue: "Real Estate Control Layer",
      description: "An intermediate digital infrastructure that transforms the real estate market from chaos to a unified, documented, and measurable system. We protect broker rights and provide full transparency for investors.",
      cta: "Explore Verified Deals",
      stats: [
        { label: "Market Efficiency", value: "+40%", icon: TrendingUp },
        { label: "Broker Trust", value: "100%", icon: ShieldCheck },
        { label: "Deal Speed", value: "2x", icon: Zap },
      ],
      pricing: {
        title: "Subscription Protocols",
        subtitle: "Choose your operational tier",
        plans: [
          { name: "Starter Broker", price: "499", unit: "SAR/mo", features: ["Unified Market View", "5 Verified Deals", "Standard Support"] },
          { name: "Advanced Agency", price: "1,499", unit: "SAR/mo", features: ["AI Intelligence", "Infinite Discovery", "Gov Integrations"] },
          { name: "Sovereign Developer", price: "4,999", unit: "SAR/mo", features: ["Enterprise API", "Regional Dashboard", "24/7 Account Mgr"] }
        ]
      },
      about: {
        title: "The Sovereign Protocol",
        subtitle: "Core pillars of our digital infrastructure",
        sections: [
          {
            id: "about-us",
            title: "About Us",
            desc: "The sovereign digital infrastructure for Saudi Real Estate, providing a unified control layer for documentation and market efficiency.",
            icon: Building2
          },
          {
            id: "vision",
            title: "Our Vision",
            desc: "To become the Kingdom's trusted digital backbone, ensuring every transaction is secure and governed by sovereign data protocols.",
            icon: Target
          },
          {
            id: "message",
            title: "Our Mission",
            desc: "Elevating the industry by integrating AI and advanced verification to protect broker rights and investor interests.",
            icon: Zap
          },
          {
            id: "how-we-work",
            title: "Operational Logic",
            desc: "Bridging governmental data with market participants through a real-time engine that ensures absolute data integrity.",
            icon: ShieldCheck
          }
        ]
      },
      howItWorks: {
        title: "Technical Workflow",
        subtitle: "How we protect and verify digital assets",
        steps: [
          { title: "Data Integration", desc: "Direct connection with government registries and VAL licensing systems." },
          { title: "Audit Protocol", desc: "AI algorithms verify ownership validity and prevent duplicate listings." },
          { title: "Sovereign Trust", desc: "Issuing digital certificates that guarantee legal deal completion for both parties." }
        ]
      },
      brokerRights: {
        title: "Digital Broker Rights Document",
        desc: "Our system ensures every opportunity is registered with time and date, preventing disputes and ensuring full transparency for the General Authority for Real Estate."
      }
    }
  };

  const c = isArabic ? content.ar : content.en;

  return (
    <div className="relative py-12 md:py-24 overflow-hidden flex flex-col items-center">
      <div className="max-w-6xl mx-auto text-center relative z-10 box-content px-4">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black mb-8 border border-blue-200 uppercase tracking-widest"
        >
          <Target className="w-4 h-4" />
          {c.badge}
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-8xl font-black leading-[1.1] mb-8 text-slate-900 tracking-tighter"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {c.title} <br className="hidden md:block" />
          <span className="text-blue-600 drop-shadow-xl">{c.titleBlue}</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {c.description}
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button size="lg" onClick={onStart} className="rounded-2xl px-12 bg-[#0F172A] hover:bg-slate-800 text-lg py-8 shadow-2xl border-b-4 border-blue-600 transition-all hover:translate-y-[-2px] active:translate-y-[2px] font-black text-xs uppercase tracking-widest">
            {c.cta}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
          {c.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-2xl transition-all group hover:-translate-y-2 cursor-default"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-none">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* About Sections */}
        <section className="w-full mb-32 px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{c.about.title}</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">{c.about.subtitle}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.about.sections.map((section, i) => (
                 <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                 >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />
                    
                    <div className="relative">
                       <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                         <section.icon className="w-6 h-6" />
                       </div>
                       <h3 className="text-xl font-black text-slate-900 mb-4">{section.title}</h3>
                       <p className="text-slate-500 font-bold text-sm leading-relaxed">{section.desc}</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full mb-32 px-4">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{c.howItWorks.title}</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">{c.howItWorks.subtitle}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-slate-100 -z-10" />
              
              {c.howItWorks.steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20 ring-8 ring-blue-50">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-400 font-bold text-sm max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Broker Rights Informative Section */}
        <section className="w-full mb-32 px-4">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden text-center"
           >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8 backdrop-blur-md">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">{c.brokerRights.title}</h2>
                <p className="text-xl font-bold opacity-90 leading-relaxed">
                  {c.brokerRights.desc}
                </p>
              </div>
           </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="w-full">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{c.pricing.title}</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">{c.pricing.subtitle}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.pricing.plans.map((plan, i) => (
                 <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className={`bg-white border rounded-[3rem] p-8 text-left flex flex-col ${i === 1 ? 'border-blue-600 ring-8 ring-blue-50 shadow-2xl relative' : 'border-slate-200 shadow-sm'}`}
                    dir={isArabic ? 'rtl' : 'ltr'}
                 >
                    {i === 1 && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full">
                        Recommended Protocol
                      </div>
                    )}
                    <div className="mb-8">
                      <h3 className="text-xl font-black text-slate-900 mb-4">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black">{plan.price}</span>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{plan.unit}</span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-10 flex-1">
                       {plan.features.map(f => (
                         <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                           <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                             <Check className="w-3 h-3 text-blue-600" />
                           </div>
                           {f}
                         </div>
                       ))}
                    </div>
                    <Button className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest ${i === 1 ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20' : 'bg-slate-900 hover:bg-slate-800'}`}>
                      {isArabic ? 'تفعيل البروتوكول' : 'Initalize Layer'}
                    </Button>
                 </motion.div>
              ))}
           </div>
        </section>
     </div>

      {/* Decorative Grid */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
}
