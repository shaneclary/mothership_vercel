import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  items: number;
  subtotal: number;
  discount: number;
  total: number;
  nextTier?: { needed: number; nextOff: number } | null;
  progress?: number; // 0..1 progress toward next tier
  bottomOffset?: number; // extra space to avoid overlapping bottom CTA
  onPress?: () => void;
}

export default function BundleSummaryFloat({ items, subtotal, discount, total, nextTier, progress = 0, bottomOffset = 0, onPress }: Props) {
  const insets = useSafeAreaInsets();
  const progressPct = Math.round(Math.max(0, Math.min(1, nextTier ? progress : 1)) * 100);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="absolute right-4 rounded-2xl bg-white shadow"
      style={{ bottom: Math.max(16, insets.bottom + 16 + bottomOffset), width: 260 }}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-charcoal/70 text-xs">Items</Text>
          <Text className="text-charcoal font-semibold text-sm">{items}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-charcoal/70 text-xs">Discount</Text>
          <Text className="text-dustyRose font-semibold text-sm">{discount > 0 ? `- $${discount.toFixed(2)}` : "$0.00"}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-charcoal text-sm">Total</Text>
          <Text className="text-sage text-xl font-bold">${total.toFixed(2)}</Text>
        </View>

        {/* Next tier helper */}
        <View className="mt-2">
          {nextTier ? (
            <Text className="text-charcoal/60 text-[11px] mb-1">
              {nextTier.needed} more {nextTier.needed === 1 ? "item" : "items"} to save ${nextTier.nextOff}
            </Text>
          ) : (
            <Text className="text-charcoal/60 text-[11px] mb-1">Maximum savings reached</Text>
          )}
          <View className="w-full h-1.5 bg-sage/20 rounded-full overflow-hidden">
            <View className="h-1.5 bg-sage" style={{ width: `${progressPct}%` }} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
