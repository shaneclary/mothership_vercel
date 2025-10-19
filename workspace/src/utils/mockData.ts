import { Meal, MealPackage, Testimonial, BlogPost } from "../types";

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
    tags: ["gluten-free", "dairy-free", "paleo", "keto"]
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
    tags: ["vegan", "gluten-free", "high-protein", "iron-rich"]
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
];

export const mockMealPackages: MealPackage[] = [
  {
    id: "pkg-1",
    name: "Starter Recovery Plan",
    description: "Perfect introduction to postpartum nourishment for new mothers",
    longDescription: "Our gentle introduction package designed for the first weeks postpartum. Includes warming broths, easy-to-digest soups, and comforting meals to support your initial recovery journey. Each meal is crafted with healing ingredients and traditional postpartum wisdom.",
    meals: ["1", "2", "4", "7", "9"], // Golden Bone Broth, Warming Chicken Soup, Healing Vegetable Broth, Warming Ginger Tea Broth, Butternut Squash Soup
    price: 85,
    originalPrice: 95,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600",
    duration: "5 days",
    mealCount: 5,
    benefits: ["Gentle on digestion", "Traditional healing foods", "Anti-inflammatory ingredients", "Easy preparation", "Perfect for first weeks"],
    tags: ["starter", "gentle", "traditional", "beginner-friendly"],
    isPopular: false,
    customizable: true
  },
  {
    id: "pkg-2", 
    name: "Full Healing Journey",
    description: "Complete 14-day postpartum recovery program with diverse nourishing meals",
    longDescription: "Our most comprehensive package designed to support your entire early postpartum period. Features a carefully curated selection of broths, soups, and full meals that progress from gentle healing foods to more substantial nourishment as your body recovers. Includes lactation-supporting ingredients and hormone-balancing nutrients.",
    meals: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // All meals
    price: 245,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    duration: "14 days", 
    mealCount: 12,
    benefits: ["Complete nutrition support", "Lactation-friendly", "Hormone balancing", "Progressive recovery", "Maximum variety", "Best value"],
    tags: ["comprehensive", "complete", "best-value", "hormone-support"],
    isPopular: true,
    customizable: true
  },
  {
    id: "pkg-3",
    name: "Nourish & Lactation Support", 
    description: "Specialized meals to support healthy breastfeeding and milk production",
    longDescription: "Thoughtfully designed for breastfeeding mothers, this package focuses on galactagogue foods and nutrients essential for healthy milk production. Rich in healthy fats, protein, and traditional lactation-supporting ingredients like oats, sesame, and leafy greens.",
    meals: ["1", "5", "6", "8", "10", "11", "12"], // Focus on protein, healthy fats, and lactation support
    price: 165,
    originalPrice: 185,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600",
    duration: "7 days",
    mealCount: 7,
    benefits: ["Lactation support", "Healthy fats for milk quality", "High protein content", "Galactagogue ingredients", "Energy sustaining"],
    tags: ["lactation", "breastfeeding", "protein-rich", "healthy-fats"],
    isPopular: false,
    customizable: true
  },
  {
    id: "pkg-4",
    name: "Build Your Own Package",
    description: "Create a custom meal package tailored to your specific needs and preferences", 
    longDescription: "Design your perfect postpartum meal package by selecting from our complete menu of nourishing meals. Choose your favorites, accommodate dietary restrictions, and create the ideal support for your unique recovery journey. Minimum 5 meals required.",
    meals: [], // Will be populated by user selection
    price: 0, // Will be calculated based on selections
    originalPrice: 0,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    duration: "Custom",
    mealCount: 0, // Will be set by user
    benefits: ["Fully customizable", "Dietary accommodations", "Personal preferences", "Flexible quantity", "Your perfect mix"],
    tags: ["customizable", "flexible", "personalized", "build-your-own"],
    isPopular: false,
    customizable: true
  }
];

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
];

export const mockPackageTestimonials: Testimonial[] = [
  {
    id: "pkg-t1",
    name: "Jessica L.",
    quote: "The Starter Recovery Plan was exactly what I needed those first overwhelming weeks. Having nourishing meals ready made all the difference.",
    title: "First-time Mom"
  },
  {
    id: "pkg-t2", 
    name: "Dr. Sarah Kim",
    quote: "I recommend the Full Healing Journey to all my postpartum clients. The progression from gentle foods to more substantial meals supports natural recovery.",
    title: "Postpartum Doula"
  },
  {
    id: "pkg-t3",
    name: "Amanda R.",
    quote: "The Lactation Support package helped boost my milk supply naturally. The meals were delicious and I felt so much more energized.",
    title: "Breastfeeding Mom of Twins"
  },
  {
    id: "pkg-t4",
    name: "Taylor M.",
    quote: "Being able to customize my own package was perfect. I could avoid foods I did not like while still getting all the nutrition I needed.",
    title: "Mom with Dietary Restrictions"
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The First 40 Days: Ancient Wisdom for Modern Mothers",
    excerpt: "Discover the traditional postpartum practices that inspired our meal philosophy",
    content: "The concept of the 'first 40 days' appears in cultures worldwide...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    date: "2024-03-15",
    category: "Postpartum Care",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Nourishing Foods for Breastfeeding Mothers",
    excerpt: "Essential nutrients and foods to support healthy milk production",
    content: "Breastfeeding requires additional calories and specific nutrients...",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    date: "2024-03-10", 
    category: "Nutrition",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Creating Your Postpartum Support Village",
    excerpt: "How to build the community support you need during recovery",
    content: "The phrase 'it takes a village' is especially true for new mothers...",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", 
    date: "2024-03-05",
    category: "Support",
    readTime: "6 min read"
  }
];