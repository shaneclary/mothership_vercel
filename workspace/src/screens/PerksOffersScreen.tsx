import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Share,
  Modal,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useMembershipStore } from "../state/membershipStore";
import { Perk } from "../types/membership";
import { cn } from "../utils/cn";
import { generateReferralCode as genReferral } from "../api/referrals";

export default function PerksOffersScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<"perks" | "referrals">("perks");
  const [selectedPerk, setSelectedPerk] = useState<Perk | null>(null);
  const [showPerkModal, setShowPerkModal] = useState(false);

  const {
    perks,
    referralProgram,
    subscription,
    redeemPerk,
    generateReferralCode
  } = useMembershipStore();

  const activePerks = perks.filter(perk => perk.status === "active");
  const redeemedPerks = perks.filter(perk => perk.status === "redeemed");

  const handlePerkPress = (perk: Perk) => {
    setSelectedPerk(perk);
    setShowPerkModal(true);
  };

  const handleRedeemPerk = (perk: Perk) => {
    if (perk.promoCode) {
      Clipboard.setString(perk.promoCode);
      Alert.alert(
        "Promo Code Copied!",
        `The code "${perk.promoCode}" has been copied to your clipboard. Use it during checkout.`,
        [
          {
            text: "Mark as Used",
            onPress: () => {
              redeemPerk(perk.id);
              setShowPerkModal(false);
            }
          },
          { text: "OK" }
        ]
      );
    } else {
      redeemPerk(perk.id);
      Alert.alert("Perk Redeemed!", "This perk has been marked as used.");
      setShowPerkModal(false);
    }
  };

  const handleShareReferral = async () => {
    if (!referralProgram) return;

    try {
      await Share.share({
        message: `Join me on Mothership! Use my referral code ${referralProgram.referralCode} to get started with nourishing postpartum meals. You'll save money and I'll earn credits too! 🤱✨`,
        title: "Join Mothership with my referral code"
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share referral code");
    }
  };

  const copyReferralCode = () => {
    if (!referralProgram) return;
    
    Clipboard.setString(referralProgram.referralCode);
    Alert.alert("Copied!", "Your referral code has been copied to clipboard.");
  };

  const getPerkTypeIcon = (type: string) => {
    switch (type) {
      case "discount": return "pricetag-outline";
      case "bonus": return "gift-outline";
      case "access": return "key-outline";
      case "referral": return "people-outline";
      default: return "star-outline";
    }
  };

  const getPerkTypeColor = (type: string) => {
    switch (type) {
      case "discount": return "bg-green-100 text-green-700";
      case "bonus": return "bg-purple-100 text-purple-700";
      case "access": return "bg-blue-100 text-blue-700";
      case "referral": return "bg-terracotta/20 text-terracotta";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const tabs = [
    { id: "perks", label: "My Perks", count: activePerks.length },
    { id: "referrals", label: "Share the Mothership", count: referralProgram?.totalReferrals || 0 },
  ];

  const PerkModal = () => {
    if (!selectedPerk) return null;

    const isRedeemed = selectedPerk.status === "redeemed";
    const isExpired = selectedPerk.expiryDate && new Date(selectedPerk.expiryDate) < new Date();

    return (
      <Modal
        visible={showPerkModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-cream">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <Pressable onPress={() => setShowPerkModal(false)}>
              <Ionicons name="close" size={24} color="#4B4B4B" />
            </Pressable>
            <Text className="text-charcoal font-semibold text-lg">Perk Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView className="flex-1 px-6">
            {selectedPerk.imageUrl && (
              <Image
                source={{ uri: selectedPerk.imageUrl }}
                className="w-full h-48 rounded-2xl mt-6 mb-4"
                resizeMode="cover"
              />
            )}

            <View className="flex-row items-center mb-4">
              <View className={cn("px-3 py-1 rounded-full mr-3", getPerkTypeColor(selectedPerk.type))}>
                <Text className="text-sm font-semibold capitalize">{selectedPerk.type}</Text>
              </View>
              {selectedPerk.value && (
                <View className="bg-sage/20 px-3 py-1 rounded-full">
                  <Text className="text-sage font-bold">{selectedPerk.value}</Text>
                </View>
              )}
            </View>

            <Text className="text-charcoal text-2xl font-bold mb-3">
              {selectedPerk.title}
            </Text>

            <Text className="text-charcoal text-base leading-6 mb-6">
              {selectedPerk.description}
            </Text>

            {selectedPerk.partnerName && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="business-outline" size={16} color="#A6B8A0" />
                <Text className="text-charcoal ml-2">Partner: {selectedPerk.partnerName}</Text>
              </View>
            )}

            {selectedPerk.promoCode && (
              <View className="bg-gray-50 p-4 rounded-xl mb-4">
                <Text className="text-charcoal font-semibold mb-2">Promo Code</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-charcoal text-lg font-mono bg-white px-3 py-2 rounded-lg flex-1 mr-3">
                    {selectedPerk.promoCode}
                  </Text>
                  <Pressable
                    onPress={() => {
                      Clipboard.setString(selectedPerk.promoCode!);
                      Alert.alert("Copied!", "Promo code copied to clipboard");
                    }}
                    className="bg-sage px-3 py-2 rounded-lg"
                  >
                    <Ionicons name="copy-outline" size={16} color="white" />
                  </Pressable>
                </View>
              </View>
            )}

            {selectedPerk.expiryDate && (
              <View className="flex-row items-center mb-6">
                <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                <Text className={cn(
                  "ml-2",
                  isExpired ? "text-red-600" : "text-charcoal/70"
                )}>
                  {isExpired ? "Expired" : "Expires"} {new Date(selectedPerk.expiryDate).toLocaleDateString()}
                </Text>
              </View>
            )}

            {selectedPerk.termsUrl && (
              <View className="mb-6">
                <Pressable className="flex-row items-center">
                  <Ionicons name="document-text-outline" size={16} color="#A6B8A0" />
                  <Text className="text-sage ml-2 underline">View Terms & Conditions</Text>
                </Pressable>
              </View>
            )}

            {isRedeemed && (
              <View className="bg-gray-50 p-4 rounded-xl mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#059669" />
                  <Text className="text-green-700 font-semibold ml-2">Already Redeemed</Text>
                </View>
                <Text className="text-gray-600 text-sm mt-1">
                  You've already used this perk
                </Text>
              </View>
            )}

            {isExpired && (
              <View className="bg-red-50 p-4 rounded-xl mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="time" size={20} color="#DC2626" />
                  <Text className="text-red-700 font-semibold ml-2">Expired</Text>
                </View>
                <Text className="text-red-600 text-sm mt-1">
                  This perk has expired and can no longer be used
                </Text>
              </View>
            )}
          </ScrollView>

          {!isRedeemed && !isExpired && (
            <View className="p-6 border-t border-gray-200">
              <Pressable
                onPress={() => handleRedeemPerk(selectedPerk)}
                className="bg-sage rounded-xl py-4 flex-row justify-center items-center"
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text className="text-white font-semibold text-lg ml-2">
                  {selectedPerk.promoCode ? "Copy Code & Mark Used" : "Redeem Perk"}
                </Text>
              </Pressable>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-charcoal text-2xl font-bold mb-2">
          Perks & Offers
        </Text>
        <Text className="text-charcoal/70 text-base">
          Exclusive benefits and rewards for members
        </Text>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-4">
        <View className="bg-white rounded-xl p-1 flex-row border border-gray-200">
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setSelectedTab(tab.id as any)}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg flex-row justify-center items-center",
                selectedTab === tab.id ? "bg-sage" : ""
              )}
            >
              <Text className={cn(
                "font-semibold text-sm",
                selectedTab === tab.id ? "text-white" : "text-charcoal/70"
              )}>
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View className={cn(
                  "ml-2 px-2 py-0.5 rounded-full",
                  selectedTab === tab.id ? "bg-white/20" : "bg-sage/20"
                )}>
                  <Text className={cn(
                    "text-xs font-bold",
                    selectedTab === tab.id ? "text-white" : "text-sage"
                  )}>
                    {tab.count}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
                </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {selectedTab === "perks" && (
          <View className="px-6">
            {/* Subscription Savings Card */}
            {subscription && (
              <View className="bg-sage p-6 rounded-2xl mb-6">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-white text-xl font-bold">Member Savings</Text>
                  <View className="bg-white/20 p-2 rounded-full">
                    <Ionicons name="trending-up" size={24} color="white" />
                  </View>
                </View>
                <Text className="text-white/90 text-base mb-2">
                  You've saved with your membership
                </Text>
                <Text className="text-white text-3xl font-bold">
                  ${subscription.totalSavings.toFixed(2)}
                </Text>
                <Text className="text-white/80 text-sm mt-1">
                  Plus 10% off all individual meals
                </Text>
              </View>
            )}

            {/* Active Perks */}
            <Text className="text-charcoal text-lg font-bold mb-4">Available Perks</Text>
            
            {activePerks.length === 0 ? (
              <View className="bg-white rounded-2xl p-8 items-center mb-6">
                <Ionicons name="gift-outline" size={48} color="#D1D5DB" />
                <Text className="text-charcoal/60 text-lg font-semibold mt-4 mb-2">No Active Perks</Text>
                <Text className="text-charcoal/50 text-center">
                  Check back regularly for new exclusive offers
                </Text>
              </View>
            ) : (
              <View className="space-y-4 mb-6">
                {activePerks.map((perk) => (
                  <Pressable
                    key={perk.id}
                    onPress={() => handlePerkPress(perk)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
                  >
                    {perk.imageUrl ? (
                      <Image
                        source={{ uri: perk.imageUrl }}
                        className="w-16 h-16 rounded-xl mr-4"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-16 h-16 rounded-xl mr-4 bg-sage/10 items-center justify-center">
                        <Ionicons
                          name={getPerkTypeIcon(perk.type) as any}
                          size={24}
                          color="#A6B8A0"
                        />
                      </View>
                    )}

                    <View className="flex-1">
                      <View className="flex-row items-center mb-2">
                        <View className={cn("px-2 py-1 rounded-full mr-2", getPerkTypeColor(perk.type))}>
                          <Text className="text-xs font-semibold capitalize">{perk.type}</Text>
                        </View>
                        {perk.value && (
                          <Text className="text-sage font-bold text-sm">{perk.value}</Text>
                        )}
                      </View>

                      <Text className="text-charcoal font-bold text-base mb-1">{perk.title}</Text>
                      
                      <Text className="text-charcoal/70 text-sm" numberOfLines={2}>
                        {perk.description}
                      </Text>

                      {perk.partnerName && (
                        <Text className="text-charcoal/50 text-xs mt-1">
                          Partner: {perk.partnerName}
                        </Text>
                      )}

                      {perk.expiryDate && (
                        <Text className="text-terracotta text-xs mt-1">
                          Expires {new Date(perk.expiryDate).toLocaleDateString()}
                        </Text>
                      )}
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </Pressable>
                ))}
              </View>
            )}

            {/* Previously Redeemed */}
            {redeemedPerks.length > 0 && (
              <>
                <Text className="text-charcoal text-lg font-bold mb-4">Previously Used</Text>
                <View className="space-y-3">
                  {redeemedPerks.map((perk) => (
                    <View
                      key={perk.id}
                      className="bg-gray-50 rounded-2xl p-4 flex-row items-center opacity-75"
                    >
                      <View className="w-16 h-16 rounded-xl mr-4 bg-gray-200 items-center justify-center">
                        <Ionicons name="checkmark-circle" size={24} color="#059669" />
                      </View>

                      <View className="flex-1">
                        <Text className="text-charcoal font-semibold text-base mb-1">{perk.title}</Text>
                        <Text className="text-charcoal/60 text-sm">Redeemed</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {selectedTab === "referrals" && (
          <View className="px-6">
            {/* Program Header */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1 pr-4">
                  <Text className="text-charcoal text-xl font-bold">Share the Mothership</Text>
                  <Text className="text-charcoal/70 text-sm mt-2">
                    Give $20 off a friend's first Mothership order (min $100). When they complete their first paid order (not cancelled within 14 days), you earn $20 in Mothership credit. Credits expire after 12 months.
                  </Text>
                </View>
                <View className="bg-terracotta/20 p-2 rounded-full">
                  <Ionicons name="people" size={24} color="#CBA392" />
                </View>
              </View>

              {/* Share Link Row (mocked for now with existing referralProgram code if present) */}
              <View className="bg-gray-50 p-4 rounded-xl">
                <Text className="text-charcoal font-semibold mb-2">Your Share Link</Text>
                <View className="flex-row items-center">
                  <Text className="text-charcoal text-xs bg-white px-3 py-2 rounded-lg flex-1 mr-3" numberOfLines={1}>
                    {`mothership://r/${(referralProgram?.referralCode || "XXXXXX")}`}
                  </Text>
                  <Pressable
                    onPress={copyReferralCode}
                    className="bg-sage px-3 py-2 rounded-lg mr-2"
                  >
                    <Ionicons name="copy-outline" size={18} color="white" />
                  </Pressable>
                  <Pressable
                    onPress={handleShareReferral}
                    className="bg-terracotta px-3 py-2 rounded-lg"
                  >
                    <Ionicons name="share-outline" size={18} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Credit Balance (using existing program mock) */}
            {referralProgram && referralProgram.availableCredits > 0 && (
              <View className="bg-terracotta p-6 rounded-2xl mb-6">
                <Text className="text-white text-xl font-bold mb-2">Available Credits</Text>
                <Text className="text-white text-3xl font-bold mb-2">
                  ${referralProgram.availableCredits.toFixed(2)}
                </Text>
                <Text className="text-white/90 text-sm">
                  Use on your next order or save for later
                </Text>
              </View>
            )}

            {/* How it Works */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-charcoal text-lg font-bold mb-4">How It Works</Text>
              <View className="space-y-4">
                <View className="flex-row items-start">
                  <View className="bg-sage w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-sm">1</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold mb-1">Share Your Link</Text>
                    <Text className="text-charcoal/70 text-sm">
                      Send your personal link via SMS, email, or social.
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start">
                  <View className="bg-sage w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-sm">2</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold mb-1">They Save $20</Text>
                    <Text className="text-charcoal/70 text-sm">
                      $20 off their first order of $100+ is applied at checkout.
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start">
                  <View className="bg-sage w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-sm">3</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-charcoal font-semibold mb-1">You Earn $20</Text>
                    <Text className="text-charcoal/70 text-sm">
                      After 14 days, if their order is not cancelled/refunded, your $20 credit becomes active for 12 months.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      <PerkModal />
    </SafeAreaView>
  );
}