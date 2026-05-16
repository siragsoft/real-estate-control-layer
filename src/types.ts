export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  district: string;
  location: string;
  propertyType: string;
  usage: string;
  purpose: 'Sale' | 'Rent';
  areaSize: number;
  floors?: number;
  units?: number;
  age?: number;
  description: string;
  brokerId: string;
  brokerName: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  firstRegisteredAt: string;
  createdAt: string;
  updatedAt: string;
  isOriginal: boolean;
}

export interface Broker {
  uid: string;
  name: string;
  licenseNumber: string;
  licenseType: 'VAL' | 'MOUTHOQ';
  rating: number;
  phone: string;
}

export interface AnalyticsReport {
  propertyId: string;
  content: string;
  priceFairness: string;
  demandIndex: number;
  createdAt: string;
}
