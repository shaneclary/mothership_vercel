import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useMembershipStore } from "../state/membershipStore";
import { SubscriptionStatus, MealPlanSize, MealSelectionType } from "../types/membership";
import { cn } from "../utils/cn";

export default function SubscriptionManagementScreen() {
  const insets = useSafeAreaInsets();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    subscription,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    changeMealPlanSize,
    changeSelectionType,
    skipNextDelivery,
    updateSubscription,
    hasPreviousSelections,
    getPreviousSelection
  } = useMembershipStore();

  if (!subscription) {
    return (
      <SafeAreaView className="flex-1 bg-cream justify-center items-center">
        <Text className="text-charcoal text-lg">No subscription found</Text>
      </SafeAreaView>
    );
  }

  const handlePauseSubscription = () => {
    Alert.alert(
      "Pause Subscription",
      "When would you like to pause your subscription until?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Choose Date",
          onPress: () => setShowDatePicker(true)
        }
      ]
    );
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      pauseSubscription(date.toISOString());
      Alert.alert("Subscription Paused", `Your subscription has been paused until ${date.toLocaleDateString()}`);
    }
  };

  const handleResumeSubscription = () => {
    Alert.alert(
      "Resume Subscription",
      "Are you ready to resume your regular deliveries?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resume",
          onPress: () => {
            resumeSubscription();
            Alert.alert("Subscription Resumed", "Your subscription is now active again!");
          }
        }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your subscription? You can always reactivate it later.",
      [
        { text: "Keep Subscription", style: "cancel" },
        {
          text: "Cancel Subscription",
          style: "destructive",
          onPress: () => {
            cancelSubscription();
            Alert.alert("Subscription Cancelled", "Your subscription has been cancelled. We're sad to see you go!");
          }
        }
      ]
    );
  };

  const handleSkipDelivery = () => {
    Alert.alert(
      "Skip Next Delivery",
      "This will skip your next scheduled delivery and move it to the following week.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: () => {
            skipNextDelivery();
            Alert.alert("Delivery Skipped", "Your next delivery has been moved to the following week.");
          }
        }
      ]
    );
  };

  const handleChangeMealSize = (size: MealPlanSize) => {
    setIsUpdating(true);
    setTimeout(() => {
      changeMealPlanSize(size);
      setIsUpdating(false);
      Alert.alert("Plan Updated", `Your meal plan has been updated to ${size} meals per delivery.`);
    }, 1000);
  };

  const handleChangeSelectionType = (type: MealSelectionType) => {
    if (type === MealSelectionType.KEEP_PREVIOUS && !hasPreviousSelections()) {
      Alert.alert(
        "No Previous Selections",
        "You need to make at least one custom meal selection before you can use the 'Keep Previous Selection' option."
      );
      return;
    }
    
    changeSelectionType(type);
    let message = "";
    
    switch (type) {
      case MealSelectionType.CHEF_CHOICE:
        message = "You'll now receive our chef's weekly selections.";
        break;
      case MealSelectionType.CUSTOM:
        message = "You can now choose your own meals from our weekly menu.";
        break;
      case MealSelectionType.KEEP_PREVIOUS:
        const previousCount = getPreviousSelection()?.length || 0;
        message = `Your previous selection of ${previousCount} meals will be repeated for future deliveries.`;
        break;
    }
    
    Alert.alert("Selection Type Updated", message);
  };

  const mealSizeOptions = [
    { size: MealPlanSize.SMALL, label: "8 meals", price: 119.99 },
    { size: MealPlanSize.MEDIUM, label: "12 meals", price: 159.99 },
    { size: MealPlanSize.LARGE, label: "16 meals", price: 199.99 },
  ];

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE: return "bg-green-100 text-green-800";
      case SubscriptionStatus.PAUSED: return "bg-yellow-100 text-yellow-800";
      case SubscriptionStatus.CANCELLED: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Current Status */}
        <View className="px-6 py-6">
          <Text className="text-charcoal text-2xl font-bold mb-4">Your Subscription</Text>
          
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-charcoal text-lg font-semibold">Current Status</Text>
              <View className={cn("px-3 py-1 rounded-full", getStatusColor(subscription.status))}>
                <Text className="text-sm font-semibold">{getStatusText(subscription.status)}</Text>
              </View>
            </View>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Plan Size</Text>
                <Text className="text-charcoal font-semibold">{subscription.mealPlanSize} meals</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Monthly Price</Text>
                <Text className="text-charcoal font-semibold">${subscription.price}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Next Delivery</Text>
                <Text className="text-charcoal font-semibold">
                  {new Date(subscription.nextDeliveryDate).toLocaleDateString()}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-charcoal/70">Meal Selection</Text>
                <Text className="text-charcoal font-semibold capitalize">
                  {subscription.selectionType === MealSelectionType.KEEP_PREVIOUS 
                    ? "Keep Previous" 
                    : subscription.selectionType.replace("_", " ")
                  }
                </Text>
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
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-charcoal text-lg font-bold mb-4">Quick Actions</Text>
          
          <View className="space-y-3">
            {subscription.status === SubscriptionStatus.ACTIVE && (
              <>
                <Pressable
                  onPress={handlePauseSubscription}
                  className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-gray-200"
                >
                  <View className="flex-row items-center">
                    <View className="bg-yellow-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Ionicons name="pause-circle-outline" size={20} color="#B45309" />
                    </View>
                    <View>
                      <Text className="text-charcoal font-semibold">Pause Subscription</Text>
                      <Text className="text-charcoal/60 text-sm">Temporarily stop deliveries</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </Pressable>

                <Pressable
                  onPress={handleSkipDelivery}
                  className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-gray-200"
                >
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Ionicons name="play-skip-forward-outline" size={20} color="#1D4ED8" />
                    </View>
                    <View>
                      <Text className="text-charcoal font-semibold">Skip Next Delivery</Text>
                      <Text className="text-charcoal/60 text-sm">Move delivery to next week</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </Pressable>
              </>
            )}

            {subscription.status === SubscriptionStatus.PAUSED && (
              <Pressable
                onPress={handleResumeSubscription}
                className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-gray-200"
              >
                <View className="flex-row items-center">
                  <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                    <Ionicons name="play-circle-outline" size={20} color="#059669" />
                  </View>
                  <View>
                    <Text className="text-charcoal font-semibold">Resume Subscription</Text>
                    <Text className="text-charcoal/60 text-sm">Restart regular deliveries</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </Pressable>
            )}

            <Pressable
              onPress={handleCancelSubscription}
              className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-gray-200"
            >
              <View className="flex-row items-center">
                <View className="bg-red-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
                </View>
                <View>
                  <Text className="text-charcoal font-semibold">Cancel Subscription</Text>
                  <Text className="text-charcoal/60 text-sm">End your membership</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </View>
        </View>

        {/* Plan Size Options */}
        <View className="px-6 mb-6">
          <Text className="text-charcoal text-lg font-bold mb-4">Change Plan Size</Text>
          
          {isUpdating ? (
            <View className="bg-white rounded-xl p-6 items-center">
              <ActivityIndicator size="large" color="#A6B8A0" />
              <Text className="text-charcoal/70 mt-2">Updating your plan...</Text>
            </View>
          ) : (
            <View className="space-y-3">
              {mealSizeOptions.map((option) => (
                <Pressable
                  key={option.size}
                  onPress={() => handleChangeMealSize(option.size)}
                  className={cn(
                    "bg-white rounded-xl p-4 border-2",
                    subscription.mealPlanSize === option.size
                      ? "border-sage bg-sage/5"
                      : "border-gray-200"
                  )}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-charcoal font-semibold text-base">{option.label}</Text>
                      <Text className="text-charcoal/60 text-sm">${option.price}/month</Text>
                    </View>
                    
                    <View className="flex-row items-center">
                      {subscription.mealPlanSize === option.size && (
                        <View className="bg-sage mr-2 w-6 h-6 rounded-full items-center justify-center">
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                      )}
                      <Text className="text-charcoal/60 text-sm">
                        ${(option.price / option.size).toFixed(2)}/meal
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Meal Selection Type */}
        <View className="px-6 mb-6">
          <Text className="text-charcoal text-lg font-bold mb-4">Meal Selection</Text>
          
          <View className="space-y-3">
            <Pressable
              onPress={() => handleChangeSelectionType(MealSelectionType.CHEF_CHOICE)}
              className={cn(
                "bg-white rounded-xl p-4 border-2",
                subscription.selectionType === MealSelectionType.CHEF_CHOICE
                  ? "border-sage bg-sage/5"
                  : "border-gray-200"
              )}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-charcoal font-semibold">Chef's Choice</Text>
                  <Text className="text-charcoal/60 text-sm">Let our chefs surprise you with weekly selections</Text>
                </View>
                {subscription.selectionType === MealSelectionType.CHEF_CHOICE && (
                  <View className="bg-sage w-6 h-6 rounded-full items-center justify-center ml-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={() => handleChangeSelectionType(MealSelectionType.CUSTOM)}
              className={cn(
                "bg-white rounded-xl p-4 border-2",
                subscription.selectionType === MealSelectionType.CUSTOM
                  ? "border-sage bg-sage/5"
                  : "border-gray-200"
              )}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-charcoal font-semibold">Custom Selection</Text>
                  <Text className="text-charcoal/60 text-sm">Choose your own meals from our weekly menu</Text>
                </View>
                {subscription.selectionType === MealSelectionType.CUSTOM && (
                  <View className="bg-sage w-6 h-6 rounded-full items-center justify-center ml-3">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>
            </Pressable>

            {hasPreviousSelections() && (
              <Pressable
                onPress={() => handleChangeSelectionType(MealSelectionType.KEEP_PREVIOUS)}
                className={cn(
                  "bg-white rounded-xl p-4 border-2",
                  subscription.selectionType === MealSelectionType.KEEP_PREVIOUS
                    ? "border-sage bg-sage/5"
                    : "border-gray-200"
                )}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold">Keep Previous Selection</Text>
                    <Text className="text-charcoal/60 text-sm">
                      Repeat your last meal selection automatically
                      {subscription.lastSelectionDate && (
                        ` • Last selected ${new Date(subscription.lastSelectionDate).toLocaleDateString()}`
                      )}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-3">
                    {subscription.selectionType === MealSelectionType.KEEP_PREVIOUS && (
                      <View className="bg-sage w-6 h-6 rounded-full items-center justify-center mr-2">
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    )}
                    <View className="bg-terracotta/10 w-8 h-8 rounded-full items-center justify-center">
                      <Ionicons name="repeat-outline" size={18} color="#CBA392" />
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
        </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}