import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

import { useGiftCardStore } from "../state/giftCardStore";

const denominations = [50, 100, 150, 200];

export default function GiftCardScreen() {
  const createGiftCard = useGiftCardStore(s => s.createGiftCard);

  const [amount, setAmount] = useState<number | "custom">(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [schedule, setSchedule] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const btnScale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({ transform: [{ scale: btnScale.value }] }));

  const validEmail = useMemo(() => /.+@.+\..+/.test(recipientEmail.trim()), [recipientEmail]);
  const resolvedAmount = useMemo(() => {
    if (amount === "custom") {
      const num = Number(customAmount);
      return isNaN(num) ? 0 : num;
    }
    return amount;
  }, [amount, customAmount]);

  const amountValid = resolvedAmount >= 10 && resolvedAmount <= 500;
  const canSubmit = amountValid && recipientName.trim().length > 1 && validEmail;

  const onSubmit = () => {
    if (!canSubmit) return;
    const deliveryDateISO = schedule ? date.toISOString() : undefined;
    const order = createGiftCard({
      amount: resolvedAmount,
      recipientName: recipientName.trim(),
      recipientEmail: recipientEmail.trim(),
      message: message.trim() || undefined,
      deliveryDateISO,
    });
    setCreatedId(order.id);
    setShowConfirm(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView automaticallyAdjustContentInsets={true} keyboardShouldPersistTaps="handled">
            {/* Hero */}
            <View className="px-6 pt-6">
              <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800" }}
                  className="w-full h-44"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-charcoal text-3xl font-bold mb-2">Mothership Gift Card</Text>
              <Text className="text-charcoal/80 text-base leading-6 mb-6">
                A digital gift of nourishment for new mothers and families. Designed by Monika Knapp of Colony Culture, rooted in nutrition and neuroscience to support postpartum recovery and everyday well-being.
              </Text>
            </View>

            {/* Amount */}
            <View className="px-6 mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Choose amount</Text>
              <View className="flex-row flex-wrap">
                {denominations.map(v => (
                  <Pressable
                    key={v}
                    onPress={() => setAmount(v)}
                    className={`px-4 py-2 mr-2 mb-2 rounded-full border ${amount === v ? "bg-sage border-sage" : "bg-white border-sage/30"}`}
                  >
                    <Text className={`font-semibold ${amount === v ? "text-white" : "text-sage"}`}>${v}</Text>
                  </Pressable>
                ))}
                <Pressable
                  onPress={() => setAmount("custom")}
                  className={`px-4 py-2 mr-2 mb-2 rounded-full border ${amount === "custom" ? "bg-sage border-sage" : "bg-white border-sage/30"}`}
                >
                  <Text className={`font-semibold ${amount === "custom" ? "text-white" : "text-sage"}`}>Custom</Text>
                </Pressable>
              </View>
              {amount === "custom" && (
                <View className="mt-3">
                  <View className="bg-white rounded-xl px-4 py-3 border border-sage/20">
                    <TextInput
                      value={customAmount}
                      onChangeText={setCustomAmount}
                      placeholder="Enter amount (10 - 500)"
                      placeholderTextColor="#A6B8A0"
                      className="text-charcoal text-base"
                      keyboardType="numeric"
                    />
                  </View>
                  {!amountValid && (
                    <Text className="text-terracotta text-xs mt-2">Amount must be between $10 and $500</Text>
                  )}
                </View>
              )}
            </View>

            {/* Recipient */}
            <View className="px-6 mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Recipient details</Text>
              <View className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <View>
                  <Text className="text-charcoal/70 text-sm mb-1">Recipient name</Text>
                  <View className="border border-sage/20 rounded-xl px-3 py-2 bg-white">
                    <TextInput value={recipientName} onChangeText={setRecipientName} placeholder="e.g., Taylor" placeholderTextColor="#A6B8A0" className="text-charcoal" />
                  </View>
                  {recipientName.trim().length <= 1 && (
                    <Text className="text-terracotta text-xs mt-1">Please enter a name</Text>
                  )}
                </View>
                <View>
                  <Text className="text-charcoal/70 text-sm mb-1">Recipient email</Text>
                  <View className="border border-sage/20 rounded-xl px-3 py-2 bg-white">
                    <TextInput value={recipientEmail} onChangeText={setRecipientEmail} placeholder="name@email.com" placeholderTextColor="#A6B8A0" className="text-charcoal" autoCapitalize="none" keyboardType="email-address" />
                  </View>
                  {!validEmail && recipientEmail.length > 0 && (
                    <Text className="text-terracotta text-xs mt-1">Enter a valid email address</Text>
                  )}
                </View>
                <View>
                  <Text className="text-charcoal/70 text-sm mb-1">Personal message (optional)</Text>
                  <View className="border border-sage/20 rounded-xl px-3 py-2 bg-white">
                    <TextInput value={message} onChangeText={(t) => t.length <= 250 && setMessage(t)} placeholder="Write a warm note (max 250 characters)" placeholderTextColor="#A6B8A0" className="text-charcoal" multiline />
                  </View>
                  <Text className="text-charcoal/40 text-xs mt-1">{message.length}/250</Text>
                </View>
              </View>
            </View>

            {/* Delivery */}
            <View className="px-6 mb-6">
              <Text className="text-charcoal text-lg font-semibold mb-3">Delivery</Text>
              <View className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-charcoal">Schedule delivery</Text>
                  <Pressable onPress={() => setSchedule(!schedule)} className={`px-3 py-1 rounded-full ${schedule ? "bg-sage" : "bg-sage/20"}`}>
                    <Text className={`${schedule ? "text-white" : "text-sage"} font-semibold`}>{schedule ? "On" : "Off"}</Text>
                  </Pressable>
                </View>
                {schedule && (
                  <View>
                    <Pressable onPress={() => setShowPicker(true)} className="bg-white border border-sage/20 rounded-xl px-4 py-3 flex-row items-center justify-between">
                      <Text className="text-charcoal">{date.toDateString()}</Text>
                      <Ionicons name="calendar" size={18} color="#A6B8A0" />
                    </Pressable>
                    {showPicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        onChange={(e: any, d?: Date) => {
                          setShowPicker(Platform.OS === "ios");
                          if (d) setDate(d);
                        }}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>
                )}
                {!schedule && (
                  <Text className="text-charcoal/60 text-sm">Send immediately to the recipient after purchase</Text>
                )}
              </View>
            </View>

            {/* Restrictions */}
            <View className="px-6 mb-6">
              <View className="bg-sage/10 rounded-2xl p-4 border border-sage/20">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="information-circle" size={18} color="#A6B8A0" />
                  <Text className="text-sage font-semibold ml-2">Usage restriction</Text>
                </View>
                <Text className="text-charcoal/80 text-sm leading-5">
                  Valid only for Mothership Frozen Meal Delivery. Not usable in the Pantry store. We are a small business actively working to integrate both stores.
                </Text>
              </View>
            </View>

            {/* Reviews */}
            <ReviewsBlock />

            {/* CTA */}
            <View className="px-6 mb-10">
              <Animated.View style={btnStyle}>
                <Pressable
                  onPressIn={() => (btnScale.value = withSpring(0.98))}
                  onPressOut={() => (btnScale.value = withSpring(1))}
                  onPress={onSubmit}
                  disabled={!canSubmit}
                  className={`${canSubmit ? "bg-terracotta" : "bg-charcoal/20"} py-4 rounded-full items-center`}
                  accessibilityLabel="Purchase gift card"
                >
                  <Text className={`${canSubmit ? "text-white" : "text-charcoal/50"} font-bold text-lg`}>
                    {canSubmit ? `Purchase Gift Card - $${resolvedAmount.toFixed(2)}` : "Complete details to purchase"}
                  </Text>
                </Pressable>
              </Animated.View>
            </View>

            <View className="h-6" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Confirmation Modal */}
      <Modal visible={showConfirm} transparent animationType="slide" onRequestClose={() => setShowConfirm(false)}>
        <View className="flex-1 bg-black/40 items-center justify-end">
          <View className="bg-white w-full rounded-t-3xl p-6">
            <View className="items-center mb-4">
              <Ionicons name="gift" size={40} color="#CBA392" />
              <Text className="text-charcoal text-2xl font-bold mt-2">Gift Card Created</Text>
              <Text className="text-charcoal/70 text-center mt-2">
                {schedule ? "Your gift will be delivered on the scheduled date." : "We will send your gift to the recipient right away."}
              </Text>
            </View>
            <View className="bg-cream rounded-2xl p-4 mb-4">
              <Text className="text-charcoal text-base">Amount: ${resolvedAmount.toFixed(2)}</Text>
              <Text className="text-charcoal text-base">To: {recipientName} ({recipientEmail})</Text>
              <Text className="text-charcoal text-base">Order ID: {createdId}</Text>
            </View>
            <Text className="text-charcoal/70 text-sm mb-4">
              Gift cards apply to Frozen Meal Delivery only and do not count toward the 5-meal checkout minimum.
            </Text>
            <Pressable onPress={() => setShowConfirm(false)} className="bg-terracotta py-4 rounded-full items-center">
              <Text className="text-white font-semibold">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ReviewsBlock() {
  // Keeping reviews minimal here; full list in mock data added below
  const [expanded, setExpanded] = useState(false);
  const reviews = expanded ? giftCardReviews : giftCardReviews.slice(0, 3);
  return (
    <View className="px-6 mb-6">
      <View className="flex-row items-center mb-2">
        <Ionicons name="star" size={18} color="#D6AFA3" />
        <Text className="text-charcoal font-semibold ml-2">92% approval · 24 reviews</Text>
      </View>
      <View className="bg-white rounded-2xl p-4 shadow-sm">
        {reviews.map(r => (
          <View key={r.name} className="mb-3">
            <Text className="text-charcoal font-semibold">{r.name}</Text>
            <Text className="text-charcoal/70">{r.text}</Text>
          </View>
        ))}
        <Pressable onPress={() => setExpanded(!expanded)} className="self-start mt-1">
          <Text className="text-sage font-semibold">{expanded ? "Show less" : "View more"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const giftCardReviews = [
  { name: "Anna", text: "Mothership Gift Card." },
  { name: "Savannah Freier", text: "Bought for a friend. She has not used it yet but was delighted to receive it." },
  { name: "Edward Harris", text: "Customer service easily switched our order to a gift card when the due date moved." },
  { name: "Melinda", text: "My daughter loved the convenience of heat-and-eat meals post-baby." },
  { name: "Amanda Boerger", text: "Mothership Gift Card." },
];
