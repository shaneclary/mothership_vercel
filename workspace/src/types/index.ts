export interface Meal {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: "soup" | "broth" | "full-meal";
  ingredients: string[];
  benefits: string[];
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  tags: string[];
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  meals: string[]; // meal IDs
  price: number;
  image: string;
  duration: string;
}

export interface MealPackage {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  meals: string[]; // meal IDs
  price: number;
  originalPrice: number; // for showing discounts
  image: string;
  duration: string; // e.g., "7 days", "14 days"
  mealCount: number;
  benefits: string[];
  tags: string[];
  isPopular?: boolean;
  customizable?: boolean;
  mealQuantities?: Record<string, number>;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  title?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export type RootStackParamList = {
  Main: undefined;
  HowItWorks: undefined;
  ProductDetail: { mealId: string };
  PackageDetail: { packageId: string };
  GiftCard: undefined;
  Cart: undefined;
};

export type TabParamList = {
  Home: undefined;
  Shop: undefined;
  Packages: undefined;
  About: undefined;
  Contact: undefined;
};