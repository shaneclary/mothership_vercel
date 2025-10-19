import { Meal, MealPackage, Testimonial } from '@/types'

export type { Meal, MealPackage, Testimonial }

export const mockMeals: Meal[] = [
  {
    id: "1",
    name: "Golden Bone Broth",
    description: "Rich, nourishing bone broth with turmeric and ginger",
    longDescription: "Our signature Golden Bone Broth is slow-simmered for 24 hours with organic grass-fed bones, anti-inflammatory turmeric, warming ginger, and healing herbs. Perfect for postpartum recovery and deep nourishment.",
    price: 18,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    category: "broth",
    ingredients: ["Grass-fed beef bones", "Turmeric", "Fresh ginger", "Organic vegetables", "Sea salt", "Black pepper"],
    benefits: ["Supports joint health", "Rich in collagen", "Anti-inflammatory", "Easy to digest", "Boosts immunity"],
    nutritionInfo: {
      calories: 45,
      protein: "8g",
      carbs: "2g", 
      fat: "1g",
      fiber: "0g"
    },
    tags: ["gluten-free", "dairy-free", "paleo", "keto"],
    isPopular: true
  },
  {
    id: "2", 
    name: "Warming Chicken Soup",
    description: "Comforting chicken soup with healing herbs and vegetables",
    longDescription: "A deeply nourishing chicken soup made with free-range chicken, root vegetables, and postpartum-supporting herbs like ginger and nettle. Designed to warm and restore new mothers.",
    price: 22,
    image: "https://images.unsplash.com/photo-1571166234817-8c56d60dda3b?w=400",
    category: "soup",
    ingredients: ["Free-range chicken", "Carrots", "Celery", "Onions", "Fresh herbs", "Ginger", "Sea salt"],
    benefits: ["Protein-rich", "Warming and comforting", "Supports digestion", "Hydrating", "Immune boosting"],
    nutritionInfo: {
      calories: 185,
      protein: "18g",
      carbs: "8g",
      fat: "9g", 
      fiber: "2g"
    },
    tags: ["gluten-free", "dairy-free", "protein-rich"]
  },
  {
    id: "3",
    name: "Nourishing Lentil Dal",
    description: "Spiced red lentil dal with warming postpartum spices",
    longDescription: "A protein-rich dal made with red lentils, turmeric, cumin, and other warming spices traditional to postpartum care. Gentle on digestion while providing sustained energy.",
    price: 20,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    category: "full-meal",
    ingredients: ["Red lentils", "Turmeric", "Cumin", "Ginger", "Coconut oil", "Onions", "Garlic"],
    benefits: ["High in protein", "Easy to digest", "Anti-inflammatory", "Fiber-rich", "Warming spices"],
    nutritionInfo: {
      calories: 220,
      protein: "12g", 
      carbs: "32g",
      fat: "6g",
      fiber: "8g"
    },
    tags: ["vegan", "gluten-free", "high-protein", "fiber-rich"]
  },
  {
    id: "4",
    name: "Healing Vegetable Broth",
    description: "Light, mineral-rich vegetable broth with sea vegetables",
    longDescription: "A delicate vegetable broth packed with minerals from organic vegetables and sea vegetables. Perfect for gentle nutrition during the early postpartum period.",
    price: 16,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    category: "broth",
    ingredients: ["Organic vegetables", "Sea vegetables", "Fresh herbs", "Ginger", "Sea salt"],
    benefits: ["Mineral-rich", "Hydrating", "Gentle on stomach", "Alkalizing", "Light and nourishing"],
    nutritionInfo: {
      calories: 25,
      protein: "2g",
      carbs: "4g",
      fat: "0g",
      fiber: "1g"
    },
    tags: ["vegan", "gluten-free", "low-calorie", "mineral-rich"]
  },
  {
    id: "5",
    name: "Postpartum Power Bowl",
    description: "Complete meal with quinoa, roasted vegetables, and tahini",
    longDescription: "A complete, balanced meal featuring protein-rich quinoa, seasonal roasted vegetables, and creamy tahini dressing. Designed to provide sustained energy for nursing mothers.",
    price: 26,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", 
    category: "full-meal",
    ingredients: ["Quinoa", "Sweet potato", "Kale", "Chickpeas", "Tahini", "Lemon", "Olive oil"],
    benefits: ["Complete protein", "High in iron", "Nutrient-dense", "Sustained energy", "Fiber-rich"],
    nutritionInfo: {
      calories: 340,
      protein: "14g",
      carbs: "42g", 
      fat: "14g",
      fiber: "8g"
    },
    tags: ["vegan", "gluten-free", "high-protein", "iron-rich"],
    isPopular: true
  },
  {
    id: "6",
    name: "Coconut Curry Stew", 
    description: "Warming curry stew with coconut milk and root vegetables",
    longDescription: "A warming, creamy stew made with coconut milk, root vegetables, and gentle spices. Provides healthy fats essential for hormone production and brain health.",
    price: 24,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
    category: "full-meal", 
    ingredients: ["Coconut milk", "Sweet potatoes", "Carrots", "Spinach", "Ginger", "Turmeric", "Chickpeas"],
    benefits: ["Healthy fats", "Anti-inflammatory", "Warming spices", "Nutrient-dense", "Satisfying"],
    nutritionInfo: {
      calories: 280,
      protein: "8g",
      carbs: "28g",
      fat: "16g",
      fiber: "6g"
    },
    tags: ["vegan", "gluten-free", "anti-inflammatory", "healthy-fats"]
  },
  {
    id: "7",
    name: "Warming Ginger Tea Broth",
    description: "Soothing ginger and lemon broth with healing herbs",
    longDescription: "A warming, caffeine-free herbal broth made with fresh ginger, lemon, and traditional postpartum herbs like red raspberry leaf. Perfect for hydration and digestive support.",
    price: 14,
    image: "https://images.unsplash.com/photo-1571919743851-2c4b21777db0?w=400",
    category: "broth",
    ingredients: ["Fresh ginger", "Lemon", "Red raspberry leaf", "Nettle leaf", "Raw honey", "Sea salt"],
    benefits: ["Digestive support", "Hydrating", "Anti-nausea", "Warming", "Hormone supporting"],
    nutritionInfo: {
      calories: 20,
      protein: "1g",
      carbs: "5g",
      fat: "0g",
      fiber: "0g"
    },
    tags: ["caffeine-free", "digestive", "hydrating", "warming"]
  },
  {
    id: "8",
    name: "Slow-Cooked Beef Stew",
    description: "Tender beef stew with root vegetables and healing spices",
    longDescription: "A deeply nourishing beef stew made with grass-fed beef, root vegetables, and warming spices. Slow-cooked for maximum nutrient absorption and comfort.",
    price: 28,
    image: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400",
    category: "full-meal",
    ingredients: ["Grass-fed beef", "Sweet potatoes", "Carrots", "Onions", "Thyme", "Bay leaves", "Bone broth"],
    benefits: ["High in protein", "Iron-rich", "Warming", "Satisfying", "Nutrient-dense"],
    nutritionInfo: {
      calories: 320,
      protein: "28g",
      carbs: "18g",
      fat: "16g",
      fiber: "4g"
    },
    tags: ["high-protein", "iron-rich", "gluten-free", "warming"]
  },
  {
    id: "9",
    name: "Creamy Butternut Squash Soup",
    description: "Velvety butternut squash soup with coconut cream",
    longDescription: "A creamy, comforting soup made with roasted butternut squash, coconut cream, and warming spices. Rich in vitamin A and beta-carotene for immune support.",
    price: 21,
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400",
    category: "soup",
    ingredients: ["Butternut squash", "Coconut cream", "Ginger", "Nutmeg", "Sage", "Vegetable broth"],
    benefits: ["High in vitamin A", "Immune supporting", "Creamy comfort", "Anti-inflammatory", "Easy to digest"],
    nutritionInfo: {
      calories: 160,
      protein: "4g",
      carbs: "24g",
      fat: "8g",
      fiber: "6g"
    },
    tags: ["vegan", "gluten-free", "vitamin-rich", "comforting"]
  },
  {
    id: "10",
    name: "Sesame Ginger Salmon Bowl",
    description: "Wild salmon with sesame quinoa and steamed greens",
    longDescription: "Wild-caught salmon served over sesame quinoa with steamed bok choy and snap peas. Rich in omega-3 fatty acids essential for postpartum brain health.",
    price: 32,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    category: "full-meal",
    ingredients: ["Wild salmon", "Quinoa", "Sesame oil", "Bok choy", "Snap peas", "Ginger", "Tamari"],
    benefits: ["High in omega-3s", "Brain health", "Anti-inflammatory", "Protein-rich", "Heart healthy"],
    nutritionInfo: {
      calories: 380,
      protein: "32g",
      carbs: "28g",
      fat: "18g",
      fiber: "5g"
    },
    tags: ["omega-3", "brain-food", "high-protein", "gluten-free"]
  },
  {
    id: "11",
    name: "Traditional Congee",
    description: "Healing rice porridge with ginger and scallions",
    longDescription: "A traditional postpartum healing food - rice slowly cooked into a creamy porridge with ginger, scallions, and sesame oil. Gentle on digestion and deeply nourishing.",
    price: 18,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    category: "full-meal",
    ingredients: ["Jasmine rice", "Ginger", "Scallions", "Sesame oil", "Sea salt", "White pepper"],
    benefits: ["Easy to digest", "Traditional healing", "Gentle on stomach", "Warming", "Comforting"],
    nutritionInfo: {
      calories: 180,
      protein: "4g",
      carbs: "36g",
      fat: "3g",
      fiber: "1g"
    },
    tags: ["traditional", "easy-digest", "warming", "gluten-free"]
  },
  {
    id: "12",
    name: "Miso Mushroom Soup",
    description: "Umami-rich miso soup with shiitake mushrooms",
    longDescription: "A nourishing miso soup made with shiitake mushrooms, wakame seaweed, and soft tofu. Rich in probiotics and minerals for gut health and recovery.",
    price: 19,
    image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=400",
    category: "soup",
    ingredients: ["White miso", "Shiitake mushrooms", "Wakame seaweed", "Silken tofu", "Scallions", "Dashi"],
    benefits: ["Probiotic-rich", "Mineral-dense", "Gut health", "Immune supporting", "Light and nourishing"],
    nutritionInfo: {
      calories: 95,
      protein: "8g",
      carbs: "12g",
      fat: "2g",
      fiber: "3g"
    },
    tags: ["probiotic", "mineral-rich", "gut-health", "light"]
  }
]

export const mockMealPackages: MealPackage[] = [
  // Weekly Plans
  {
    id: "pkg-weekly-1",
    name: "Weekly Starter",
    description: "5 meals per week - Great for beginners",
    longDescription: "Perfect for new mothers who want to supplement their routine with nourishing postpartum meals. Get 5 meals delivered weekly with 12% savings.",
    meals: ["1", "2", "3", "4", "5"],
    price: 110,
    originalPrice: 125,
    image: "/images/food/Healthy_Postpartum_Freezer_Meals.webp",
    duration: "Weekly",
    mealCount: 5,
    benefits: ["12% savings", "Weekly delivery", "Flexible plan", "Quality nutrition", "Skip or modify anytime"],
    tags: ["weekly", "starter", "flexible"],
    customizable: true
  },
  {
    id: "pkg-weekly-2",
    name: "Weekly Essential",
    description: "8 meals per week - Balanced support",
    longDescription: "A balanced weekly plan with 8 diverse, nourishing meals. Perfect for consistent support throughout the week with 15% savings.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8"],
    price: 170,
    originalPrice: 200,
    image: "/images/food/postpartum-freezer-meals-pesto-roasted-vegetarian-breakfast-burritos-recipe.webp",
    duration: "Weekly",
    mealCount: 8,
    benefits: ["15% savings", "Best value", "Complete variety", "Priority support", "Lactation-friendly"],
    tags: ["weekly", "essential", "best-value"],
    customizable: true
  },
  {
    id: "pkg-weekly-3",
    name: "Weekly Premium",
    description: "13 meals per week - Maximum weekly support",
    longDescription: "Our premium weekly subscription provides comprehensive meal support with 13 wholesome meals. Enjoy maximum 18% savings and VIP member perks.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1"],
    price: 266,
    originalPrice: 325,
    image: "/images/food/freezer-meals-for-new-moms_6.webp",
    duration: "Weekly",
    mealCount: 13,
    benefits: ["18% savings", "Complete coverage", "VIP support", "Maximum variety", "Free delivery"],
    tags: ["weekly", "premium", "max-value"],
    customizable: true
  },
  // Monthly Plans
  {
    id: "pkg-monthly-1",
    name: "Monthly Starter",
    description: "20 meals per month - Perfect for light support",
    longDescription: "Our foundational monthly plan provides 20 carefully curated meals delivered to your door. Ideal for supplementing your routine with nourishing postpartum meals while maintaining flexibility. Save 12% with this convenient monthly subscription.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    price: 352,
    originalPrice: 400,
    image: "/images/food/Healthy_Postpartum_Freezer_Meals.webp",
    duration: "Monthly",
    mealCount: 20,
    benefits: ["12% savings", "Monthly delivery", "Flexible plan", "Quality nutrition", "Skip or modify anytime"],
    tags: ["monthly", "starter", "flexible"],
    customizable: true
  },
  {
    id: "pkg-monthly-2",
    name: "Monthly Essential",
    description: "32 meals per month - Most popular choice",
    longDescription: "Our most popular monthly subscription delivers 32 diverse, nourishing meals right to your door. Perfect for new mothers who want consistent support throughout the month. Enjoy 15% savings and priority member benefits with this balanced plan.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8"],
    price: 544,
    originalPrice: 640,
    image: "/images/food/postpartum-freezer-meals-pesto-roasted-vegetarian-breakfast-burritos-recipe.webp",
    duration: "Monthly",
    mealCount: 32,
    benefits: ["15% savings", "Best value", "Complete variety", "Priority support", "Lactation-friendly", "Most popular"],
    tags: ["monthly", "popular", "best-value", "complete"],
    isPopular: true,
    customizable: true
  },
  {
    id: "pkg-monthly-3",
    name: "Monthly Premium",
    description: "48 meals per month - Maximum nourishment",
    longDescription: "Our premium monthly subscription provides complete meal support with 48 wholesome meals delivered monthly. Perfect for mothers who want comprehensive postpartum nourishment without the stress of meal planning. Enjoy maximum 18% savings and VIP member perks.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    price: 788,
    originalPrice: 960,
    image: "/images/food/freezer-meals-for-new-moms_6.webp",
    duration: "Monthly",
    mealCount: 48,
    benefits: ["18% maximum savings", "Complete meal coverage", "VIP support", "Maximum variety", "Free delivery", "Concierge service"],
    tags: ["monthly", "ultimate", "premium", "max-value"],
    customizable: true
  }
]

export const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    quote: "Mothership made my postpartum recovery so much easier. The meals were exactly what my body needed.",
    title: "New Mom"
  },
  {
    id: "2", 
    name: "Dr. Lisa Chen",
    quote: "I recommend Mothership to all my postpartum clients. The nutrition is perfectly designed for recovery.",
    title: "Registered Dietitian"
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    quote: "Having nourishing meals ready in my freezer was a lifesaver during those first few weeks with baby.",
    title: "Mother of Two"
  },
  {
    id: "4",
    name: "Emily K.",
    quote: "The broths were so healing and comforting. I felt supported and nourished during such a vulnerable time.",
    title: "New Mom"
  }
]

