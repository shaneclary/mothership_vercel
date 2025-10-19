import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAppStore } from "../state/appStore";
import { mockMealPackages, mockMeals } from "../utils/mockData";


const DISCOUNT_TIERS = [
  { qty: 8, off: 33 },
  { qty: 12, off: 96 },
  { qty: 16, off: 198 },
  { qty: 22, off: 300 },
];

export default function PackageDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { packageId } = route.params;
  const addPackageToCart = useAppStore(state => state.addPackageToCart);

  const packageData = mockMealPackages.find(pkg => pkg.id === packageId);

  const [mealQuantities, setMealQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    mockMeals.forEach(m => {
      init[m.id] = 0;
    });
    return init;
  });

  if (!packageData) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <Text className="text-charcoal text-lg">Package not found</Text>
      </SafeAreaView>
    );
  }

  const isCustomPackage = packageId === "pkg-4";
  const packageMeals = packageData.meals
    .map(mealId => mockMeals.find(meal => meal.id === mealId))
    .filter(Boolean);

  const increment = (mealId: string) => {
    setMealQuantities(prev => ({ ...prev, [mealId]: (prev[mealId] || 0) + 1 }));
  };

  const decrement = (mealId: string) => {
    setMealQuantities(prev => ({ ...prev, [mealId]: Math.max(0, (prev[mealId] || 0) - 1) }));
  };

  const { items, subtotal } = useMemo(() => {
    let itemsCount = 0;
    let sub = 0;
    for (const m of mockMeals) {
      const q = mealQuantities[m.id] || 0;
      itemsCount += q;
      sub += q * m.price;
    }
    return { items: itemsCount, subtotal: sub };
  }, [mealQuantities]);

  const discount = useMemo(() => {
    let off = 0;
    for (const tier of DISCOUNT_TIERS) {
      if (items >= tier.qty) off = tier.off;
    }
    return off;
  }, [items]);

  const total = Math.max(0, subtotal - discount);

  const nextTier = useMemo(() => {
    for (const tier of DISCOUNT_TIERS) {
      if (items < tier.qty) {
        return { nextQty: tier.qty, needed: tier.qty - items, nextOff: tier.off };
      }
    }
    return null;
  }, [items]);

  const progress = useMemo(() => {
    if (!nextTier) return 1;
    const prevTierQty = DISCOUNT_TIERS.reduce((acc, t) => (t.qty < nextTier.nextQty ? t.qty : acc), 0);
    const span = nextTier.nextQty - prevTierQty;
    const within = Math.max(0, Math.min(items - prevTierQty, span));
    return span === 0 ? 1 : within / span;
  }, [items, nextTier]);

  const scrollFrame = useRef<number | null>(null);
  const [viewportH, setViewportH] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [builderY, setBuilderY] = useState(0);
  const [builderH, setBuilderH] = useState(0);

  const isBuilderVisible = useMemo(() => {
    const top = scrollY;
    const bottom = scrollY + viewportH;
    const bTop = builderY;
    const bBottom = builderY + builderH;
    // visible if ranges overlap
    return !(bottom < bTop || top > bBottom);
  }, [scrollY, viewportH, builderY, builderH]);

  const handleAddToCart = () => {
    if (isCustomPackage) {
      if (items === 0) return;

      const nonZeroIds = Object.keys(mealQuantities).filter(id => (mealQuantities[id] || 0) > 0);

      addPackageToCart({
        id: `${packageData.id}-custom-${Date.now()}`,
        name: `Custom Bundle (${items} meals)`,
        price: Math.round(total),
        image: packageData.image,
        description: "Your personalized meal selection",
        meals: nonZeroIds,
        mealCount: items,
        mealQuantities,
      });
    } else {
      addPackageToCart({
        id: packageData.id,
        name: packageData.name,
        price: packageData.price,
        image: packageData.image,
        description: packageData.description,
        meals: packageData.meals,
        mealCount: packageData.mealCount,
      });
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" onLayout={(e) => setViewportH(e.nativeEvent.layout.height)}>
      <ScrollView
        automaticallyAdjustContentInsets={true}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          if (!scrollFrame.current) {
            scrollFrame.current = requestAnimationFrame(() => {
              setScrollY(y);
              scrollFrame.current = null;
            });
          }
        }}
      >
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={{ uri: packageData.image }}
            className="w-full h-64"
            resizeMode="cover"
          />
          {packageData.isPopular && (
            <View className="absolute top-6 right-6 bg-terracotta px-4 py-2 rounded-full">
              <Text className="text-white text-sm font-bold">Most Popular</Text>
            </View>
          )}
          {packageData.originalPrice > packageData.price && (
            <View className="absolute top-6 left-6 bg-dustyRose px-4 py-2 rounded-full">
              <Text className="text-white text-sm font-bold">
                Save ${packageData.originalPrice - packageData.price}
              </Text>
            </View>
          )}
        </View>

        {/* Package Header */}
        <View className="px-6 py-6">
          <Text className="text-charcoal text-3xl font-bold mb-3">Package Details</Text>
          <Text className="text-charcoal text-2xl font-bold mb-3">
            {packageData.name}
          </Text>
          <Text className="text-charcoal/70 text-lg leading-6 mb-4">
            {packageData.longDescription}
          </Text>

          <View className="flex-row items-center space-x-6 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={20} color="#A6B8A0" />
              <Text className="text-sage text-base font-semibold ml-2">
                {packageData.duration}
              </Text>
            </View>
            {!isCustomPackage && (
              <View className="flex-row items-center">
                <Ionicons name="restaurant-outline" size={20} color="#A6B8A0" />
                <Text className="text-sage text-base font-semibold ml-2">
                  {packageData.mealCount} meals
                </Text>
              </View>
            )}
          </View>

          {/* Benefits */}
          <View className="flex-row flex-wrap mb-6">
            {packageData.benefits.map(benefit => (
              <View key={benefit} className="bg-sage/10 px-3 py-2 rounded-full mr-2 mb-2">
                <Text className="text-sage text-sm font-medium">{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Custom Bundle Builder */}
        {isCustomPackage ? (
          <View className="px-6 mb-6" onLayout={(e) => { setBuilderY(e.nativeEvent.layout.y); setBuilderH(e.nativeEvent.layout.height); }}>
            {/* Summary Card */}
            <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Build Your Own Bundle</Text>
              <Text className="text-charcoal/60 text-sm mb-4">
                Add or remove meals with + and −. Discounts apply automatically at 8, 12, 16, and 22 meals.
              </Text>

              <View className="flex-row justify-between mb-2">
                <Text className="text-charcoal">Items</Text>
                <Text className="text-charcoal font-semibold">{items}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-charcoal">Subtotal</Text>
                <Text className="text-charcoal font-semibold">${subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-charcoal">Discount</Text>
                <Text className="text-dustyRose font-semibold">{discount > 0 ? `- $${discount.toFixed(2)}` : "$0.00"}</Text>
              </View>
              <View className="border-t border-sage/20 pt-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-charcoal text-lg font-bold">Total</Text>
                  <Text className="text-sage text-2xl font-bold">${total.toFixed(2)}</Text>
                </View>
              </View>

              {/* Progress */}
              <View className="mt-4">
                {nextTier ? (
                  <Text className="text-charcoal/60 text-sm mb-2">
                    {nextTier.needed} more {nextTier.needed === 1 ? "item" : "items"} to save ${nextTier.nextOff}
                  </Text>
                ) : (
                  <Text className="text-charcoal/60 text-sm mb-2">Maximum savings reached</Text>
                )}
                <View className="w-full h-2 bg-sage/20 rounded-full overflow-hidden">
                  <View style={{ width: `${Math.round(progress * 100)}%` }} className="h-2 bg-sage" />
                </View>
              </View>
            </View>

            {/* Meal Cards */}
            <View className="space-y-3">
              {mockMeals.map(meal => {
                const qty = mealQuantities[meal.id] || 0;
                return (
                  <View key={meal.id} className="flex-row items-center p-4 rounded-xl bg-white border border-sage/20 shadow-sm">
                    <Image source={{ uri: meal.image }} className="w-16 h-16 rounded-xl mr-4" resizeMode="cover" />
                    <View className="flex-1">
                      <Text className="text-charcoal font-semibold text-base mb-1">{meal.name}</Text>
                      <Text className="text-charcoal/60 text-sm mb-2" numberOfLines={2}>{meal.description}</Text>
                      <Text className="text-sage font-bold text-lg">${meal.price}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Pressable onPress={() => decrement(meal.id)} className="w-11 h-11 rounded-full border border-sage/40 items-center justify-center mr-2">
                        <Ionicons name="remove" size={18} color="#A6B8A0" />
                      </Pressable>
                      <View className="min-w-[32px] items-center">
                        <Text className="text-charcoal font-bold text-base">{qty}</Text>
                      </View>
                      <Pressable onPress={() => increment(meal.id)} className="w-11 h-11 rounded-full bg-sage items-center justify-center ml-2">
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          /* Preset Package Meals List */
          <View className="px-6 mb-6">
            <Text className="text-charcoal text-xl font-bold mb-4">What's Included</Text>
            <View className="space-y-3">
              {packageMeals.map(meal => meal && (
                <Pressable
                  key={meal.id}
                  onPress={() => navigation.navigate("ProductDetail", { mealId: meal.id })}
                  className="flex-row items-center bg-white p-4 rounded-xl shadow-sm"
                >
                  <Image source={{ uri: meal.image }} className="w-16 h-16 rounded-xl mr-4" resizeMode="cover" />
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold text-base mb-1">{meal.name}</Text>
                    <Text className="text-charcoal/60 text-sm mb-2" numberOfLines={2}>{meal.description}</Text>
                    <View className="flex-row flex-wrap">
                      {meal.tags.slice(0, 2).map(tag => (
                        <View key={tag} className="bg-dustyRose/20 px-2 py-1 rounded-full mr-1">
                          <Text className="text-dustyRose text-xs font-medium">{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#A6B8A0" />
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View className="h-20" />
      </ScrollView>

      {/* Bottom Summary + Centered CTA (shows when builder scrolled past) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-sage/20 p-6">
        {isCustomPackage ? (
          <>
            {/* Summary Bar mirrors the top builder; only show when builder not visible and items > 0 */}
            {!isBuilderVisible && items > 0 && (
              <View className="bg-white rounded-2xl p-4 border border-sage/20 mb-4">
                <Text className="text-charcoal text-sm font-semibold mb-2">Build Your Own Bundle</Text>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-charcoal/60 text-xs">Items</Text>
                  <Text className="text-charcoal font-semibold text-sm">{items}</Text>
                </View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-charcoal/60 text-xs">Subtotal</Text>
                  <Text className="text-charcoal font-semibold text-sm">${subtotal.toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-charcoal/60 text-xs">Discount</Text>
                  <Text className="text-dustyRose font-semibold text-sm">{discount > 0 ? `- $${discount.toFixed(2)}` : "$0.00"}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-charcoal text-sm">Total</Text>
                  <Text className="text-sage text-xl font-bold">${total.toFixed(2)}</Text>
                </View>
                <View className="mt-3">
                  {nextTier ? (
                    <Text className="text-charcoal/60 text-[11px] mb-1">
                      {nextTier.needed} more {nextTier.needed === 1 ? "item" : "items"} to save ${nextTier.nextOff}
                    </Text>
                  ) : (
                    <Text className="text-charcoal/60 text-[11px] mb-1">Maximum savings reached</Text>
                  )}
                  <View className="w-full h-1.5 bg-sage/20 rounded-full overflow-hidden">
                    <View className="h-1.5 bg-sage" style={{ width: `${Math.round(progress * 100)}%` }} />
                  </View>
                </View>
              </View>
            )}

            {/* Centered CTA */}
            <View className="items-center">
              <Pressable
                onPress={handleAddToCart}
                disabled={items === 0}
                className={`px-8 py-4 rounded-full w-full ${items === 0 ? "bg-charcoal/20" : "bg-sage"}`}
              >
                <Text className={`font-semibold text-center ${items === 0 ? "text-charcoal/50" : "text-white"}`}>
                  {items === 0 ? "Add Meals to Start" : "Add Bundle to Cart"}
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-charcoal/60 text-sm">Package Total</Text>
              <View className="flex-row items-baseline">
                <Text className="text-sage text-2xl font-bold">${packageData.price}</Text>
                {packageData.originalPrice > packageData.price && (
                  <Text className="text-charcoal/40 text-lg font-medium line-through ml-2">${packageData.originalPrice}</Text>
                )}
              </View>
            </View>
            <Pressable onPress={handleAddToCart} className="px-8 py-4 rounded-full bg-sage">
              <Text className="font-semibold text-center text-white">Add to Cart</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}