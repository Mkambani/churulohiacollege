export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  type: 'image' | 'video';
  category: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Beauty';
