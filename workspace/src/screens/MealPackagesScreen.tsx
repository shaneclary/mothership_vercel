import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { MealPackage } from "../types";
import { useAppStore } from "../state/appStore";
import { mockMealPackages, mockPackageTestimonials } from "../utils/mockData";
import GiftCardPromo from "../components/GiftCardPromo";

export default function MealPackagesScreen() {
  const navigation = useNavigation<any>();
  const addPackageToCart = useAppStore(state => state.addPackageToCart);
  
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const handleAddPackageToCart = (pkg: MealPackage) => {
    if (pkg.id === "pkg-4") {
      // Build Your Own Package - navigate to customization
      navigation.navigate("PackageDetail", { packageId: pkg.id });
    } else {
      addPackageToCart({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        image: pkg.image,
        description: pkg.description,
        meals: pkg.meals,
        mealCount: pkg.mealCount,
      });
    }
  };

  const presetPackages = mockMealPackages.filter(pkg => pkg.id !== "pkg-4");
  const buildYourOwnPackage = mockMealPackages.find(pkg => pkg.id === "pkg-4");

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Shipping Banner */}
        <View className="bg-sage/10 mx-6 mt-4 p-4 rounded-2xl border border-sage/20">
          <View className="flex-row items-center">
            <Ionicons name="information-circle" size={20} color="#A6B8A0" />
            <Text className="text-sage text-sm font-semibold ml-2 flex-1">
              Shipping nationwide every Tuesday — place your order by Monday at 12 PM PST
            </Text>
          </View>
        </View>

        {/* Header */}
        <View className="px-6 py-6">
          <Text className="text-charcoal text-3xl font-bold mb-3">
            Cared-for Collections
          </Text>
          <Text className="text-charcoal/70 text-base leading-5">
            Thoughtfully curated meal packages designed to support your postpartum recovery journey with traditional healing wisdom and modern nutrition.
          </Text>
        </View>

        {/* Pre-set Packages */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-xl font-semibold mb-4">
            Our Signature Plans
          </Text>
          
          {presetPackages.map(pkg => (
            <Pressable
              key={pkg.id}
              onPress={() => navigation.navigate("PackageDetail", { packageId: pkg.id })}
              className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden"
            >
              <View className="relative">
                <Image
                  source={{ uri: pkg.image }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                {pkg.isPopular && (
                  <View className="absolute top-4 right-4 bg-terracotta px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-bold">Most Popular</Text>
                  </View>
                )}
                
                {/* Discount Badge */}
                {pkg.originalPrice > pkg.price && (
                  <View className="absolute top-4 left-4 bg-dustyRose px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-bold">
                      Save ${pkg.originalPrice - pkg.price}
                    </Text>
                  </View>
                )}
              </View>
              
              <View className="p-5">
                <Text className="text-charcoal text-xl font-bold mb-2">
                  {pkg.name}
                </Text>
                <Text className="text-charcoal/70 text-base mb-3 leading-5">
                  {pkg.description}
                </Text>
                
                {/* Package Details */}
                <View className="flex-row items-center mb-3 space-x-6">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#A6B8A0" />
                    <Text className="text-sage text-sm font-medium ml-1">
                      {pkg.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="restaurant-outline" size={16} color="#A6B8A0" />
                    <Text className="text-sage text-sm font-medium ml-1">
                      {pkg.mealCount} meals
                    </Text>
                  </View>
                </View>

                {/* Benefits */}
                <View className="flex-row flex-wrap mb-4">
                  {pkg.benefits.slice(0, 3).map(benefit => (
                    <View key={benefit} className="bg-sage/10 px-3 py-1 rounded-full mr-2 mb-2">
                      <Text className="text-sage text-xs font-medium">
                        {benefit}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Pricing */}
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-baseline">
                    <Text className="text-sage text-2xl font-bold">
                      ${pkg.price}
                    </Text>
                    {pkg.originalPrice > pkg.price && (
                      <Text className="text-charcoal/40 text-lg font-medium line-through ml-2">
                        ${pkg.originalPrice}
                      </Text>
                    )}
                  </View>
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      handleAddPackageToCart(pkg);
                    }}
                    className="bg-sage px-6 py-3 rounded-full"
                  >
                    <Text className="text-white font-semibold">Order Plan</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Build Your Own Section */}
        {buildYourOwnPackage && (
          <View className="px-6 mb-8">
            <Text className="text-charcoal text-xl font-semibold mb-4">
              Customize Your Plan
            </Text>
            
            <Pressable
              onPress={() => navigation.navigate("PackageDetail", { packageId: buildYourOwnPackage.id })}
              className="bg-dustyRose/10 rounded-2xl p-6 border-2 border-dashed border-dustyRose/40"
            >
              <View className="items-center">
                <Ionicons name="add-circle-outline" size={48} color="#D6AFA3" />
                <Text className="text-charcoal text-xl font-bold mt-3 mb-2">
                  {buildYourOwnPackage.name}
                </Text>
                <Text className="text-charcoal/70 text-center text-base mb-4 leading-5">
                  {buildYourOwnPackage.description}
                </Text>
                
                <View className="bg-dustyRose px-6 py-3 rounded-full">
                  <Text className="text-white font-semibold">Build & Customize</Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* Testimonials Section */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-xl font-semibold mb-4">
            What New Mothers Say
          </Text>
          
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Ionicons name="chatbubble-outline" size={24} color="#A6B8A0" />
              <Text className="text-sage text-base font-semibold ml-2">
                {mockPackageTestimonials[selectedTestimonial].title}
              </Text>
            </View>
            
            <Text className="text-charcoal text-lg leading-6 mb-4 italic">
              "{mockPackageTestimonials[selectedTestimonial].quote}"
            </Text>
            
            <Text className="text-charcoal font-semibold">
              — {mockPackageTestimonials[selectedTestimonial].name}
            </Text>
            
            {/* Testimonial Navigation */}
            <View className="flex-row justify-center mt-4 space-x-2">
              {mockPackageTestimonials.map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedTestimonial(index)}
                  className={`w-2 h-2 rounded-full ${
                    selectedTestimonial === index ? "bg-sage" : "bg-sage/30"
                  }`}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Gift Card Promo */}
        <View className="px-6 mb-8">
          <GiftCardPromo />
        </View>

        {/* FAQ Section */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-xl font-semibold mb-4">
            Frequently Asked Questions
          </Text>
          
          <View className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <View>
              <Text className="text-charcoal font-semibold text-base mb-2">
                How do frozen meals ship?
              </Text>
              <Text className="text-charcoal/70 text-sm leading-4">
                All meals are carefully packed with dry ice and insulation to maintain frozen temperatures during shipping.
              </Text>
            </View>
            
            <View>
              <Text className="text-charcoal font-semibold text-base mb-2">
                How long will meals stay fresh?
              </Text>
              <Text className="text-charcoal/70 text-sm leading-4">
                Frozen meals stay fresh for up to 6 months. Once thawed, consume within 3-4 days.
              </Text>
            </View>
            
            <View>
              <Text className="text-charcoal font-semibold text-base mb-2">
                Can I customize existing packages?
              </Text>
              <Text className="text-charcoal/70 text-sm leading-4">
                Yes! Most packages allow meal substitutions. Use our "Build Your Own" option for complete customization.
              </Text>
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}