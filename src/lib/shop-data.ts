export type ProductCategory =
  | 'tshirts'
  | 'hoodies'
  | 'caps'
  | 'mugs'
  | 'cases'
  | 'stickers';

export interface ShopProductSize {
  label: string;
  available: boolean;
}

export interface ShopProductColor {
  id: string;
  name: string;
  hex: string;
  border?: boolean;
}

export interface ShopProductVariant {
  colorId: string;   // matches ShopProductColor.id
  images: string[];  // images specific to this color
  sizes?: ShopProductSize[]; // sizes specific to this color (if different per color)
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  images?: string[];
  colors?: ShopProductColor[];
  sizes?: ShopProductSize[];
  description?: string;
  badge?: string;
  isNew?: boolean;
  inStock?: boolean;
  variants?: ShopProductVariant[];
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'short-black-oversize',
    name: 'تيشرت أوفر سايز أسود',
    price: 180,
    category: 'tshirts',
    imageUrl: '/products/tshirt-black-front.png',
    images: [
      '/products/tshirt-black-front.png',
      '/products/tshirt-black-back.png',
    ],
    colors: [
      { id: 'black', name: 'أسود', hex: '#18181B' },
      { id: 'grey', name: 'رمادي', hex: '#9CA3AF' },
    ],
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    variants: [
      {
        colorId: 'black',
        images: ['/products/tshirt-black-front.png', '/products/tshirt-black-back.png'],
      },
      {
        colorId: 'grey',
        images: ['/products/tshirt-grey-front.png', '/products/tshirt-grey-back.png'],
      },
    ],
    description: 'تيشرت أوفر سايز بقماش قطني فاخر بلون أسود كلاسيكي.',
    badge: 'الأكثر مبيعاً',
    isNew: false,
    inStock: true,
  },
  {
    id: 'short-grey-oversize',
    name: 'تيشرت أوفر سايز رمادي',
    price: 180,
    category: 'tshirts',
    imageUrl: '/products/tshirt-grey-front.png',
    images: [
      '/products/tshirt-grey-front.png',
      '/products/tshirt-grey-back.png',
    ],
    colors: [
      { id: 'black', name: 'أسود', hex: '#18181B' },
      { id: 'grey', name: 'رمادي', hex: '#9CA3AF' },
    ],
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    variants: [
      {
        colorId: 'black',
        images: ['/products/tshirt-black-front.png', '/products/tshirt-black-back.png'],
      },
      {
        colorId: 'grey',
        images: ['/products/tshirt-grey-front.png', '/products/tshirt-grey-back.png'],
      },
    ],
    description: 'تيشرت أوفر سايز بقماش قطني فاخر بلون رمادي عصري.',
    isNew: true,
    inStock: true,
  },
];

export function getShopProductById(id: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.id === id);
}
