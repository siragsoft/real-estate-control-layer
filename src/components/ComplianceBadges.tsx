import { motion } from 'motion/react';
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  isArabic: boolean;
}

export default function ComplianceBadges({ isArabic }: Props) {
  const content = {
    ar: {
      val: "رخصة فال العقارية: 1100000000",
      sbc: "موثق من المركز السعودي للأعمال",
      ga: "الهيئة العامة للعقار",
      code: "رمز النشاط العقاري: 682010",
      secure: "اتصال آمن SSL مشفر"
    },
    en: {
      val: "VAL License: 1100000000",
      sbc: "Saudi Business Center Verified",
      ga: "General Real Estate Authority",
      code: "Activity Code: 682010",
      secure: "SSL Encrypted Secure Connection"
    }
  };

  const c = isArabic ? content.ar : content.en;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-slate-200 bg-white/50 backdrop-blur-sm px-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm"
      >
        <Award className="w-5 h-5 text-blue-600" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider leading-none mb-1">VAL LICENSED</span>
          <span className="text-[11px] font-bold text-slate-700">{c.val}</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-50/50 rounded-xl border border-emerald-100 shadow-sm"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider leading-none mb-1">SBC VERIFIED</span>
          <span className="text-[11px] font-bold text-slate-700">{c.sbc}</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 shadow-sm"
      >
        <FileCheck className="w-5 h-5 text-slate-600" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider leading-none mb-1">ACTIVITY 682010</span>
          <span className="text-[11px] font-bold text-slate-700">{c.code}</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 shadow-lg"
      >
        <CheckCircle2 className="w-4 h-4 text-blue-400" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{c.secure}</span>
      </motion.div>
    </div>
  );
}
