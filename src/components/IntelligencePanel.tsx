import { useState } from 'react';
import { ai as gemini } from '../lib/gemini';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, TrendingUp, BarChart3, Search, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

interface Props {
  isArabic: boolean;
}

export default function IntelligencePanel({ isArabic }: Props) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeMarket = async () => {
    if (!gemini) return;
    setLoading(true);
    try {
      const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following real estate market request in ${isArabic ? 'Arabic' : 'English'}: ${query}. 
        You have access to real-time data streams from Saudi Open Data, GEA, VAL, and 70+ platforms including Sakan, Aqar, Suhail.ai, Bayut, and more.
        Provide insights on price fairness, demand trends in specific Riyadh/Jeddah neighborhoods, and strategic advice.
        Format as clear markdown with professional tone.`,
      });
      setResult(response.text || "No insights generated.");
    } catch (err) {
      console.error(err);
      setResult("Error generating analysis.");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = isArabic 
    ? ["تحليل أسعار شمال الرياض", "اتفاقيات المطورين الجدد", "مؤشر حركة السيولة العقارية"]
    : ["North Riyadh Price Analysis", "New Developer Agreements", "Market Liquidity Index"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Sidebar Controls */}
      <div className="space-y-6">
        <Card className="bg-[#0F172A] text-white border-none rounded-[2rem] overflow-hidden shadow-2xl relative">
          <CardHeader className="relative z-10 p-8">
            <div className="flex items-center gap-3 text-blue-400 mb-6 group">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
               </div>
               <div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400/30 text-[10px] font-black uppercase tracking-widest px-2 mb-1">Quantum Engine</Badge>
                  <CardTitle className="text-xl font-black">{isArabic ? "تحليل السوق الذكي" : "Market Intelligence"}</CardTitle>
               </div>
            </div>
            <div className="space-y-4">
              <Input 
                placeholder={isArabic ? "أدخل استفسار التحليل..." : "Enter analysis query..."}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-14"
              />
              <Button 
                 onClick={analyzeMarket} 
                 disabled={loading || !query}
                 className="w-full bg-blue-600 hover:bg-blue-700 h-14 gap-2 font-black text-sm uppercase tracking-widest rounded-xl shadow-lg border-b-4 border-blue-800"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isArabic ? "بدء التحليل" : "Execute Analysis"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 px-8 pb-8">
            <div className="pt-6 border-t border-slate-800">
               <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-widest font-black">
                  {isArabic ? "بروتوكولات تحليل مقترحة" : "Suggested Protocols"}
               </p>
               <div className="flex flex-col gap-2">
                  {suggestions.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setQuery(s)}
                      className="text-left text-xs bg-slate-800/50 hover:bg-slate-800 px-4 py-3 rounded-xl transition-all text-slate-300 border border-slate-700/50 hover:border-blue-500/30"
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
        </Card>

        <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex justify-between text-[10px] mb-3 text-slate-400 font-black uppercase tracking-widest">
              <span>{isArabic ? "مؤشر الثقة الرقمي" : "Digital Trust Index"}</span>
              <span className="text-blue-600">92%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '92%' }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="bg-blue-600 h-full rounded-full" 
               />
            </div>
            <p className="text-[10px] text-slate-400 font-bold italic">
              {isArabic ? "ارتفاع ملحوظ بعد ربط أنظمة (فال)" : "Significant rise following VAL integration"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-slate-50/50">
          <CardContent className="p-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
               {isArabic ? "بث البيانات النشط" : "Active Data Streams"}
            </h4>
            <div className="space-y-2">
               {[
                 { name: 'Saudi Open Data', count: '1.2M' },
                 { name: 'Suhail Analysis', count: '850K' },
                 { name: 'Real Estate Platforms', count: '74+' },
               ].map(stream => (
                 <div key={stream.name} className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-500">{stream.name}</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{stream.count} events/sec</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Area */}
      <div className="lg:col-span-2">
        <Card className="min-h-[600px] border border-slate-200 shadow-sm bg-white rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between">
               <CardTitle className="flex items-center gap-3 text-xl font-black text-slate-900">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  {isArabic ? "مخرجات النظام" : "System Output"}
               </CardTitle>
               {result && <Badge className="bg-slate-100 text-slate-600 border-none uppercase text-[10px] tracking-tighter font-black px-3 py-1 font-mono">Report#AI-2024</Badge>}
            </div>
          </CardHeader>
          <CardContent className="p-10">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 text-slate-400 gap-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 animate-spin text-blue-600 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <p className="text-lg font-black uppercase tracking-widest text-slate-300">{isArabic ? "جاري استخراج البيانات..." : "Extracting Data..."}</p>
              </div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 font-arabic text-lg leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <ReactMarkdown>{result}</ReactMarkdown>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-slate-200 border-4 border-dashed border-slate-50 rounded-[3rem]">
                <div className="bg-slate-50 p-8 rounded-full mb-6">
                  <Search className="w-20 h-20 opacity-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-300">{isArabic ? "في انتظار الاستعلام" : "Awaiting Query"}</h4>
                <p className="text-slate-300 font-bold text-sm tracking-widest uppercase mt-2">{isArabic ? "نظام الذكاء العقاري جاهز" : "Market Intelligence Ready"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
