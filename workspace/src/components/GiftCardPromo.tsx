import React from "react";
import { View, Text, Image, Pressable } from "react-native";

interface GiftCardPromoProps {
  onNavigateToGiftCard?: () => void;
}

export default function GiftCardPromo({ onNavigateToGiftCard }: GiftCardPromoProps) {
  return (
    <View className="bg-white border border-sage/20 rounded-2xl p-5 shadow-sm">
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400" }}
          className="w-28 h-20 rounded-xl mr-4"
        />
        <View className="flex-1">
          <Text className="text-charcoal text-xl font-bold mb-1">Mothership Gift Card</Text>
          <Text className="text-charcoal/70 text-sm mb-3" numberOfLines={3}>
            A warm, digital way to nourish a new mama or anyone you love with healing, organic meals.
          </Text>
          <Pressable
            onPress={onNavigateToGiftCard}
            className="self-start px-4 py-2 rounded-full bg-terracotta"
            accessibilityLabel="Buy a gift card"
          >
            <Text className="text-white font-semibold">Buy a Gift Card</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
