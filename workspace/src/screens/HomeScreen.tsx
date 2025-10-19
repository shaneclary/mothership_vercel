import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAppStore } from "../state/appStore";
import { useMembershipStore } from "../state/membershipStore";
import { mockMeals, mockTestimonials } from "../utils/mockData";
import GiftCardPromo from "../components/GiftCardPromo";
import NavigationErrorBoundary from "../components/NavigationErrorBoundary";
import safeLogger from "../utils/safeLogger";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { userEmail, setUserEmail, isSubscribed, setSubscribed } = useAppStore();
  const { isAuthenticated, user } = useMembershipStore();
  const [emailInput, setEmailInput] = React.useState("");

  const handleEmailSignup = () => {
    if (!emailInput.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    if (!emailInput.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    
    setUserEmail(emailInput);
    setSubscribed(true);
    Alert.alert("Success!", "Thank you for subscribing! You'll receive exclusive postpartum nourishment tips.");
    setEmailInput("");
  };

  const featuredMeals = mockMeals.slice(0, 3);

  return (
    <ScrollView 
      className="flex-1 bg-cream"
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Hero Section */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        }}
        className="h-96 relative"
        imageStyle={{ opacity: 0.8 }}
      >
        <View className="absolute inset-0 bg-black/30" />
        <SafeAreaView className="flex-1 justify-center items-center px-6">
          <Text className="text-white text-4xl font-bold text-center mb-4">
            Nourishment for the Fourth Trimester
          </Text>
          <Text className="text-white text-lg text-center mb-8 leading-6">
            Wholesome frozen meals inspired by ancient postpartum care — delivered to your door.
          </Text>
          <View className="flex-row space-x-4">
            <Pressable
              onPress={() => navigation.navigate("Main", { screen: "Shop" })}
              className="bg-sage px-8 py-4 rounded-full"
            >
              <Text className="text-white font-semibold text-lg">Shop Meals</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("HowItWorks")}
              className="bg-white/20 border border-white px-6 py-4 rounded-full"
            >
              <Text className="text-white font-semibold text-lg">Learn How</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Brand Story Section */}
      <View className="px-6 py-12">
        <View className="flex-row items-center">
          <View className="flex-1 pr-6">
            <Text className="text-charcoal text-3xl font-bold mb-4">
              Created by Mothers, for Mothers
            </Text>
            <Text className="text-charcoal text-base leading-6 mb-6">
              Mothership was born from the belief that new mothers deserve to be nourished and cared for. 
              Inspired by ancient postpartum traditions from around the world, we deliver nutrient-rich 
              frozen meals designed to support recovery, energy, and emotional well-being.
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Main", { screen: "About" })}
              className="self-start"
            >
              <Text className="text-sage font-semibold text-lg">Read Our Story →</Text>
            </Pressable>
          </View>
          <View className="w-32 h-32 rounded-full overflow-hidden">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View className="bg-sage/10 py-12">
        <View className="px-6">
          <Text className="text-charcoal text-3xl font-bold text-center mb-8">
            How It Works
          </Text>
          <View className="space-y-8">
            {[
              {
                icon: "heart-outline",
                title: "Choose Your Plan",
                description: "Select from our curated meal plans designed for postpartum nourishment",
              },
              {
                icon: "flame-outline", 
                title: "We Cook & Freeze",
                description: "Our meals are prepared fresh and flash-frozen to preserve nutrients",
              },
              {
                icon: "car-outline",
                title: "Delivered to Your Door",
                description: "Receive your meals frozen, ready to heat and enjoy when you need them",
              },
            ].map((step, index) => (
              <View key={index} className="flex-row items-start">
                <View className="bg-sage w-12 h-12 rounded-full items-center justify-center mr-4">
                  <Ionicons name={step.icon as any} size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-charcoal text-xl font-semibold mb-2">
                    {step.title}
                  </Text>
                  <Text className="text-charcoal text-base leading-5">
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => navigation.navigate("HowItWorks")}
            className="bg-sage px-8 py-4 rounded-full mt-8 self-center"
          >
            <Text className="text-white font-semibold text-lg">Learn More</Text>
          </Pressable>
        </View>
      </View>

      {/* Featured Meals Section */}
      <View className="py-12 px-6">
        <Text className="text-charcoal text-3xl font-bold text-center mb-8">
          Featured Meals
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
          {featuredMeals.map((meal, index) => (
            <Pressable
              key={meal.id}
              onPress={() => navigation.navigate("ProductDetail", { mealId: meal.id })}
              className="w-72 bg-white rounded-2xl shadow-sm mr-4"
            >
              <Image
                source={{ uri: meal.image }}
                className="w-full h-48 rounded-t-2xl"
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-charcoal text-xl font-semibold mb-2">
                  {meal.name}
                </Text>
                <Text className="text-charcoal/70 text-base mb-3 leading-5">
                  {meal.description}
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-sage text-2xl font-bold">
                    ${meal.price}
                  </Text>
                  <View className="bg-terracotta/20 px-3 py-1 rounded-full">
                    <Text className="text-terracotta font-semibold capitalize">
                      {meal.category}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          onPress={() => navigation.navigate("Main", { screen: "Shop" })}
          className="bg-white border-2 border-sage px-8 py-4 rounded-full mt-8 self-center"
        >
          <Text className="text-sage font-semibold text-lg">View All Meals</Text>
        </Pressable>
      </View>

      {/* Gift Card Promo */}
      <View className="px-6">
        <NavigationErrorBoundary>
          <GiftCardPromo onNavigateToGiftCard={() => {
            safeLogger.info('Navigating to GiftCard', undefined, 'HomeScreen');
            try {
              navigation.navigate("GiftCard");
            } catch (error) {
              safeLogger.error('GiftCard navigation error', { 
                error: error instanceof Error ? error.message : String(error) 
              }, 'HomeScreen');
            }
          }} />
        </NavigationErrorBoundary>
      </View>

      {/* Mothership Portal Navigation */}
      <NavigationErrorBoundary>
        <View className="px-6">
          <Pressable
            onPress={() => {
              safeLogger.info('Navigating to Portal screen', undefined, 'HomeScreen');
              try {
                navigation.navigate("Portal");
              } catch (error) {
                safeLogger.error('Portal navigation error', { 
                  error: error instanceof Error ? error.message : String(error) 
                }, 'HomeScreen');
              }
            }}
            className="bg-sage rounded-2xl p-6 mb-6"
          >
            <View className="flex-row items-center mb-4">
              <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="star" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold">Mothership Membership</Text>
                <Text className="text-white/90 text-sm">Join our community for exclusive benefits</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>

            <View className="space-y-2 mb-4">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text className="text-white ml-2 text-sm">10% off all meals</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text className="text-white ml-2 text-sm">Digital postpartum resources</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text className="text-white ml-2 text-sm">Early access to events & classes</Text>
              </View>
            </View>

            <View className="bg-white/20 py-2 px-4 rounded-full self-center">
              <Text className="text-white font-semibold">Learn More & Join</Text>
            </View>
          </Pressable>
        </View>
      </NavigationErrorBoundary>

      {/* Testimonials Section */}
      <View className="bg-dustyRose/20 py-12">
        <View className="px-6">
          <Text className="text-charcoal text-3xl font-bold text-center mb-8">
            What Mothers Say
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockTestimonials.map((testimonial, index) => (
              <View
                key={testimonial.id}
                className="w-80 bg-white rounded-2xl p-6 shadow-sm mr-4"
              >
                <Text className="text-charcoal text-lg italic leading-6 mb-4">
                  "{testimonial.quote}"
                </Text>
                <View className="flex-row items-center">
                  <View className="bg-sage/20 w-10 h-10 rounded-full items-center justify-center mr-3">
                    <Text className="text-sage font-bold text-lg">
                      {testimonial.name[0]}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-charcoal font-semibold">
                      {testimonial.name}
                    </Text>
                    {testimonial.title && (
                      <Text className="text-charcoal/60 text-sm">
                        {testimonial.title}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Email Signup Section */}
      <View className="bg-sage py-12">
        <View className="px-6">
          <Text className="text-white text-3xl font-bold text-center mb-4">
            Stay Connected, Mama
          </Text>
          <Text className="text-white/90 text-lg text-center mb-8">
            Sign up for postpartum nourishment tips and exclusive offers.
          </Text>
          {!isSubscribed ? (
            <View className="bg-white rounded-full p-2 flex-row">
              <TextInput
                value={emailInput}
                onChangeText={setEmailInput}
                placeholder="Enter your email"
                placeholderTextColor="#A6B8A0"
                className="flex-1 px-4 py-2 text-charcoal"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable
                onPress={handleEmailSignup}
                className="bg-sage px-6 py-2 rounded-full"
              >
                <Text className="text-white font-semibold">Subscribe</Text>
              </Pressable>
            </View>
          ) : (
            <View className="bg-white/20 rounded-full p-4">
              <Text className="text-white text-center font-semibold">
                ✓ Thank you for subscribing!
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ height: insets.bottom + 20 }} />
    </ScrollView>
  );
}