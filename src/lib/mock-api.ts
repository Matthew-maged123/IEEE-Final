import {
  Service,
  PortfolioItem,
  ServiceRequest,
  RequestStatus,
  ContactMessage,
  AdminUser
} from './types';
import {
  DEMO_SERVICES,
  DEMO_PORTFOLIO,
  INITIAL_DEMO_REQUESTS,
  DEMO_ADMIN_CREDENTIALS
} from './mock-data';

// Storage Keys
const STORAGE_KEYS = {
  SERVICES: 'yuzersef_services_v2',
  PORTFOLIO: 'yuzersef_portfolio_v2',
  REQUESTS: 'yuzersef_requests_v2',
  MESSAGES: 'yuzersef_messages_v2',
  ADMIN_SESSION: 'yuzersef_admin_session_v2',
};

// Helper: simulate network latency
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: initialize storage
function initStorage() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEMO_SERVICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEMO_PORTFOLIO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
  }
}

// Ensure storage is seeded immediately
initStorage();

// ==========================================
// 1. SERVICES API
// ==========================================
export async function getServices(): Promise<Service[]> {
  await delay(250);
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return data ? JSON.parse(data) : DEMO_SERVICES;
}

export async function getServiceById(id: string): Promise<Service | null> {
  await delay(200);
  const services = await getServices();
  return services.find((s) => s.id === id) || null;
}

// ==========================================
// 2. PORTFOLIO API
// ==========================================
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  await delay(250);
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
  return data ? JSON.parse(data) : DEMO_PORTFOLIO;
}

export async function getPortfolioByCategory(category?: string): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems();
  if (!category || category === 'الكل') return items;
  return items.filter((item) => item.category === category);
}

// ==========================================
// 3. SERVICE REQUESTS API (WIZARD + TRACKING + ADMIN)
// ==========================================
export function generateNextRequestId(existingRequests: ServiceRequest[]): string {
  if (!existingRequests || existingRequests.length === 0) return 'YZ-0001';

  const numbers = existingRequests
    .map((r) => {
      const match = r.id.match(/^YZ-(\d+)$/i);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = max + 1;
  return `YZ-${nextNum.toString().padStart(4, '0')}`;
}

export async function getRequests(): Promise<ServiceRequest[]> {
  await delay(300);
  initStorage();
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
  const list: ServiceRequest[] = data ? JSON.parse(data) : INITIAL_DEMO_REQUESTS;
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getRequestById(id: string): Promise<ServiceRequest | null> {
  await delay(300);
  const trimmedId = id.trim().toUpperCase();
  const list = await getRequests();
  return list.find((r) => r.id.toUpperCase() === trimmedId) || null;
}

export async function createServiceRequest(
  input: Omit<ServiceRequest, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'adminNotes' | 'rejectionReason' | 'nextStepText'>
): Promise<ServiceRequest> {
  await delay(500);
  initStorage();
  const list = await getRequests();
  const newId = generateNextRequestId(list);
  const now = new Date().toISOString();

  const newRequest: ServiceRequest = {
    ...input,
    id: newId,
    status: 'submitted',
    createdAt: now,
    updatedAt: now,
    adminNotes: 'تم استلام طلبك بنجاح وجاري فحصه ومراجعته تجريبياً في نظام يوزرسيف (Demo).',
    nextStepText: 'المراجعة الفنية وتأكيد توفر الخامات قبل بدء الطباعة.',
  };

  const updatedList = [newRequest, ...list];
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updatedList));

  return newRequest;
}

export async function updateRequestStatus(
  id: string,
  newStatus: RequestStatus,
  adminNotes?: string,
  rejectionReason?: string,
  nextStepText?: string
): Promise<ServiceRequest> {
  await delay(350);
  initStorage();
  const list = await getRequests();
  const index = list.findIndex((r) => r.id.toUpperCase() === id.trim().toUpperCase());

  if (index === -1) {
    throw new Error(`الطلب برقم ${id} غير موجود`);
  }

  const existing = list[index];
  const updated: ServiceRequest = {
    ...existing,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
    rejectionReason: rejectionReason !== undefined ? rejectionReason : existing.rejectionReason,
    nextStepText: nextStepText !== undefined ? nextStepText : existing.nextStepText,
  };

  list[index] = updated;
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(list));

  return updated;
}

export async function deleteRequest(id: string): Promise<boolean> {
  await delay(250);
  initStorage();
  const list = await getRequests();
  const filtered = list.filter((r) => r.id.toUpperCase() !== id.trim().toUpperCase());
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(filtered));
  return true;
}

// ==========================================
// 4. CONTACT MESSAGES API
// ==========================================
export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>
): Promise<ContactMessage> {
  await delay(400);
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  const list: ContactMessage[] = raw ? JSON.parse(raw) : [];

  const newMessage: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([newMessage, ...list]));
  return newMessage;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  await delay(250);
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return raw ? JSON.parse(raw) : [];
}

// ==========================================
// 5. HARDCODED DEMO AUTH
// ==========================================
export async function loginAdmin(username: string, password: string): Promise<AdminUser> {
  await delay(450);

  if (
    username.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.username &&
    password.trim() === DEMO_ADMIN_CREDENTIALS.password
  ) {
    const user: AdminUser = {
      username: DEMO_ADMIN_CREDENTIALS.username,
      name: DEMO_ADMIN_CREDENTIALS.name,
      role: 'admin',
      token: `demo-token-${Date.now()}`,
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
    return user;
  }

  throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة (استخدم: admin / demo123)');
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
}

// Helper to reset demo data back to default
export function resetDemoData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEMO_SERVICES));
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEMO_PORTFOLIO));
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_DEMO_REQUESTS));
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
}
