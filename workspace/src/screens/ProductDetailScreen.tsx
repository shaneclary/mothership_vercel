import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../types";
import { useAppStore } from "../state/appStore";
import { mockMeals } from "../utils/mockData";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const { mealId } = route.params;
  const addToCart = useAppStore(state => state.addToCart);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSection, setSelectedSection] = useState<"ingredients" | "benefits" | "nutrition">("ingredients");

  const meal = mockMeals.find(m => m.id === mealId);

  if (!meal) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <Text className="text-charcoal text-xl">Meal not found</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        description: meal.description,
      });
    }
    Alert.alert("Added to Cart", `${quantity} ${meal.name} added to your cart`);
  };

  const updateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Hero Image */}
        <Image
          source={{ uri: meal.image }}
          className="w-full h-80"
          resizeMode="cover"
        />

        <View className="px-6 py-6">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 pr-4">
              <Text className="text-charcoal text-2xl font-bold mb-2">
                {meal.name}
              </Text>
              <Text className="text-sage text-3xl font-bold">
                ${meal.price}
              </Text>
            </View>
            <View className="bg-terracotta/20 px-4 py-2 rounded-full">
              <Text className="text-terracotta font-semibold capitalize">
                {meal.category.replace("-", " ")}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-charcoal text-base leading-6 mb-6">
            {meal.longDescription}
          </Text>

          {/* Tags */}
          <View className="flex-row flex-wrap mb-6">
            {meal.tags.map(tag => (
              <View key={tag} className="bg-dustyRose/20 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-dustyRose font-medium text-sm">
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Section Tabs */}
          <View className="flex-row border-b border-sage/20 mb-6">
            {[
              { id: "ingredients", label: "Ingredients" },
              { id: "benefits", label: "Benefits" },
              { id: "nutrition", label: "Nutrition" },
            ].map(section => (
              <Pressable
                key={section.id}
                onPress={() => setSelectedSection(section.id as any)}
                className={`flex-1 pb-3 border-b-2 ${
                  selectedSection === section.id
                    ? "border-sage"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    selectedSection === section.id
                      ? "text-sage"
                      : "text-charcoal/60"
                  }`}
                >
                  {section.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Section Content */}
          <View className="mb-8">
            {selectedSection === "ingredients" && (
              <View>
                <Text className="text-charcoal font-semibold text-lg mb-4">Ingredients</Text>
                {meal.ingredients.map((ingredient, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <Text className="text-charcoal text-base">{ingredient}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedSection === "benefits" && (
              <View>
                <Text className="text-charcoal font-semibold text-lg mb-4">Health Benefits</Text>
                {meal.benefits.map((benefit, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Ionicons name="checkmark-circle" size={20} color="#A6B8A0" />
                    <Text className="text-charcoal text-base ml-3">{benefit}</Text>
                  </View>
                ))}
              </View>
            )}

            {selectedSection === "nutrition" && (
              <View>
                <Text className="text-charcoal font-semibold text-lg mb-4">Nutrition Facts</Text>
                <View className="bg-white rounded-2xl p-4 shadow-sm">
                  {Object.entries(meal.nutritionInfo).map(([key, value]) => (
                    <View key={key} className="flex-row justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <Text className="text-charcoal capitalize font-medium">
                        {key === "carbs" ? "Carbohydrates" : key}
                      </Text>
                      <Text className="text-charcoal font-semibold">
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-charcoal text-lg font-semibold">Quantity</Text>
            <View className="flex-row items-center">
              <Pressable
                onPress={() => updateQuantity(-1)}
                className="w-10 h-10 bg-sage/20 rounded-full items-center justify-center"
                disabled={quantity <= 1}
              >
                <Ionicons name="remove" size={20} color="#A6B8A0" />
              </Pressable>
              <Text className="mx-6 text-charcoal text-xl font-bold">
                {quantity}
              </Text>
              <Pressable
                onPress={() => updateQuantity(1)}
                className="w-10 h-10 bg-sage/20 rounded-full items-center justify-center"
                disabled={quantity >= 10}
              >
                <Ionicons name="add" size={20} color="#A6B8A0" />
              </Pressable>
            </View>
          </View>

          {/* Add to Cart Button */}
          <Pressable
            onPress={handleAddToCart}
            className="bg-sage py-4 rounded-full items-center mb-4"
          >
            <Text className="text-white font-bold text-lg">
              Add to Cart - ${(meal.price * quantity).toFixed(2)}
            </Text>
          </Pressable>

          {/* Secondary Actions */}
          <View className="flex-row space-x-4">
            <Pressable className="flex-1 bg-white border-2 border-sage py-3 rounded-full items-center">
              <Text className="text-sage font-semibold">Add to Wishlist</Text>
            </Pressable>
            <Pressable className="flex-1 bg-white border-2 border-terracotta py-3 rounded-full items-center">
              <Text className="text-terracotta font-semibold">Share</Text>
            </Pressable>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}