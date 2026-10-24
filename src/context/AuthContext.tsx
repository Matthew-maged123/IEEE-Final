import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, AdminUser } from '../lib/types';
import { DEMO_ADMIN_CREDENTIALS } from '../lib/mock-data';

interface StoredUserRecord extends User {
  password?: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  USER: 'yuzersef_auth_user_v1',
  TOKEN: 'yuzersef_auth_token_v1',
  USERS_DB: 'yuzersef_registered_users_v1',
  ADMIN_SESSION: 'yuzersef_admin_session_v2',
};

// Default seed demo users for mock/offline fallback
const SEED_USERS: StoredUserRecord[] = [
  {
    id: 'user-demo-customer',
    name: 'أحمد الشريف',
    email: 'ahmed@yuzersef.com',
    phone: '01012345678',
    password: 'demo123',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-demo-admin',
    name: DEMO_ADMIN_CREDENTIALS.name,
    email: 'admin@yuzersef.com',
    phone: '01116891025',
    password: DEMO_ADMIN_CREDENTIALS.password,
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

function getStoredUsers(): StoredUserRecord[] {
  if (typeof window === 'undefined') return SEED_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

function saveStoredUsers(users: StoredUserRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  } catch {
    // ignore
  }
}

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    try {
      // 1. Check user token & profile in local storage
      const savedUserStr = localStorage.getItem(STORAGE_KEYS.USER);
      const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const adminSessionStr = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);

      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr);
        setUser(parsedUser);
        setToken(savedToken || 'stored-token');
      } else if (adminSessionStr) {
        // Fallback sync with Admin session if present
        try {
          const adminUser: AdminUser = JSON.parse(adminSessionStr);
          const synchedUser: User = {
            id: 'admin-id',
            name: adminUser.name,
            email: 'admin@yuzersef.com',
            phone: '01116891025',
            role: 'admin',
          };
          setUser(synchedUser);
          setToken(adminUser.token);
        } catch {
          // ignore
        }
      }

      // Seed local storage DB if empty
      getStoredUsers();
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = useCallback((newUser: User, sessionToken: string) => {
    setUser(newUser);
    setToken(sessionToken);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.TOKEN, sessionToken);

      // Sync with admin session if admin
      if (newUser.role === 'admin') {
        const adminData: AdminUser = {
          username: 'admin',
          name: newUser.name,
          role: 'admin',
          token: sessionToken,
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminData));
      }
    } catch {
      // ignore
    }
  }, []);

  // 1. LOGIN
  const login = async (identifier: string, pass: string): Promise<User> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    // First attempt: Call real backend API if reachable
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      // Determine if identifier is an email
      const isEmail = cleanId.includes('@');
      const payloadEmail = isEmail ? cleanId : cleanId === 'admin' ? 'admin@yuzersef.com' : cleanId;

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: payloadEmail, password: cleanPass }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const body = await res.json();
        if (body.success && body.data?.user) {
          const apiUser = body.data.user;
          const normalizedUser: User = {
            id: apiUser._id || apiUser.id || `u-${Date.now()}`,
            name: apiUser.name,
            email: apiUser.email,
            phone: apiUser.phone || '',
            role: (apiUser.role as UserRole) || 'customer',
          };
          const receivedToken = body.data.token || `token-${Date.now()}`;
          saveSession(normalizedUser, receivedToken);
          return normalizedUser;
        }
      } else if (res.status === 401 || res.status === 403 || res.status === 400) {
        // Backend actively rejected credentials
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || 'بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور');
      }
    } catch (networkOrApiErr: any) {
      // If error is an active reject from server, rethrow
      if (networkOrApiErr.message && networkOrApiErr.message.includes('بيانات الدخول')) {
        throw networkOrApiErr;
      }
      // Otherwise, backend is likely offline or unreachable -> seamless fallback to local mock store
    }

    // Fallback: Check local store
    await new Promise((resolve) => setTimeout(resolve, 350));
    const allUsers = getStoredUsers();

    // Check admin shorthand (username: admin / password: demo123)
    if (
      (cleanId === DEMO_ADMIN_CREDENTIALS.username.toLowerCase() || cleanId === 'admin@yuzersef.com') &&
      cleanPass === DEMO_ADMIN_CREDENTIALS.password
    ) {
      const adminUser: User = {
        id: 'admin-001',
        name: DEMO_ADMIN_CREDENTIALS.name,
        email: 'admin@yuzersef.com',
        phone: '01116891025',
        role: 'admin',
      };
      const demoToken = `jwt-admin-${Date.now()}`;
      saveSession(adminUser, demoToken);
      return adminUser;
    }

    // Match by email or phone
    const matched = allUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanId || u.phone === cleanId) &&
        u.password === cleanPass
    );

    if (matched) {
      const customerUser: User = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        phone: matched.phone,
        role: matched.role || 'customer',
        createdAt: matched.createdAt,
      };
      const demoToken = `jwt-mock-${Date.now()}`;
      saveSession(customerUser, demoToken);
      return customerUser;
    }

    throw new Error('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور');
  };

  // 2. REGISTER
  const register = async (data: RegisterData): Promise<User> => {
    const cleanName = data.name.trim();
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim();
    const cleanPassword = data.password.trim();

    // Try backend API first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          password: cleanPassword,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const body = await res.json();
        if (body.success && body.data?.user) {
          const apiUser = body.data.user;
          const normalizedUser: User = {
            id: apiUser._id || apiUser.id || `u-${Date.now()}`,
            name: apiUser.name,
            email: apiUser.email,
            phone: apiUser.phone || cleanPhone,
            role: (apiUser.role as UserRole) || 'customer',
          };
          const receivedToken = body.data.token || `token-${Date.now()}`;
          saveSession(normalizedUser, receivedToken);
          return normalizedUser;
        }
      } else if (res.status === 409 || res.status === 400) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || 'البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول');
      }
    } catch (networkOrApiErr: any) {
      if (networkOrApiErr.message && (networkOrApiErr.message.includes('مسجل بالفعل') || networkOrApiErr.message.includes('صحيح'))) {
        throw networkOrApiErr;
      }
      // Backend offline -> seamless fallback
    }

    // Fallback: Local database
    await new Promise((resolve) => setTimeout(resolve, 400));
    const allUsers = getStoredUsers();

    // Check if email already registered
    const exists = allUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      throw new Error('البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول بدلاً من ذلك');
    }

    const newUserRecord: StoredUserRecord = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: cleanPassword,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    saveStoredUsers([newUserRecord, ...allUsers]);

    const activeUser: User = {
      id: newUserRecord.id,
      name: newUserRecord.name,
      email: newUserRecord.email,
      phone: newUserRecord.phone,
      role: newUserRecord.role,
      createdAt: newUserRecord.createdAt,
    };

    const sessionToken = `jwt-mock-register-${Date.now()}`;
    saveSession(activeUser, sessionToken);
    return activeUser;
  };

  // 3. LOGOUT
  const logout = () => {
    // Attempt backend logout
    fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});

    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch {
      // ignore
    }
  };

  // 4. UPDATE PROFILE
  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    if (!user) throw new Error('لا يوجد مستخدم مسجل');

    const updatedUser: User = { ...user, ...updates };
    setUser(updatedUser);

    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      const allUsers = getStoredUsers().map((u) => (u.id === user.id ? { ...u, ...updates } : u));
      saveStoredUsers(allUsers);
    } catch {
      // ignore
    }

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
