import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useMembershipStore } from "../state/membershipStore";
import { useFontContext } from "../context/FontContext";
import safeLogger from "../utils/safeLogger";

export default function MembershipPortalDemo() {
  const navigation = useNavigation<any>();
  const [isReady, setIsReady] = useState(false);
  const { fontsLoaded } = useFontContext();
  const { isAuthenticated, user, subscription } = useMembershipStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    safeLogger.info('Portal screen mounted, starting initialization', undefined, 'MembershipPortalDemo');
    const timer = setTimeout(() => {
      safeLogger.info('Portal screen ready for rendering', undefined, 'MembershipPortalDemo');
      setIsReady(true);
    }, 50);
    return () => {
      safeLogger.info('Portal screen unmounting', undefined, 'MembershipPortalDemo');
      clearTimeout(timer);
    };
  }, []);

  const handleNavigateToSignup = () => {
    safeLogger.info('Navigating to Signup screen', undefined, 'MembershipPortalDemo');
    try {
      navigation.navigate("Signup");
    } catch (error) {
      safeLogger.error('Signup navigation error', {
        error: error instanceof Error ? error.message : String(error)
      }, 'MembershipPortalDemo');
    }
  };

  const handleNavigateToLogin = () => {
    safeLogger.info('Navigating to Login screen', undefined, 'MembershipPortalDemo');
    try {
      navigation.navigate("Login");
    } catch (error) {
      safeLogger.error('Login navigation error', {
        error: error instanceof Error ? error.message : String(error)
      }, 'MembershipPortalDemo');
    }
  };

  const handleNavigateToPortal = () => {
    safeLogger.info('Navigating to MembershipPortal', undefined, 'MembershipPortalDemo');
    try {
      navigation.navigate("MembershipPortal");
    } catch (error) {
      safeLogger.error('MembershipPortal navigation error', {
        error: error instanceof Error ? error.message : String(error)
      }, 'MembershipPortalDemo');
    }
  };

  safeLogger.info('Portal screen render', { isReady, isAuthenticated }, 'MembershipPortalDemo');

  if (!isReady) {
    return (
      <SafeAreaView className="flex-1 bg-cream items-center justify-center">
        <View className="bg-sage rounded-2xl p-6 mx-6">
          <View className="flex-row items-center justify-center">
            <Ionicons name="star" size={24} color="white" />
            <Text className="text-white text-xl font-bold ml-3">Mothership Membership</Text>
          </View>
          <Text
            className="text-white/90 text-center mt-2"
            style={{ fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : undefined }}
          >
            Loading Mothership Portal...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView 
        className="flex-1" 
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">
          {isAuthenticated && user && subscription ? (
            // Authenticated user view
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-charcoal text-lg font-bold">Your Membership</Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-sm font-semibold">Active</Text>
                </View>
              </View>

              <View className="space-y-3 mb-4">
                <View className="flex-row justify-between">
                  <Text className="text-charcoal/70">Plan Size</Text>
                  <Text className="text-charcoal font-semibold">{subscription.mealPlanSize} meals</Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-charcoal/70">Monthly Price</Text>
                  <Text className="text-charcoal font-semibold">${subscription.price}</Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-charcoal/70">Total Savings</Text>
                  <Text className="text-green-600 font-bold">${subscription.totalSavings.toFixed(2)}</Text>
                </View>
              </View>

              <Pressable
                onPress={handleNavigateToPortal}
                className="bg-sage rounded-xl py-3 flex-row items-center justify-center"
              >
                <Ionicons name="settings-outline" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">Manage Membership</Text>
              </Pressable>
            </View>
          ) : (
            // Non-authenticated user view
            <View className="bg-sage rounded-2xl p-6">
              <View className="flex-row items-center mb-4">
                <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mr-4">
                  <Ionicons name="star" size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-xl font-bold">Join Our Membership</Text>
                  <Text className="text-white/90 text-sm">Get exclusive perks and resources</Text>
                </View>
              </View>

              <View className="space-y-2 mb-6">
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
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color="white" />
                  <Text className="text-white ml-2 text-sm">Referral rewards program</Text>
                </View>
              </View>

              <View className="flex-row space-x-3">
                <Pressable
                  onPress={handleNavigateToSignup}
                  className="flex-1 bg-white py-3 rounded-xl"
                >
                  <Text className="text-sage font-semibold text-center">Join Now</Text>
                </Pressable>
                <Pressable
                  onPress={handleNavigateToLogin}
                  className="flex-1 bg-white/20 border border-white py-3 rounded-xl"
                >
                  <Text className="text-white font-semibold text-center">Sign In</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
