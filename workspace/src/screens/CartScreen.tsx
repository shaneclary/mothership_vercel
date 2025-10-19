import React from "react";
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
import { useNavigation } from "@react-navigation/native";

import { useAppStore } from "../state/appStore";
import { selectTotalMeals } from "../utils/cart";

export default function CartScreen() {
  const navigation = useNavigation();
  const {
    cartItems,
    packageItems,
    removeFromCart,
    removePackageFromCart,
    updateQuantity,
    updatePackageQuantity,
    clearCart,
    getCartTotal,
  } = useAppStore();

  const total = getCartTotal();
  const shipping: number = 0; // Free shipping
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  const totalMeals = useAppStore(selectTotalMeals);
  const needs = Math.max(0, 5 - totalMeals);

  const handleCheckout = () => {
    if (cartItems.length === 0 && packageItems.length === 0) {
      Alert.alert("Empty Cart", "Please add some meals to your cart first.");
      return;
    }
    if (totalMeals < 5) {
      // Communicate through UI state; do not proceed
      return;
    }
    
    Alert.alert(
      "Order Placed!",
      "Thank you for your order. You'll receive a confirmation email shortly.",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.goBack();
          },
        },
      ]
    );
  };

  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => updateQuantity(id, 0), style: "destructive" },
        ]
      );
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const updatePackageItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      Alert.alert(
        "Remove Package",
        "Are you sure you want to remove this package from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => updatePackageQuantity(id, 0), style: "destructive" },
        ]
      );
    } else {
      updatePackageQuantity(id, newQuantity);
    }
  };

  if (cartItems.length === 0 && packageItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-cream">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="bag-outline" size={80} color="#A6B8A0" />
          <Text className="text-charcoal text-2xl font-bold mt-6 mb-4">
            Your cart is empty
          </Text>
          <Text className="text-charcoal/60 text-center text-lg leading-6 mb-8">
            Add some nourishing meals or packages to get started on your postpartum journey.
          </Text>
          <View className="flex-row space-x-4">
            <Pressable
              onPress={() => navigation.navigate("Shop" as never)}
              className="bg-sage px-6 py-4 rounded-full flex-1"
            >
              <Text className="text-white font-semibold text-center">Shop Meals</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Packages" as never)}
              className="bg-dustyRose px-6 py-4 rounded-full flex-1"
            >
              <Text className="text-white font-semibold text-center">Shop Packages</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView className="flex-1" automaticallyAdjustContentInsets={true}>
        <View className="px-6 py-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-charcoal text-2xl font-bold">
              Your Order ({cartItems.length + packageItems.length} {(cartItems.length + packageItems.length) === 1 ? "item" : "items"})
            </Text>
            <Pressable
              onPress={() => {
                Alert.alert(
                  "Clear Cart",
                  "Are you sure you want to remove all items?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Clear All", onPress: clearCart, style: "destructive" },
                  ]
                );
              }}
              className="text-terracotta"
            >
              <Text className="text-terracotta font-semibold">Clear All</Text>
            </Pressable>
          </View>

          {/* Package Items */}
          {packageItems.length > 0 && (
            <View className="mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Meal Packages</Text>
              <View className="space-y-4">
                {packageItems.map(item => (
                  <View key={`pkg-${item.id}-${Math.random()}`} className="bg-white rounded-2xl p-4 shadow-sm">
                    <View className="flex-row">
                      <Image
                        source={{ uri: item.image }}
                        className="w-20 h-20 rounded-xl"
                        resizeMode="cover"
                      />
                      <View className="flex-1 ml-4">
                        <Text className="text-charcoal text-lg font-semibold mb-1">
                          {item.name}
                        </Text>
                        <Text className="text-charcoal/60 text-sm mb-2" numberOfLines={2}>
                          {item.description}
                        </Text>
                        <View className="flex-row items-center mb-3">
                          <Ionicons name="restaurant-outline" size={14} color="#A6B8A0" />
                          <Text className="text-sage text-sm font-medium ml-1">
                            {item.mealCount} meals included
                          </Text>
                        </View>
                        
                        <View className="flex-row justify-between items-center">
                          <Text className="text-sage text-xl font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                          
                          {/* Quantity Controls */}
                          <View className="flex-row items-center">
                            <Pressable
                              onPress={() => updatePackageItemQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-sage/20 rounded-full items-center justify-center"
                            >
                              <Ionicons name="remove" size={16} color="#A6B8A0" />
                            </Pressable>
                            <Text className="mx-3 text-charcoal font-bold text-lg">
                              {item.quantity}
                            </Text>
                            <Pressable
                              onPress={() => updatePackageItemQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-sage/20 rounded-full items-center justify-center"
                            >
                              <Ionicons name="add" size={16} color="#A6B8A0" />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                      
                      {/* Remove Button */}
                      <Pressable
                        onPress={() => removePackageFromCart(item.id)}
                        className="ml-2 p-2"
                      >
                        <Ionicons name="trash-outline" size={20} color="#CBA392" />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Individual Meal Items */}
          {cartItems.length > 0 && (
            <View className="mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Individual Meals</Text>
              <View className="space-y-4">
                {cartItems.map(item => (
                  <View key={`${item.id}-${Math.random()}`} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row">
                  <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1 ml-4">
                    <Text className="text-charcoal text-lg font-semibold mb-1">
                      {item.name}
                    </Text>
                    <Text className="text-charcoal/60 text-sm mb-3" numberOfLines={2}>
                      {item.description}
                    </Text>
                    
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sage text-xl font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                      
                      {/* Quantity Controls */}
                      <View className="flex-row items-center">
                        <Pressable
                          onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-sage/20 rounded-full items-center justify-center"
                        >
                          <Ionicons name="remove" size={16} color="#A6B8A0" />
                        </Pressable>
                        <Text className="mx-3 text-charcoal font-bold text-lg">
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-sage/20 rounded-full items-center justify-center"
                        >
                          <Ionicons name="add" size={16} color="#A6B8A0" />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  
                  {/* Remove Button */}
                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    className="ml-2 p-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#CBA392" />
                  </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
          )}

          {/* Minimum Requirement Notice */}
          {totalMeals < 5 && (
            <View className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-sage/20">
              <View className="flex-row items-center mb-2">
                <Ionicons name="alert-circle" size={18} color="#D6AFA3" />
                <Text className="text-charcoal font-semibold ml-2">Minimum order is 5 meals</Text>
              </View>
              <Text className="text-charcoal/70 text-sm mb-2">Add <Text className="text-dustyRose font-semibold">{needs}</Text> more {needs === 1 ? "meal" : "meals"} to proceed to checkout.</Text>
              <View className="w-full h-2 bg-sage/20 rounded-full overflow-hidden">
                <View className="h-2 bg-sage" style={{ width: `${Math.min(100, Math.round((totalMeals / 5) * 100))}%` }} />
              </View>
            </View>
          )}

          {/* Order Summary */}
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <Text className="text-charcoal text-xl font-bold mb-4">Order Summary</Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-charcoal text-base">Subtotal</Text>
                <Text className="text-charcoal font-semibold">${total.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal text-base">Shipping</Text>
                <Text className="text-sage font-semibold">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal text-base">Tax</Text>
                <Text className="text-charcoal font-semibold">${tax.toFixed(2)}</Text>
              </View>
              
              <View className="border-t border-sage/20 pt-3">
                <View className="flex-row justify-between">
                  <Text className="text-charcoal text-xl font-bold">Total</Text>
                  <Text className="text-sage text-xl font-bold">${finalTotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Delivery Info */}
          <View className="bg-sage/10 rounded-2xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={20} color="#A6B8A0" />
              <Text className="text-sage font-semibold ml-2">Delivery Information</Text>
            </View>
            <Text className="text-charcoal/70 text-sm leading-5">
              Your meals will be delivered frozen in insulated packaging within 3-5 business days. 
              Free shipping on orders over $50.
            </Text>
          </View>

          {/* Checkout Button */}
          <Pressable
            onPress={handleCheckout}
            disabled={totalMeals < 5}
            className={`${totalMeals < 5 ? "bg-charcoal/20" : "bg-sage"} py-4 rounded-full items-center mb-4`}
          >
            <Text className={`${totalMeals < 5 ? "text-charcoal/50" : "text-white"} font-bold text-lg`}>
              {totalMeals < 5 ? `Add ${needs} more ${needs === 1 ? "meal" : "meals"} to proceed` : `Proceed to Checkout - $${finalTotal.toFixed(2)}`}
            </Text>
          </Pressable>

          {/* Continue Shopping */}
          <View className="flex-row space-x-3">
            <Pressable
              onPress={() => navigation.navigate("Shop" as never)}
              className="flex-1 bg-white border-2 border-sage py-4 rounded-full items-center"
            >
              <Text className="text-sage font-semibold text-base">Shop Meals</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Packages" as never)}
              className="flex-1 bg-white border-2 border-dustyRose py-4 rounded-full items-center"
            >
              <Text className="text-dustyRose font-semibold text-base">Shop Packages</Text>
            </Pressable>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}