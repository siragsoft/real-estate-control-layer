import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Gavel, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck2,
  Users,
  ExternalLink,
  Database,
  Loader2,
  BarChart4,
  Search,
  Building,
  MapPin,
  Briefcase
} from 'lucide-react';
import { collection, addDoc, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  isArabic: boolean;
}

export default function GovernancePanel({ isArabic }: Props) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveStreamData, setLiveStreamData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchLiveStream();
  }, []);

  const fetchLiveStream = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(10));
      const snaps = await getDocs(q);
      const data = snaps.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLiveStreamData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(30));
      const snaps = await getDocs(q);
      const allData = snaps.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const term = searchQuery.toLowerCase();
      const filtered = allData.filter(d => 
        (d.title && d.title.toLowerCase().includes(term)) ||
        (d.city && d.city.toLowerCase().includes(term)) ||
        (d.district && d.district.toLowerCase().includes(term)) ||
        (d.brokerName && d.brokerName.toLowerCase().includes(term))
      );
      setSearchResults(filtered);
    } catch (e) {
      console.error(e);
      toast.error(isArabic ? 'فشل البحث' : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const performanceData = [
    { name: '01', value: 4000 },
    { name: '02', value: 3000 },
    { name: '03', value: 2000 },
    { name: '04', value: 2780 },
    { name: '05', value: 1890 },
    { name: '06', value: 2390 },
    { name: '07', value: 3490 },
    { name: '08', value: 4000 },
  ];

  const seedDatabase = async () => {
    setIsSeeding(true);
    try {
      const cities = ["الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة", "المدينة المنورة"];
      const districts = {
        "الرياض": ["الملقا", "النرجس", "الياسمين", "حطين", "العليا", "قُرطبة"],
        "جدة": ["الشاطئ", "الحمراء", "الروضة", "أبحر الشمالية", "الخالدية"],
        "الدمام": ["الفيصلية", "النزهة", "العزيزية", "الشاطئ الغربي"],
        "الخبر": ["العقربية", "الحزام الذهبي", "الهدا"],
        "مكة المكرمة": ["العوالي", "الشوقية", "بطحاء قريش"],
        "المدينة المنورة": ["العزيزية", "الدفاع"]
      };
      const types = ["فيلا", "شقة", "أرض تجارية", "أرض سكنية", "عمارة", "مستودع"];
      const usages = ["سكني", "تجاري", "صناعي"];
      
      const brokers = ["شركة راجحي للعقارات", "مؤسسة القمة العقارية", "بوابة المستقبل للأملاك", "الحلول العقارية المبتكرة", "وسيط معتمد - رقم 4023", "شركة صروح الإعمار"];

      const propsRef = collection(db, 'properties');
      const q = query(propsRef, limit(1));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        toast.info(isArabic ? "السجل يحتوي بالفعل على بيانات" : "Registry already has data");
        fetchLiveStream();
        setIsSeeding(false);
        return;
      }

      // To connect directly to real APIs in production:
      // const response = await fetch('https://api.moj.gov.sa/...');
      // const realData = await response.json(); 

      for (let i = 0; i < 30; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const dists = districts[city as keyof typeof districts] || ["المركز"];
        const district = dists[Math.floor(Math.random() * dists.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const usage = usages[Math.floor(Math.random() * usages.length)];
        const broker = brokers[Math.floor(Math.random() * brokers.length)];
        
        let price = Math.floor(Math.random() * 8000000) + 1000000;
        if(type.includes("أرض")) price += 5000000;
        if(type === "شقة") price = Math.floor(Math.random() * 1000000) + 500000;

        await addDoc(propsRef, {
          title: `${type} مميزة - ${district}`,
          price,
          city,
          district,
          location: `${city}، ${district}`,
          propertyType: type,
          usage,
          purpose: Math.random() > 0.3 ? 'بيع' : 'إيجار',
          areaSize: Math.floor(Math.random() * 1500) + 200,
          description: "بيانات محاكية تم جلبها ضمن البيئة التجريبية للشبكة العقارية الموحدة (توثيق النظام).",
          brokerId: "system-seed",
          brokerName: broker,
          verificationStatus: Math.random() > 0.2 ? 'verified' : 'pending',
          isOriginal: true,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 5)).toISOString(),
          firstRegisteredAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      toast.success(isArabic ? "تم حقن النظام ببيانات محاكية واقعية" : "Realistic localized mock data injected");
      fetchLiveStream();
    } catch (err) {
      toast.error("Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  };
  const complianceStats = [
    { label: isArabic ? "تراخيص فال النشطة" : "Active VAL Licenses", value: "8,420", status: 'ok', sub: isArabic ? "بناءً على ربط الهيئة" : "RE Authority Sync", trend: '+12%' },
    { label: isArabic ? "ربط النفاذ الوطني" : "Nafath SSO Status", value: "100%", status: 'ok', sub: isArabic ? "تحقق أبشر مفعل" : "Absher Integration", trend: 'Active' },
    { label: isArabic ? "نشاط الوساطة 682010" : "Brokerage Activity", value: "Verified", status: 'ok', sub: isArabic ? "توافق السجل التجاري" : "CR Compliance", trend: 'SBC' },
    { label: isArabic ? "محاولات احتيال محجوبة" : "Fraud Blocked", value: "1,420", status: 'alert', sub: isArabic ? "تنبيهات أمنية" : "Security Alerts", trend: '-2.4%' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-end mb-4">
        <Button 
          onClick={seedDatabase} 
          disabled={isSeeding}
          className="bg-slate-900 border-b-4 border-blue-600 hover:bg-slate-800 rounded-xl h-12 px-6 gap-2 font-black text-xs uppercase tracking-widest"
        >
          {isSeeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          {isArabic ? "حقن بيانات السجل (للعرض)" : "Seed Sovereign Registry (Demo)"}
        </Button>
      </div>

      {/* Search Input Section */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-xl mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">
          {isArabic ? "محرك الاستعلام السيادي" : "Sovereign Query Engine"}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5`} />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              placeholder={isArabic ? "ابحث عن صفقة، شركة، أو رقم ترخيص..." : "Search deal, company, or license no..."}
              className={`h-14 rounded-xl border-slate-200 bg-slate-50 text-lg font-bold shadow-inner ${isArabic ? 'pr-12' : 'pl-12'}`}
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg font-black uppercase tracking-widest border-b-4 border-blue-800 active:translate-y-1 active:border-b-0"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : (isArabic ? 'استعلام' : 'Query')}
          </Button>
        </div>

        {/* Search Results Display */}
        {searchResults.length > 0 && (
          <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-t border-slate-100 pt-6">
            <h3 className="text-lg font-black text-slate-800 mb-4">{isArabic ? `النتائج (${searchResults.length})` : `Results (${searchResults.length})`}</h3>
            {searchResults.map((res) => (
              <div key={res.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 border-b border-slate-200 pb-1 mb-2">{res.title}</h4>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {res.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {res.brokerName}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-black text-blue-600">{Number(res.price).toLocaleString()} SAR</div>
                  <Badge variant="outline" className={`${res.verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'} text-[10px] uppercase font-black tracking-widest px-2 py-0 mt-2`}>
                    {res.verificationStatus || 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceStats.map((stat) => (
          <Card key={stat.label} className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                {stat.status === 'ok' ? (
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                {stat.trend && (
                  <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className={`text-[10px] mt-1 font-bold italic ${stat.status === 'ok' ? 'text-blue-600' : 'text-red-500'}`}>{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-xl font-black text-slate-900">
                  <BarChart4 className="w-5 h-5 text-blue-600" />
                  {isArabic ? "أداء السوق الكلي" : "Global Market Performance"}
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">
                  Liquidity and transaction velocity metrics
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm rounded-[2rem] overflow-hidden bg-white flex flex-col">
          <CardHeader className="border-b border-slate-100 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  {isArabic ? "بث التحقق المباشر" : "Verification Live Stream"}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto max-h-[350px] custom-scrollbar">
            <div className="divide-y divide-slate-100">
              {liveStreamData.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm font-bold">
                  {isArabic ? "لا توجد حركات موثقة مؤخراً." : "No recent verified activities."}
                </div>
              ) : (
                liveStreamData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm ${
                        item.verificationStatus === 'verified' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.verificationStatus === 'verified' ? 'OK' : 'IN'}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.brokerName}
                        </h4>
                        <code className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.title}</code>
                      </div>
                    </div>
                    <Badge variant={item.verificationStatus === 'verified' ? 'default' : 'secondary'} className="text-[10px] uppercase font-black tracking-widest px-3">
                      {item.verificationStatus || 'Pending'}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="space-y-6">
          <Card className="bg-[#0F172A] text-white border-none rounded-[2rem] overflow-hidden relative shadow-2xl">
             <div className="p-8 relative z-10">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3 leading-tight">{isArabic ? "وثيقة حقوق الوسيط الرقمية" : "Digital Broker Rights"}</h3>
                <p className="text-slate-400 text-xs font-medium mb-8 leading-relaxed">
                  {isArabic 
                    ? "نظامنا يضمن تسجيل كل فرصة بالوقت والتاريخ، مما يمنع المنازعات ويضمن شفافية كاملة للهيئة العامة للعقار."
                    : "Universal timestamping protocol for real estate opportunities. Resolving disputes before they happen."}
                </p>
                <Button variant="outline" className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white gap-2 h-12 font-black text-xs uppercase tracking-widest">
                   <FileCheck2 className="w-4 h-4" />
                   {isArabic ? "تقارير الامتثال" : "Compliance Reports"}
                </Button>
             </div>
             <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -translate-y-24 translate-x-24 blur-3xl" />
          </Card>

          <Card className="border border-slate-200 shadow-sm rounded-2xl h-[400px] flex flex-col">
            <CardHeader className="pb-2 shrink-0">
               <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  {isArabic ? "موصلات البيانات المفتوحة والمنصات" : "Open Data & Platform Connectors"}
               </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
               {[
                 'سكن وسفر', 'سمح العقارية', 'عقار كوم', 'صح', 'دار DAR', 'تاون توب العقارية', 'الدال', 'سداسيات العقارية', 'وصلت', 'عقارز', 'مدى العقارية', 'رغدان العقارية', 'عقار', 'سندك', 'ذكي التفاعلية', 'لقى العقارية', 'Reinvest', 'تصل', 'صكوك العقارية', 'سهيل', 'مأوى | mawa', 'عقاراتكم', 'عقار ستي', 'سكن العالمية', 'عقارك', 'آرك | ARK', 'خمسين خمسين', 'منصة رواف العقارية', 'رواسيم', 'خطوات العقار', 'بسط العقارية', 'أماكن', 'سوم عقار', 'بوابة العقار', 'فرصة غير', 'مدن العقارية', 'مكتمل', 'أمتار', 'الوقت الذهبي العقارية', 'أبواب', 'دلّالي', 'حلول | Holoul', 'توور', 'تداولكم العقارية', 'أبعاد', 'أبراج للعقارات', 'ساعي', 'طوبة | TUBA', 'تطبيق ديل', 'المسوق الإفتراضي', 'افاق الفا', 'تطبيق أرض', 'رايز', 'نافذة', 'عقارات اكسبو', 'بيوت السعودية', 'منون', 'تطبيق مالك', 'نزل', 'مسار التمليك', 'شبكة عقار', 'مباشر', 'تمم', 'بروبرتي فايندر', 'منصة صك العقارية', 'ALAAQAR', 'زاهب', 'ثري جيتس', 'لارات', 'سكني', 'العجلان ريفييرا', 'Paseetah', 'Suhail.ai'
               ].map(platform => (
                 <div key={platform} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                    <span className="text-[10px] font-bold text-slate-600">{platform}</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">Syncing</span>
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  {isArabic ? "تكامل المؤسسات الحكومية" : "Government Integrations"}
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               {[
                 { name: isArabic ? "الهيئة العامة للعقار" : "GEA Registry", linked: true },
                 { name: isArabic ? "نظام (فال)" : "VAL Protocol", linked: true },
                 { name: isArabic ? "وزارة العدل" : "MOJ Services", linked: true },
                 { name: isArabic ? "البيانات الوطنية المفتوحة" : "National Open Data", linked: true },
               ].map(e => (
                 <div key={e.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-700">{e.name}</span>
                    <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">Connected</Badge>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
