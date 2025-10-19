import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Hero Section */}
        <View className="relative">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
            }}
            className="w-full h-80"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-sage/20" />
          <View className="absolute bottom-6 left-6 right-6">
            <Text className="text-white text-3xl font-bold mb-2">
              Our Story
            </Text>
            <Text className="text-white text-lg">
              Born from ancient wisdom, designed for modern mothers
            </Text>
          </View>
        </View>

        <View className="px-6 py-8">
          {/* Founder Story */}
          <View className="mb-8">
            <View className="flex-row items-start mb-6">
              <View className="w-24 h-24 rounded-full overflow-hidden mr-4">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="text-charcoal text-2xl font-bold mb-2">
                  Meet Monika
                </Text>
                <Text className="text-sage text-lg font-semibold">
                  Founder & Mother
                </Text>
              </View>
            </View>

            <Text className="text-charcoal text-base leading-6 mb-4">
              After the birth of my first child, I found myself overwhelmed and undernourished. 
              The traditional 40-day confinement period seemed impossible in our busy modern world, 
              yet I craved the nourishment and care it promised.
            </Text>

            <Text className="text-charcoal text-base leading-6 mb-4">
              That's when I discovered "The First 40 Days" by Heng Ou, which opened my eyes to 
              postpartum practices from around the world. I learned about the wisdom of warming 
              foods, healing broths, and the importance of proper nourishment during recovery.
            </Text>

            <Text className="text-charcoal text-base leading-6 mb-6">
              Mothership was born from my desire to make this ancient wisdom accessible to every 
              new mother. We shouldn't have to choose between proper nourishment and convenience 
              during one of the most important periods of our lives.
            </Text>
          </View>

          {/* Philosophy Section */}
          <View className="bg-sage/10 rounded-2xl p-6 mb-8">
            <Text className="text-charcoal text-2xl font-bold mb-4">
              Our Philosophy
            </Text>
            <Text className="text-charcoal text-base leading-6 mb-4">
              The "First 40 Days" concept appears in cultures worldwide - from Chinese confinement 
              to Latin American cuarentena. Despite different names, the core principle remains: 
              new mothers need warmth, rest, and deeply nourishing foods.
            </Text>
            <Text className="text-charcoal text-base leading-6">
              Every meal we create honors this tradition while meeting modern nutritional needs. 
              We focus on warming spices, healing broths, and nutrient-dense ingredients that 
              support recovery, hormone balance, and energy.
            </Text>
          </View>

          {/* Values */}
          <View className="mb-8">
            <Text className="text-charcoal text-2xl font-bold mb-6">
              Our Values
            </Text>
            
            <View className="space-y-6">
              {[
                {
                  icon: "leaf-outline",
                  title: "Whole Foods First",
                  description: "We use only organic, locally-sourced ingredients whenever possible. No preservatives, just real food."
                },
                {
                  icon: "heart-outline", 
                  title: "Postpartum Wellness",
                  description: "Every recipe is designed specifically for the nutritional needs of recovering mothers."
                },
                {
                  icon: "earth-outline",
                  title: "Sustainability",
                  description: "From sourcing to packaging, we prioritize environmental responsibility in everything we do."
                },
                {
                  icon: "people-outline",
                  title: "Community Support",
                  description: "We believe it takes a village to raise a child, and that includes nourishing the mother."
                }
              ].map((value, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="bg-sage w-12 h-12 rounded-full items-center justify-center mr-4 mt-1">
                    <Ionicons name={value.icon as any} size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-charcoal text-xl font-semibold mb-2">
                      {value.title}
                    </Text>
                    <Text className="text-charcoal text-base leading-5">
                      {value.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Team Section */}
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <Text className="text-charcoal text-2xl font-bold mb-4">
              Our Team
            </Text>
            <Text className="text-charcoal text-base leading-6 mb-4">
              Mothership is a team of mothers, nutritionists, and chefs who understand the 
              unique challenges of the postpartum period. We work with registered dietitians 
              specializing in maternal health to ensure every meal supports optimal recovery.
            </Text>
            <Text className="text-charcoal text-base leading-6">
              Our culinary team includes mothers from diverse cultural backgrounds, bringing 
              authentic postpartum traditions from around the world to your table.
            </Text>
          </View>

          {/* Call to Action */}
          <View className="bg-dustyRose/20 rounded-2xl p-6 text-center">
            <Text className="text-charcoal text-2xl font-bold mb-4 text-center">
              Ready to Nourish Your Journey?
            </Text>
            <Text className="text-charcoal text-base leading-6 mb-6 text-center">
              Join thousands of mothers who have trusted Mothership to support their 
              postpartum recovery with traditional wisdom and modern convenience.
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Shop" as never)}
              className="bg-sage py-4 rounded-full items-center mb-3"
            >
              <Text className="text-white font-bold text-lg">Shop Our Meals</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Contact" as never)}
              className="bg-white border-2 border-sage py-4 rounded-full items-center"
            >
              <Text className="text-sage font-semibold text-lg">Get in Touch</Text>
            </Pressable>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}