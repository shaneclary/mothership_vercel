import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useMembershipStore } from "../state/membershipStore";
import { cn } from "../utils/cn";

export default function MemberSettingsScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const {
    user,
    notificationPreferences,
    membershipStats,
    updateProfile,
    updateNotificationPreferences,
    logout
  } = useMembershipStore();

  const handleEditProfile = () => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || ""
      });
      setShowProfileModal(true);
    }
  };

  const handleSaveProfile = () => {
    updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
      phone: profileForm.phone || undefined
    });
    setShowProfileModal(false);
    Alert.alert("Profile Updated", "Your profile has been successfully updated.");
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your membership account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Main" }],
            });
          }
        }
      ]
    );
  };

  const notificationSettings = [
    {
      key: "emailNotifications" as keyof typeof notificationPreferences,
      title: "Email Notifications",
      description: "Receive updates via email"
    },
    {
      key: "pushNotifications" as keyof typeof notificationPreferences,
      title: "Push Notifications",
      description: "Receive push notifications on your device"
    },
    {
      key: "orderReminders" as keyof typeof notificationPreferences,
      title: "Order Reminders",
      description: "Get reminded about upcoming deliveries"
    },
    {
      key: "eventUpdates" as keyof typeof notificationPreferences,
      title: "Event Updates",
      description: "Notifications about events and classes"
    },
    {
      key: "promoOffers" as keyof typeof notificationPreferences,
      title: "Promotional Offers",
      description: "Special offers and deals"
    },
    {
      key: "resourceUpdates" as keyof typeof notificationPreferences,
      title: "New Resources",
      description: "When new digital content is available"
    }
  ];

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          title: "Edit Profile",
          description: "Update your personal information",
          icon: "person-outline" as const,
          onPress: handleEditProfile
        },
        {
          id: "address",
          title: "Delivery Addresses",
          description: "Manage your delivery addresses",
          icon: "location-outline" as const,
          onPress: () => Alert.alert("Coming Soon", "This feature will be available soon.")
        },
        {
          id: "payment",
          title: "Payment Methods",
          description: "Manage your payment methods",
          icon: "card-outline" as const,
          onPress: () => Alert.alert("Coming Soon", "This feature will be available soon.")
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          title: "Help Center",
          description: "Get answers to common questions",
          icon: "help-circle-outline" as const,
          onPress: () => Alert.alert("Help Center", "Visit our help center for support.")
        },
        {
          id: "contact",
          title: "Contact Support",
          description: "Get in touch with our support team",
          icon: "chatbubble-outline" as const,
          onPress: () => navigation.navigate("Main", { screen: "Contact" })
        },
        {
          id: "website",
          title: "Browse Website",
          description: "Return to main Mothership website to shop for meals",
          icon: "storefront-outline" as const,
          onPress: () => navigation.navigate("Main", { screen: "Home" })
        },
        {
          id: "feedback",
          title: "Send Feedback",
          description: "Share your thoughts with us",
          icon: "star-outline" as const,
          onPress: () => Alert.alert("Feedback", "Thank you for your interest in providing feedback!")
        }
      ]
    },
    {
      title: "Legal",
      items: [
        {
          id: "privacy",
          title: "Privacy Policy",
          description: "Review our privacy policy",
          icon: "shield-outline" as const,
          onPress: () => Alert.alert("Privacy Policy", "View our privacy policy on our website.")
        },
        {
          id: "terms",
          title: "Terms of Service",
          description: "Review our terms of service",
          icon: "document-text-outline" as const,
          onPress: () => Alert.alert("Terms of Service", "View our terms of service on our website.")
        }
      ]
    }
  ];

  const ProfileModal = () => (
    <Modal
      visible={showProfileModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-cream">
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
          <Pressable onPress={() => setShowProfileModal(false)}>
            <Text className="text-sage font-semibold">Cancel</Text>
          </Pressable>
          <Text className="text-charcoal font-semibold text-lg">Edit Profile</Text>
          <Pressable onPress={handleSaveProfile}>
            <Text className="text-sage font-semibold">Save</Text>
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-6 pt-6">
          <View className="space-y-4">
            <View>
              <Text className="text-charcoal font-semibold mb-2">First Name</Text>
              <TextInput
                value={profileForm.firstName}
                onChangeText={(text) => setProfileForm(prev => ({ ...prev, firstName: text }))}
                className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-charcoal"
                placeholder="First name"
              />
            </View>

            <View>
              <Text className="text-charcoal font-semibold mb-2">Last Name</Text>
              <TextInput
                value={profileForm.lastName}
                onChangeText={(text) => setProfileForm(prev => ({ ...prev, lastName: text }))}
                className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-charcoal"
                placeholder="Last name"
              />
            </View>

            <View>
              <Text className="text-charcoal font-semibold mb-2">Email</Text>
              <TextInput
                value={profileForm.email}
                onChangeText={(text) => setProfileForm(prev => ({ ...prev, email: text }))}
                className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-charcoal"
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-charcoal font-semibold mb-2">Phone (Optional)</Text>
              <TextInput
                value={profileForm.phone}
                onChangeText={(text) => setProfileForm(prev => ({ ...prev, phone: text }))}
                className="bg-white rounded-xl px-4 py-3 border border-gray-200 text-charcoal"
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Profile Header */}
        {user && (
          <View className="px-6 py-6 bg-white mx-6 mt-6 rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-4">
              <View className="bg-sage w-16 h-16 rounded-full items-center justify-center mr-4">
                <Text className="text-white text-2xl font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-charcoal text-xl font-bold">
                  {user.firstName} {user.lastName}
                </Text>
                <Text className="text-charcoal/70">{user.email}</Text>
                {membershipStats && (
                  <Text className="text-sage text-sm font-semibold mt-1">
                    Member since {new Date(membershipStats.memberSince).toLocaleDateString("en-US", { 
                      month: "long", 
                      year: "numeric" 
                    })}
                  </Text>
                )}
              </View>
            </View>
            
            <Pressable
              onPress={handleEditProfile}
              className="bg-sage/10 py-3 px-4 rounded-xl flex-row items-center justify-center"
            >
              <Ionicons name="create-outline" size={16} color="#A6B8A0" />
              <Text className="text-sage font-semibold ml-2">Edit Profile</Text>
            </Pressable>
          </View>
        )}

        {/* Notification Preferences */}
        <View className="px-6 mt-6">
          <Text className="text-charcoal text-lg font-bold mb-4">Notification Preferences</Text>
          
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {notificationSettings.map((setting, index) => (
              <View
                key={setting.key}
                className={cn(
                  "flex-row items-center justify-between p-4",
                  index < notificationSettings.length - 1 && "border-b border-gray-100"
                )}
              >
                <View className="flex-1">
                  <Text className="text-charcoal font-semibold">{setting.title}</Text>
                  <Text className="text-charcoal/60 text-sm">{setting.description}</Text>
                </View>
                <Switch
                  value={notificationPreferences[setting.key]}
                  onValueChange={(value) => 
                    updateNotificationPreferences({ [setting.key]: value })
                  }
                  trackColor={{ false: "#D1D5DB", true: "#A6B8A0" }}
                  thumbColor="white"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <View key={section.title} className="px-6 mt-6">
            <Text className="text-charcoal text-lg font-bold mb-4">{section.title}</Text>
            
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {section.items.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={item.onPress}
                  className={cn(
                    "flex-row items-center p-4",
                    index < section.items.length - 1 && "border-b border-gray-100"
                  )}
                >
                  <View className="bg-sage/10 w-10 h-10 rounded-full items-center justify-center mr-4">
                    <Ionicons name={item.icon} size={20} color="#A6B8A0" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold">{item.title}</Text>
                    <Text className="text-charcoal/60 text-sm">{item.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View className="px-6 mt-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-charcoal font-semibold">App Version</Text>
              <Text className="text-charcoal/70">1.0.0</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-charcoal font-semibold">Build</Text>
              <Text className="text-charcoal/70">2024.01.01</Text>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <View className="px-6 mt-6 mb-6">
          <Pressable
            onPress={handleLogout}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex-row items-center justify-center"
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="text-red-600 font-semibold text-lg ml-2">Sign Out</Text>
          </Pressable>
        </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      <ProfileModal />
    </SafeAreaView>
  );
}