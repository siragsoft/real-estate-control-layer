import { useState } from 'react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ShieldCheck, Loader2, Info } from 'lucide-react';

interface Props {
  isArabic: boolean;
  onSuccess: () => void;
}

export default function PropertyRegistration({ isArabic, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    city: 'Riyadh',
    district: '',
    propertyType: 'Villa',
    usage: 'Residential',
    purpose: 'Sale' as 'Sale' | 'Rent',
    areaSize: '',
    description: '',
    valLicense: '',
    crNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error(isArabic ? "يجب تسجيل الدخول عبر نفاذ أولاً" : "Must be logged in via Nafath");
      return;
    }

    if (!formData.valLicense || formData.valLicense.length < 10) {
      toast.error(isArabic ? "يرجى إدخال رقم رخصة فال صحيح" : "Please enter a valid VAL license number");
      return;
    }

    setLoading(true);
    try {
      // Logic to check if this is the "First Registration"
      const propertiesRef = collection(db, 'properties');
      const q = query(propertiesRef, 
        where('title', '==', formData.title), 
        where('city', '==', formData.city),
        where('district', '==', formData.district)
      );
      
      let snapshot;
      try {
        snapshot = await getDocs(q);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'properties');
        return;
      }

      const isOriginal = snapshot.empty;

      const propertyData = {
        title: formData.title,
        price: Number(formData.price),
        city: formData.city,
        district: formData.district,
        location: `${formData.city}، ${formData.district}`,
        propertyType: formData.propertyType,
        usage: formData.usage,
        purpose: formData.purpose,
        areaSize: Number(formData.areaSize),
        description: formData.description,
        brokerId: auth.currentUser.uid,
        brokerName: auth.currentUser.displayName || 'Unknown Broker',
        verificationStatus: 'pending',
        isOriginal: isOriginal,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, 'properties'), propertyData);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'properties');
      }

      toast.success(isOriginal 
        ? (isArabic ? 'تم توثيق "الفرصة الأولى" برخصة فال المعتمدة' : '"First Deal" registered with verified VAL license')
        : (isArabic ? 'تم إضافة العقار بنجاح (مكرر)' : 'Property added successfully (Duplicate)')
      );
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(isArabic ? 'حدث خطأ أثناء التوثيق' : 'Error during verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <Card className="shadow-2xl border-none rounded-[2rem] overflow-hidden bg-white">
        <CardHeader className="bg-[#0F172A] text-white p-10 relative">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400/30 text-[10px] font-black uppercase tracking-widest px-3">
                Protocol v2.4 Secured
              </Badge>
            </div>
            <CardTitle className="text-3xl font-black mb-2">
              {isArabic ? "تسجيل فرصة سيادية" : "Register Sovereign Deal"}
            </CardTitle>
            <CardDescription className="text-slate-400 text-lg font-medium">
              {isArabic 
                ? "توثيق ملكية الفرصة في طبقة التحكم العقاري." 
                : "Timestamping opportunity ownership in the Control Layer."}
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
        </CardHeader>
        <CardContent className="p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-slate-400">
                {isArabic ? "اسم العقار / العنوان" : "Property Title / Headline"}
              </Label>
              <Input 
                id="title"
                required
                placeholder={isArabic ? "مثال: فيلا حي الملقا - زاوية تجارية" : "e.g. Al-Malqa Villa - Commercial Corner"}
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="valLicense" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "رخصة فال (VAL)" : "VAL License"}
                </Label>
                <Input 
                  id="valLicense"
                  required
                  placeholder="1100000000"
                  value={formData.valLicense}
                  onChange={e => setFormData({...formData, valLicense: e.target.value})}
                  className="h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="crNumber" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "السجل التجاري (682010)" : "Commercial Reg. (CR)"}
                </Label>
                <Input 
                  id="crNumber"
                  required
                  placeholder="1010XXXXXX"
                  value={formData.crNumber}
                  onChange={e => setFormData({...formData, crNumber: e.target.value})}
                  className="h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "المدينة" : "City"}
                </Label>
                <select 
                  id="city"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full h-14 rounded-xl bg-slate-50 border border-slate-200 px-4 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                >
                  <option value="Riyadh">{isArabic ? "الرياض" : "Riyadh"}</option>
                  <option value="Jeddah">{isArabic ? "جدة" : "Jeddah"}</option>
                  <option value="Dammam">{isArabic ? "الدمام" : "Dammam"}</option>
                  <option value="Khobar">{isArabic ? "الخبر" : "Khobar"}</option>
                  <option value="Mecca">{isArabic ? "مكة" : "Mecca"}</option>
                  <option value="Medina">{isArabic ? "المدينة المنورة" : "Medina"}</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="district" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "الحي" : "District"}
                </Label>
                <Input 
                  id="district"
                  required
                  placeholder={isArabic ? "مثال: الملقا، النرجس" : "e.g. Al-Malqa, An-Narjis"}
                  value={formData.district}
                  onChange={e => setFormData({...formData, district: e.target.value})}
                  className="h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="propertyType" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "نوع العقار" : "Property Type"}
                </Label>
                <select 
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={e => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full h-14 rounded-xl bg-slate-50 border border-slate-200 px-4 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                >
                  <option value="Villa">{isArabic ? "فيلا" : "Villa"}</option>
                  <option value="Apartment">{isArabic ? "شقة" : "Apartment"}</option>
                  <option value="Land">{isArabic ? "أرض" : "Land"}</option>
                  <option value="Building">{isArabic ? "عمارة" : "Building"}</option>
                  <option value="Warehouse">{isArabic ? "مستودع" : "Warehouse"}</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="areaSize" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "المساحة (م²)" : "Area (m²)"}
                </Label>
                <Input 
                  id="areaSize"
                  type="number"
                  required
                  placeholder="0.00"
                  value={formData.areaSize}
                  onChange={e => setFormData({...formData, areaSize: e.target.value})}
                  className="h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="usage" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "الاستخدام" : "Usage"}
                </Label>
                <select 
                  id="usage"
                  value={formData.usage}
                  onChange={e => setFormData({...formData, usage: e.target.value})}
                  className="w-full h-14 rounded-xl bg-slate-50 border border-slate-200 px-4 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                >
                  <option value="Residential">{isArabic ? "سكني" : "Residential"}</option>
                  <option value="Commercial">{isArabic ? "تجاري" : "Commercial"}</option>
                  <option value="Industrial">{isArabic ? "صناعي" : "Industrial"}</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="purpose" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "الغرض" : "Purpose"}
                </Label>
                <select 
                  id="purpose"
                  value={formData.purpose}
                  onChange={e => setFormData({...formData, purpose: e.target.value as 'Sale' | 'Rent'})}
                  className="w-full h-14 rounded-xl bg-slate-50 border border-slate-200 px-4 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                >
                  <option value="Sale">{isArabic ? "للبيع" : "For Sale"}</option>
                  <option value="Rent">{isArabic ? "للإيجار" : "For Rent"}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="space-y-3">
                <Label htmlFor="price" className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {isArabic ? "السعر المستهدف" : "Target Price"}
                </Label>
                <div className="relative">
                  <Input 
                    id="price"
                    type="number"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className={`h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-lg font-bold ${isArabic ? 'pr-4 pl-14' : 'pl-4 pr-14'}`}
                  />
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'left-4' : 'right-4'} text-slate-400 font-black text-xs uppercase tracking-tighter`}>
                    {isArabic ? 'ر.س' : 'SAR'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-slate-400">
                {isArabic ? "المواصفات الفنية" : "Technical Specifications"}
              </Label>
              <textarea 
                id="description"
                rows={4}
                className="flex min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus:bg-white transition-all"
                placeholder={isArabic ? "أدخل التفاصيل الدقيقة والمميزات الاستثمارية..." : "Enter precise details and investment highlights..."}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl flex gap-4 border border-slate-100 items-start">
               <div className="mt-1 bg-amber-100 p-1.5 rounded-lg">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
               </div>
               <p className="text-xs text-slate-500 leading-relaxed font-bold italic">
                  {isArabic 
                    ? "عند التسجيل، يقوم بروتوكول التوثيق الزمني بحفظ حقك في عرض هذه الفرصة. التكرار سيؤدي لوسم الإعلان كـ 'مكرر' لحماية الأسبقية الرقمية."
                    : "Registration triggers a timestamp protocol. Duplicates will be flagged to protect first-mover digital rights."}
               </p>
            </div>

            <Button 
               type="submit" 
               className="w-full h-16 text-lg font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 border-b-4 border-blue-800 rounded-xl transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest" 
               disabled={loading}
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isArabic ? 'إتمام التوثيق الفوري' : 'Finalize Timestamping')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
