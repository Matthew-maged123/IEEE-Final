export type ProductType = 'tshirt' | 'hoodie' | 'cap' | 'mug' | 'case';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  border?: boolean;
}

export interface ProductView {
  id: string;
  label: string;
}

export interface OverlayAnchor {
  x: number;     // horizontal position (percentage 0-100)
  y: number;     // vertical position (percentage 0-100)
  width: number; // width relative to product box (percentage 0-100)
}

export interface ProductItem {
  id: ProductType;
  name: string;
  subtitle: string;
  serviceId: string;
  colors: ProductColor[];
  views: ProductView[];
  defaultColor: string;
  defaultView: string;
  hasTurntable?: boolean;
  turntableAngles?: number[];
  overlayAnchors: Record<string, OverlayAnchor>;
}

export const COMMON_COLORS: Record<string, ProductColor> = {
  white: { id: 'white', name: 'أبيض', hex: '#FFFFFF', border: true },
  black: { id: 'black', name: 'أسود', hex: '#18181B' },
  grey: { id: 'grey', name: 'رمادي', hex: '#9CA3AF' },
  green: { id: 'green', name: 'أخضر يوزرسيف', hex: '#065E5A' },
  cream: { id: 'cream', name: 'بيج كريمي', hex: '#E2DBD2' },
};

export const TURNTABLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Returns the transparent logo file path based on the base colour.
 * - logo-white.png on dark/vibrant colors: black, grey, deep green
 * - logo-green.png on light colors: white and cream
 */
export function getLogoOverlayPath(colorId: string): string {
  if (colorId === 'white' || colorId === 'cream') {
    return '/logo/logo-green.png';
  }
  return '/logo/logo-white.png';
}

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'tshirt',
    name: 'تيشرت تجريبي (Demo T-Shirt)',
    subtitle: 'معاينة تصميم وطباعة تجريبية',
    serviceId: 'clothing-hoodies',
    colors: [
      COMMON_COLORS.white,
      COMMON_COLORS.black,
      COMMON_COLORS.grey,
      COMMON_COLORS.green,
      COMMON_COLORS.cream,
    ],
    views: [
      { id: 'front', label: 'الواجهة الأمامية' },
      { id: 'back', label: 'الجهة الخلفية' },
    ],
    defaultColor: 'white',
    defaultView: 'front',
    // Realistic chest print proportions (24% of canvas, perfectly centered on chest)
    overlayAnchors: {
      front: { x: 50, y: 40, width: 24 },
      back: { x: 50, y: 40, width: 24 },
    },
  },
  {
    id: 'hoodie',
    name: 'هودي تجريبي (Demo Hoodie)',
    subtitle: 'معاينة تصميم وطباعة تجريبية',
    serviceId: 'clothing-hoodies',
    colors: [
      COMMON_COLORS.black,
      COMMON_COLORS.white,
      COMMON_COLORS.grey,
      COMMON_COLORS.green,
      COMMON_COLORS.cream,
    ],
    views: [
      { id: 'front', label: 'الواجهة الأمامية' },
      { id: 'back', label: 'الجهة الخلفية' },
    ],
    defaultColor: 'black',
    defaultView: 'front',
    // Proportional chest print (23% width, top: 42% between drawstring cords)
    overlayAnchors: {
      front: { x: 50, y: 42, width: 23 },
      back: { x: 50, y: 42, width: 23 },
    },
  },
  {
    id: 'cap',
    name: 'كاب تجريبي (Demo Cap)',
    subtitle: 'معاينة تصميم وطباعة تجريبية',
    serviceId: 'caps-embroidery',
    colors: [
      COMMON_COLORS.black,
      COMMON_COLORS.white,
      COMMON_COLORS.green,
      COMMON_COLORS.grey,
      COMMON_COLORS.cream,
    ],
    views: [
      { id: 'front', label: 'الواجهة الأمامية' },
      { id: 'side', label: 'المنظور الجانبي' },
    ],
    defaultColor: 'black',
    defaultView: 'front',
    // Accurate cap forehead patch (19% width, top: 48%)
    overlayAnchors: {
      front: { x: 50, y: 48, width: 19 },
      side: { x: 44, y: 48, width: 16 },
    },
  },
  {
    id: 'mug',
    name: 'مج تجريبي (Demo Mug)',
    subtitle: 'معاينة تصميم وطباعة تجريبية 360°',
    serviceId: 'mugs-promotional-gifts',
    colors: [
      COMMON_COLORS.white,
      COMMON_COLORS.black,
      COMMON_COLORS.green,
      COMMON_COLORS.grey,
      COMMON_COLORS.cream,
    ],
    views: [
      { id: 'front', label: 'العرض الأساسي' },
    ],
    defaultColor: 'white',
    defaultView: 'front',
    hasTurntable: true,
    turntableAngles: TURNTABLE_ANGLES,
    overlayAnchors: {
      front: { x: 48, y: 48, width: 22 },
    },
  },
  {
    id: 'case',
    name: 'جراب هاتف تجريبي (Demo Case)',
    subtitle: 'معاينة تصميم وطباعة تجريبية',
    serviceId: 'phone-cases',
    colors: [
      COMMON_COLORS.black,
      COMMON_COLORS.white,
      COMMON_COLORS.green,
      COMMON_COLORS.grey,
      COMMON_COLORS.cream,
    ],
    views: [
      { id: 'back', label: 'ظهر الجراب' },
    ],
    defaultColor: 'black',
    defaultView: 'back',
    // STRICT FIX: iPhone/Phone case back logo is properly scaled (15% width, y: 58%) so it never exceeds the phone edges!
    overlayAnchors: {
      back: { x: 50, y: 58, width: 15 },
    },
  },
];

/**
 * Returns the exact image path in public/products
 */
export function getProductImagePath(
  productId: ProductType,
  color: string,
  view: string,
  angle: number = 0
): string {
  if (productId === 'tshirt') {
    return `/products/tshirt-${color}-${view}.png`;
  }
  if (productId === 'hoodie') {
    return `/products/hoodie-${color}-${view}.png`;
  }
  if (productId === 'cap') {
    return `/products/cap-${color}-${view}.png`;
  }
  if (productId === 'mug') {
    if (color === 'white') {
      const safeAngle = TURNTABLE_ANGLES.includes(angle) ? angle : 0;
      return `/products/mug-white-${safeAngle}.png`;
    }
    return `/products/mug-${color}.png`;
  }
  if (productId === 'case') {
    return `/products/case-${color}-back.png`;
  }
  return `/products/tshirt-white-front.png`;
}

export function getProductsForService(serviceId: string): ProductItem[] {
  const matched = PRODUCTS_LIST.filter((p) => p.serviceId === serviceId);
  if (matched.length > 0) return matched;
  return PRODUCTS_LIST;
}

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS_LIST.find((p) => p.id === id);
}
