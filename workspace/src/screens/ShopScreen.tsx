import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Meal } from "../types";
import { useAppStore } from "../state/appStore";
import { mockMeals } from "../utils/mockData";
import { selectTotalMeals } from "../utils/cart";
import GiftCardPromo from "../components/GiftCardPromo";

export default function ShopScreen() {
  const navigation = useNavigation<any>();
  const addToCart = useAppStore(state => state.addToCart);
  const totalMeals = useAppStore(selectTotalMeals);
  const needs = Math.max(0, 5 - totalMeals);
  
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Meals", count: mockMeals.length },
    { id: "soup", label: "Soups", count: mockMeals.filter(m => m.category === "soup").length },
    { id: "broth", label: "Broths", count: mockMeals.filter(m => m.category === "broth").length },
    { id: "full-meal", label: "Full Meals", count: mockMeals.filter(m => m.category === "full-meal").length },
  ];

  const filteredMeals = mockMeals.filter(meal => {
    const matchesFilter = selectedFilter === "all" || meal.category === selectedFilter;
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddToCart = (meal: Meal) => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      description: meal.description,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Search Bar */}
        <View className="px-6 py-4">
          <View className="bg-white rounded-full flex-row items-center px-4 py-3 shadow-sm">
            <Ionicons name="search" size={20} color="#A6B8A0" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search meals... (5 minimum to order)"
              placeholderTextColor="#A6B8A0"
              className="flex-1 ml-3 text-charcoal"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#A6B8A0" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Permanent Minimum Order Info */}
        <View className="px-6 mb-4">
          <View className={`${totalMeals >= 5 ? "bg-dustyRose/5 border-dustyRose/10" : "bg-sage/5 border-sage/10"} border rounded-xl px-4 py-3`}>
            <View className="flex-row items-center justify-center">
              <Ionicons name="restaurant-outline" size={16} color={totalMeals >= 5 ? "#D6AFA3" : "#A6B8A0"} />
              <Text className={`${totalMeals >= 5 ? "text-dustyRose" : "text-sage"} text-sm font-medium ml-2`}>
                {totalMeals >= 5 
                  ? "Minimum met! Add more meals or checkout anytime"
                  : "5-meal minimum order • Free shipping on all orders"
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Minimum Order Banner */}
        {totalMeals < 5 && (
          <View className="px-6 mb-4">
            <View className="bg-white border border-sage/20 rounded-2xl px-4 py-3">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-charcoal font-semibold">Minimum order is 5 meals</Text>
                <Pressable onPress={() => navigation.navigate("Main", { screen: "Cart" })} className="px-3 py-1 rounded-full bg-sage/10">
                  <Text className="text-sage text-xs font-semibold">View Cart</Text>
                </Pressable>
              </View>
              <Text className="text-charcoal/70 text-sm mb-2">You need <Text className="text-dustyRose font-semibold">{needs}</Text> more {needs === 1 ? "meal" : "meals"} to checkout.</Text>
              <View className="w-full h-2 bg-sage/20 rounded-full overflow-hidden">
                <View className="h-2 bg-sage" style={{ width: `${Math.min(100, Math.round((totalMeals / 5) * 100))}%` }} />
              </View>
            </View>
          </View>
        )}

        {/* Filter Tabs */}
        <View className="px-6 mb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {filters.map(filter => (
                <Pressable
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFilter === filter.id
                      ? "bg-sage border-sage"
                      : "bg-white border-sage/30"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedFilter === filter.id ? "text-white" : "text-sage"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Filter Context */}
        {totalMeals < 5 && (
          <View className="px-6 mb-4">
            <Text className="text-charcoal/40 text-xs text-center">
              Select 5 or more meals for checkout
            </Text>
          </View>
        )}

        {/* Enhanced Results Count */}
        <View className="px-6 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="information-circle-outline" size={16} color="#A6B8A0" />
            <Text className="text-charcoal/60 text-base ml-2">
              {filteredMeals.length} {filteredMeals.length === 1 ? "meal" : "meals"} found
              {totalMeals === 0 ? " • 5-meal minimum to checkout" : totalMeals < 5 ? ` • You have ${totalMeals} of 5 meals needed` : " • Ready to checkout!"}
            </Text>
          </View>
        </View>

        {/* Meals Grid */}
        <View className="px-6">
          <View className="flex-row flex-wrap justify-between">
            {filteredMeals.map(meal => (
              <Pressable
                key={meal.id}
                onPress={() => navigation.navigate("ProductDetail", { mealId: meal.id })}
                className="w-[48%] bg-white rounded-2xl shadow-sm mb-6"
              >
                 <View className="relative">
                   <Image
                     source={{ uri: meal.image }}
                     className="w-full h-40 rounded-t-2xl"
                     resizeMode="cover"
                   />
                   {/* Meal progress indicator */}
                   {totalMeals > 0 && totalMeals < 5 && (
                     <View className="absolute top-2 right-2 bg-sage px-2 py-1 rounded-full">
                       <Text className="text-white text-xs font-bold">
                         {totalMeals} of 5
                       </Text>
                     </View>
                   )}
                   {totalMeals >= 5 && (
                     <View className="absolute top-2 right-2 bg-dustyRose px-2 py-1 rounded-full">
                       <Text className="text-white text-xs font-bold">
                         ✓ Ready
                       </Text>
                     </View>
                   )}
                 </View>
                <View className="p-4">
                  <Text className="text-charcoal text-lg font-semibold mb-1">
                    {meal.name}
                  </Text>
                  <Text className="text-charcoal/60 text-sm mb-3 leading-4" numberOfLines={2}>
                    {meal.description}
                  </Text>
                  
                  {/* Tags */}
                  <View className="flex-row flex-wrap mb-3">
                    {meal.tags.slice(0, 2).map(tag => (
                      <View key={tag} className="bg-dustyRose/20 px-2 py-1 rounded-full mr-1 mb-1">
                        <Text className="text-dustyRose text-xs font-medium">
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text className="text-sage text-xl font-bold">
                      ${meal.price}
                    </Text>
                     <Pressable
                       onPress={(e) => {
                         e.stopPropagation();
                         handleAddToCart(meal);
                       }}
                       className={`${totalMeals >= 5 ? "bg-dustyRose" : "bg-sage"} px-3 py-2 rounded-full`}
                     >
                       <Ionicons name="add" size={16} color="white" />
                     </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="search" size={64} color="#A6B8A0" />
            <Text className="text-charcoal text-xl font-semibold mt-4 mb-2">
              No meals found
            </Text>
            <Text className="text-charcoal/60 text-center px-8 leading-5 mb-2">
              Try adjusting your search or filter criteria
            </Text>
            <Text className="text-charcoal/40 text-center px-8 text-sm mb-6">
              Remember: 5 meals minimum for checkout
            </Text>
            <Pressable
              onPress={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
              className="bg-sage px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold">Clear Filters</Text>
            </Pressable>
          </View>
        )}

        {/* Gift Card Promo */}
        <View className="px-6 mt-2">
          <GiftCardPromo />
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* Sticky Footer Progress - only show when user has items but less than 5 */}
      {totalMeals > 0 && totalMeals < 5 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-sage/20 px-6 py-4 shadow-lg">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-charcoal font-semibold text-base">
              {totalMeals} of 5 meals selected
            </Text>
            <Pressable 
              onPress={() => navigation.navigate("Cart")} 
              className="bg-sage px-4 py-2 rounded-full"
            >
              <Text className="text-white font-semibold text-sm">View Cart</Text>
            </Pressable>
          </View>
          <View className="flex-row items-center mb-1">
            <Text className="text-charcoal/60 text-sm flex-1">
              Add {needs} more {needs === 1 ? "meal" : "meals"} to checkout
            </Text>
          </View>
          <View className="w-full h-2 bg-sage/20 rounded-full overflow-hidden">
            <View className="h-2 bg-sage rounded-full" style={{ width: `${Math.round((totalMeals / 5) * 100)}%` }} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}