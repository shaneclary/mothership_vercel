import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useMembershipStore } from "../state/membershipStore";
import { useFontContext } from "../context/FontContext";
import { SubscriptionStatus, MealPlanSize } from "../types/membership";
import { cn } from "../utils/cn";

export default function MembershipDashboardScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const { fontsLoaded } = useFontContext();
  
  const {
    user,
    subscription,
    membershipStats,
    upcomingShipments,
    availableEvents,
    eventRegistrations,
    digitalResources,
    completedResources,
    syncWithServer
  } = useMembershipStore();

  const handleRefresh = async () => {
    setRefreshing(true);
    await syncWithServer();
    setRefreshing(false);
  };

  const getNextDeliveryDate = () => {
    if (!subscription?.nextDeliveryDate) return "Not scheduled";
    const date = new Date(subscription.nextDeliveryDate);
    return date.toLocaleDateString("en-US", { 
      weekday: "long",
      month: "short", 
      day: "numeric" 
    });
  };

  const getMealPlanSizeText = (size: MealPlanSize) => {
    switch (size) {
      case MealPlanSize.SMALL: return "8 meals";
      case MealPlanSize.MEDIUM: return "12 meals";
      case MealPlanSize.LARGE: return "16 meals";
      default: return "Not set";
    }
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE: return "text-green-600";
      case SubscriptionStatus.PAUSED: return "text-yellow-600";
      case SubscriptionStatus.CANCELLED: return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusText = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE: return "Active";
      case SubscriptionStatus.PAUSED: return "Paused";
      case SubscriptionStatus.CANCELLED: return "Cancelled";
      default: return "Unknown";
    }
  };

  const quickActions = [
    {
      id: "pause",
      title: "Pause",
      description: "Skip deliveries",
      icon: "pause-circle-outline" as const,
      color: "bg-yellow-100",
      iconColor: "#B45309",
      onPress: () => navigation.navigate("SubscriptionManagement", { tab: "pause" })
    },
    {
      id: "skip",
      title: "Skip",
      description: "Skip next delivery",
      icon: "play-skip-forward-outline" as const,
      color: "bg-blue-100",
      iconColor: "#1D4ED8",
      onPress: () => navigation.navigate("SubscriptionManagement", { tab: "skip" })
    },
    {
      id: "change",
      title: "Change Size",
      description: "Modify meal count",
      icon: "resize-outline" as const,
      color: "bg-purple-100",
      iconColor: "#6D28D9",
      onPress: () => navigation.navigate("SubscriptionManagement", { tab: "size" })
    },
    {
      id: "meals",
      title: "Edit Meals",
      description: "Choose preferences",
      icon: "restaurant-outline" as const,
      color: "bg-green-100",
      iconColor: "#059669",
      onPress: () => navigation.navigate("SubscriptionManagement", { tab: "meals" })
    }
  ];

  const upcomingEvent = availableEvents.find(event => {
    const registration = eventRegistrations.find(reg => 
      reg.eventId === event.id && reg.status === "registered"
    );
    return registration && event.status === "upcoming";
  });

  const recentResource = digitalResources.find(resource => 
    !completedResources.includes(resource.id)
  );

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#A6B8A0"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-charcoal text-2xl font-bold mb-1">
            Welcome back, {user?.firstName || "Member"}
          </Text>
          <Text 
            className="text-charcoal/70 text-base"
            style={{
              fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : undefined
            }}
          >
            Your Mothership Portal — manage your nourishment journey
          </Text>
        </View>

        {/* Subscription Status Card */}
        {subscription && (
          <View className="mx-6 mb-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <Text className="text-charcoal text-xl font-bold mb-1">
                  Your Subscription
                </Text>
                <View className="flex-row items-center">
                  <View className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    subscription.status === SubscriptionStatus.ACTIVE ? "bg-green-500" :
                    subscription.status === SubscriptionStatus.PAUSED ? "bg-yellow-500" :
                    "bg-red-500"
                  )} />
                  <Text className={cn("font-semibold capitalize", getStatusColor(subscription.status))}>
                    {getStatusText(subscription.status)}
                  </Text>
                </View>
              </View>
              
              <View className="bg-sage/10 px-3 py-1 rounded-full">
                <Text className="text-sage font-semibold">
                  ${subscription.price}/month
                </Text>
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Next delivery</Text>
                <Text className="text-charcoal font-semibold">{getNextDeliveryDate()}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Meal plan size</Text>
                <Text className="text-charcoal font-semibold">
                  {getMealPlanSizeText(subscription.mealPlanSize)}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Total savings</Text>
                <Text className="text-green-600 font-bold">${subscription.totalSavings.toFixed(2)}</Text>
              </View>
            </View>

            {subscription.status === SubscriptionStatus.PAUSED && subscription.pausedUntil && (
              <View className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <Text className="text-yellow-800 text-sm">
                  Paused until {new Date(subscription.pausedUntil).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-lg font-bold mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap space-3">
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                onPress={action.onPress}
                className={cn(
                  "basis-1/2 min-h-28 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
                )}
              >
                <View className={cn("w-12 h-12 rounded-full items-center justify-center mb-3", action.color)}>
                  <Ionicons name={action.icon} size={24} color={action.iconColor} />
                </View>
                <Text className="text-charcoal text-base font-semibold mb-1">{action.title}</Text>
                <Text className="text-charcoal/60 text-sm">{action.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Upcoming Event */}
        {upcomingEvent && (
          <View className="px-6 mb-6">
            <Text className="text-charcoal text-lg font-bold mb-4">Your Next Event</Text>
            <Pressable
              onPress={() => navigation.navigate("EventsClasses")}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {upcomingEvent.imageUrl && (
                <Image
                  source={{ uri: upcomingEvent.imageUrl }}
                  className="w-full h-24"
                  resizeMode="cover"
                />
              )}
              <View className="p-4">
                <Text className="text-charcoal font-bold text-base mb-1">
                  {upcomingEvent.title}
                </Text>
                <Text className="text-charcoal/70 text-sm mb-2" numberOfLines={2}>
                  {upcomingEvent.description}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={14} color="#A6B8A0" />
                  <Text className="text-sage text-sm ml-1">
                    {new Date(upcomingEvent.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* Continue Learning */}
        {recentResource && (
          <View className="px-6 mb-6">
            <Text className="text-charcoal text-lg font-bold mb-4">Continue Learning</Text>
            <Pressable
              onPress={() => navigation.navigate("DigitalResources")}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
            >
              {recentResource.thumbnailUrl && (
                <Image
                  source={{ uri: recentResource.thumbnailUrl }}
                  className="w-16 h-16 rounded-xl mr-4"
                  resizeMode="cover"
                />
              )}
              <View className="flex-1">
                <Text className="text-charcoal font-bold text-base mb-1">
                  {recentResource.title}
                </Text>
                <Text className="text-charcoal/70 text-sm mb-2" numberOfLines={2}>
                  {recentResource.description}
                </Text>
                <View className="flex-row items-center">
                  <View className="bg-terracotta/20 px-2 py-1 rounded-full mr-2">
                    <Text className="text-terracotta text-xs font-semibold capitalize">
                      {recentResource.category.replace("-", " ")}
                    </Text>
                  </View>
                  <Text className="text-sage text-sm">
                    {recentResource.progress || 0}% complete
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#A6B8A0" />
            </Pressable>
          </View>
        )}

        {/* Membership Stats */}
        {membershipStats && (
          <View className="px-6 mb-6">
            <Text className="text-charcoal text-lg font-bold mb-4">Your Journey</Text>
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-charcoal text-base font-semibold">Member since</Text>
                <Text className="text-charcoal">
                  {new Date(membershipStats.memberSince).toLocaleDateString("en-US", { 
                    month: "long", 
                    year: "numeric" 
                  })}
                </Text>
              </View>
              
              <View className="flex-row space-x-4">
                <View className="flex-1 items-center p-3 bg-sage/5 rounded-xl">
                  <Text className="text-sage text-2xl font-bold">{membershipStats.totalOrders}</Text>
                  <Text className="text-charcoal/70 text-sm text-center">Orders</Text>
                </View>
                
                <View className="flex-1 items-center p-3 bg-terracotta/5 rounded-xl">
                  <Text className="text-terracotta text-2xl font-bold">{membershipStats.streakDays}</Text>
                  <Text className="text-charcoal/70 text-sm text-center">Day Streak</Text>
                </View>
                
                <View className="flex-1 items-center p-3 bg-dustyRose/5 rounded-xl">
                  <Text className="text-dustyRose text-2xl font-bold">
                    ${membershipStats.totalSavings.toFixed(0)}
                  </Text>
                  <Text className="text-charcoal/70 text-sm text-center">Saved</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}