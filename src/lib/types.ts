// Types for YUZERSEF (يوزرسيف) - Aswan Printing & Personalisation Business

export type RequestStatus =
  | 'submitted'      // تم التقديم
  | 'under-review'   // قيد المراجعة
  | 'approved'       // معتمد
  | 'in-progress'    // قيد التنفيذ
  | 'ready'          // جاهز للاستلام
  | 'completed'      // مكتمل
  | 'rejected';      // مرفوض

export type ServiceCategory =
  | 'clothing'       // تيشرتات وهوديز
  | 'caps'           // كابات
  | 'stickers'       // استيكرات ولواصق
  | 'mugs-gifts'     // مجّات وهدايا
  | 'phone-cases'    // جرابات هواتف
  | 'custom-design'; // تصاميم مخصصة

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  startingPrice: string; // Placeholder (needs client confirmation)
  features: string[];
  deliverables: string[];
  estimatedDays: string;
  badge?: string;
  imageUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  category: ServiceCategory;
  serviceId: string;
  description: string;
  tags: string[];
  year: string;
  highlight: string;
  imageUrl?: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string; // UI preview only
}

// Clothing size breakdown: S, M, L, XL, XXL
export interface SizeBreakdown {
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

// Service Request (with full dynamic specifications for Yuzersef)
export interface ServiceRequest {
  id: string; // e.g. YZ-0001
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceTitle: string;
  serviceCategory: ServiceCategory;
  projectBrief: string;
  quantity: number;
  
  // Clothing & Caps specific fields
  clothingColor?: string;
  sizeBreakdown?: SizeBreakdown;
  printPlacement?: 'chest' | 'back' | 'pocket' | 'sleeve' | 'both-sides';

  // Phone cases & gifts specific fields
  phoneModel?: string;
  personalisationText?: string;

  // Stickers & labels specific fields
  stickerWidthCm?: number;
  stickerHeightCm?: number;
  stickerShape?: 'rectangle' | 'circle' | 'custom-cut';
  stickerUsage?: 'indoor' | 'outdoor-waterproof';

  // Artwork & General
  needsDesignHelp: boolean; // true if customer needs designer assistance
  attachments: FileAttachment[];
  desiredDate: string; // approximate date requested
  receiptPreference: 'aswan-pickup' | 'shipping-delivery'; // pickup in Aswan vs delivery
  
  urgency: 'normal' | 'urgent';
  budget?: string;

  // Status & Tracking
  status: RequestStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  adminNotes?: string;
  rejectionReason?: string;
  nextStepText?: string; // next step instructed by admin
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface AdminUser {
  username: string;
  name: string;
  role: 'admin';
  token: string;
}

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}
