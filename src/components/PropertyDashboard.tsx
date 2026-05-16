import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Property } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Search,
  Filter,
  Maximize2,
  TrendingDown,
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isArabic: boolean;
}

export default function PropertyDashboard({ isArabic }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
      setProperties(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'properties');
    });
    return unsubscribe;
  }, []);

  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      (p.district || p.location).toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter === 'all' || p.city === cityFilter;
    const matchesType = typeFilter === 'all' || p.propertyType === typeFilter;
    return matchesSearch && matchesCity && matchesType;
  });

  const cities = Array.from(new Set(properties.map(p => p.city).filter(Boolean)));
  const types = Array.from(new Set(properties.map(p => p.propertyType).filter(Boolean)));

  return (
    <div className="space-y-6 pb-24">
      {/* Search & Intelligence Bar */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <Search className={`absolute ${isArabic ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5`} />
            <Input 
              placeholder={isArabic ? "ابحث في سجلات العقارات السيادية (الرياض، الملقا، فيلا...)" : "Query sovereign registry (Riyadh, Al-Malqa, Villa...)"}
              className={`${isArabic ? 'pr-14 text-right' : 'pl-14'} rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all h-16 font-bold text-lg`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button 
               onClick={() => setShowFilters(!showFilters)}
               variant="outline" 
               className={`h-16 px-8 rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest gap-2 flex-1 lg:flex-none ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
            >
              <Filter className="w-4 h-4" />
              {isArabic ? "تصفية السجل" : "Registry Filters"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            <Badge className="bg-blue-600 h-16 px-8 rounded-2xl flex flex-col justify-center gap-0 min-w-[140px] items-start">
               <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Active Nodes</span>
               <span className="text-xl font-black">{filtered.length}</span>
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{isArabic ? "المدينة" : "City"}</label>
                    <Select onValueChange={setCityFilter} value={cityFilter}>
                      <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100 font-bold">
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isArabic ? "كل المدن" : "All Cities"}</SelectItem>
                        {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{isArabic ? "نوع العقار" : "Property Type"}</label>
                    <Select onValueChange={setTypeFilter} value={typeFilter}>
                      <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100 font-bold">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isArabic ? "كل الأنواع" : "All Types"}</SelectItem>
                        {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{isArabic ? "ترتيب" : "Sort By"}</label>
                    <Select defaultValue="newest">
                      <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-100 font-bold">
                        <SelectValue placeholder={isArabic ? "الأحدث" : "Newest"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">{isArabic ? "الأحدث أولاً" : "Newest First"}</SelectItem>
                        <SelectItem value="price-asc">{isArabic ? "السعر: الأدنى" : "Price: Low to High"}</SelectItem>
                        <SelectItem value="price-desc">{isArabic ? "السعر: الأعلى" : "Price: High to Low"}</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-white border border-slate-200 animate-pulse rounded-[3rem]" />)}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group bg-white hover:shadow-2xl transition-all duration-500 border border-slate-200 rounded-[3rem] overflow-hidden relative flex flex-col h-full ring-1 ring-slate-200/50">
                {p.isOriginal && (
                  <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} z-10`}>
                    <Badge className="bg-blue-600 hover:bg-blue-700 border-none shadow-xl gap-2 py-2 px-5 rounded-full uppercase text-[10px] tracking-widest font-black">
                      <ShieldCheck className="w-4 h-4" />
                      {isArabic ? "موثق سيادياً" : "Sovereign Verified"}
                    </Badge>
                  </div>
                )}
                
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
                       {p.propertyType === 'Villa' ? <Building className="w-8 h-8" /> : <Maximize2 className="w-8 h-8" />}
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="border-slate-200 text-slate-400 text-[10px] font-black rounded-lg py-1">
                        {p.propertyType} • {p.purpose}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-blue-600 text-xs mt-2 font-black uppercase tracking-widest">
                         <MapPin className="w-3.5 h-3.5" />
                         {p.city}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors leading-tight mb-2">
                       {p.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 line-clamp-1">
                       {p.district || p.location} {isArabic ? "• سجل رقم:" : "• Node ID:"} {p.id.slice(0, 8)}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-[2rem] p-8 mb-6 group-hover:bg-blue-50 transition-colors border border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isArabic ? "قيمة السجل" : "Registry Value"}</span>
                       <div className="flex items-center gap-1 text-green-500 font-bold text-xs">
                          <TrendingDown className="w-3 h-3 rotate-180" />
                          +4.2%
                       </div>
                    </div>
                    <p className="text-4xl font-black text-slate-900 leading-none py-2">
                      {Number(p.price).toLocaleString()} <span className="text-sm font-normal text-slate-400 ml-1">{isArabic ? 'ر.س' : 'SAR'}</span>
                    </p>
                    <div className="flex items-center gap-4 mt-2 pt-4 border-t border-slate-200/50">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{isArabic ? "المساحة" : "Area"}</span>
                          <span className="text-xs font-black text-slate-900">{p.areaSize || 450} m²</span>
                       </div>
                       <div className="flex flex-col border-r border-slate-200/50 pr-4">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{isArabic ? "الاستخدام" : "Usage"}</span>
                          <span className="text-xs font-black text-slate-900">{p.usage || 'Residential'}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 px-8 py-6 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white font-black border border-slate-700">
                      {p.brokerName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-white uppercase tracking-wider">{p.brokerName}</span>
                      <span className="text-[8px] font-bold opacity-50">{isArabic ? "وسيط معتمد" : "Verified Node"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 font-bold">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {new Date(p.createdAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                    </div>
                    <span className="text-[8px] opacity-30">PROCESSED AT GATEWAY 7</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <div className="text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 shadow-inner">
           <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
              <Building className="w-16 h-16 text-slate-200" />
           </div>
           <h4 className="text-4xl font-black text-slate-900 mb-4">{isArabic ? "لا توجد سجلات مطابقة" : "Zero Node Matches"}</h4>
           <p className="text-slate-400 max-w-sm mx-auto font-bold uppercase text-xs tracking-widest leading-relaxed">
             {isArabic ? "جرب تغيير مصطلحات البحث أو الفلترة المتقدمة لمسح أوسع لقاعدة البيانات" : "Adjust your query parameters to scan the sovereign database again"}
           </p>
           <Button className="mt-8 rounded-2xl bg-blue-600 px-8 font-black uppercase text-xs tracking-widest h-14" onClick={() => { setSearch(''); setCityFilter('all'); setTypeFilter('all'); }}>
             {isArabic ? "إعادة تعيين البحث" : "Reset Data Search"}
           </Button>
        </div>
      )}
    </div>
  );
}
