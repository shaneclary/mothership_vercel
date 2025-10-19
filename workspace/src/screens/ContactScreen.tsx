import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!formData.email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    Alert.alert(
      "Message Sent!",
      "Thank you for contacting us. We'll get back to you within 24 hours.",
      [{ text: "OK", onPress: () => setFormData({ name: "", email: "", subject: "", message: "" }) }]
    );
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+1-555-MOTHERSHIP");
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:hello@mothership.com");
  };

  const handleSocialPress = (platform: string) => {
    const urls = {
      instagram: "https://instagram.com/mothershipmeals",
      facebook: "https://facebook.com/mothershipmeals",
      twitter: "https://twitter.com/mothershipmeals",
    };
    Linking.openURL(urls[platform as keyof typeof urls] || "");
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Header */}
        <View className="px-6 py-8 text-center">
          <Text className="text-charcoal text-3xl font-bold mb-4 text-center">
            Get in Touch
          </Text>
          <Text className="text-charcoal/70 text-lg text-center leading-6">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </View>

        {/* Contact Methods */}
        <View className="px-6 mb-8">
          <View className="space-y-4">
            <Pressable
              onPress={handlePhonePress}
              className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center"
            >
              <View className="bg-sage w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="call" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-charcoal font-semibold text-lg">Phone</Text>
                <Text className="text-sage text-base">1-555-MOTHERSHIP</Text>
                <Text className="text-charcoal/60 text-sm">Mon-Fri, 9AM-6PM EST</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#A6B8A0" />
            </Pressable>

            <Pressable
              onPress={handleEmailPress}
              className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center"
            >
              <View className="bg-terracotta w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="mail" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-charcoal font-semibold text-lg">Email</Text>
                <Text className="text-terracotta text-base">hello@mothership.com</Text>
                <Text className="text-charcoal/60 text-sm">We respond within 24 hours</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CBA392" />
            </Pressable>

            <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center">
              <View className="bg-dustyRose w-12 h-12 rounded-full items-center justify-center mr-4">
                <Ionicons name="location" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-charcoal font-semibold text-lg">Address</Text>
                <Text className="text-dustyRose text-base">123 Nourishment Lane</Text>
                <Text className="text-charcoal/60 text-sm">San Francisco, CA 94110</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-2xl font-bold mb-6">
            Send Us a Message
          </Text>
          
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="space-y-4">
              <View>
                <Text className="text-charcoal font-semibold mb-2">Name *</Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Your full name"
                  placeholderTextColor="#A6B8A0"
                  className="border border-sage/20 rounded-xl px-4 py-3 text-charcoal"
                />
              </View>

              <View>
                <Text className="text-charcoal font-semibold mb-2">Email *</Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="your@email.com"
                  placeholderTextColor="#A6B8A0"
                  className="border border-sage/20 rounded-xl px-4 py-3 text-charcoal"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View>
                <Text className="text-charcoal font-semibold mb-2">Subject</Text>
                <TextInput
                  value={formData.subject}
                  onChangeText={(text) => setFormData({ ...formData, subject: text })}
                  placeholder="What's this about?"
                  placeholderTextColor="#A6B8A0"
                  className="border border-sage/20 rounded-xl px-4 py-3 text-charcoal"
                />
              </View>

              <View>
                <Text className="text-charcoal font-semibold mb-2">Message *</Text>
                <TextInput
                  value={formData.message}
                  onChangeText={(text) => setFormData({ ...formData, message: text })}
                  placeholder="Tell us how we can help you..."
                  placeholderTextColor="#A6B8A0"
                  className="border border-sage/20 rounded-xl px-4 py-3 text-charcoal h-32"
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              className="bg-sage py-4 rounded-full items-center mt-6"
            >
              <Text className="text-white font-bold text-lg">Send Message</Text>
            </Pressable>
          </View>
        </View>

        {/* Social Media */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-2xl font-bold mb-6 text-center">
            Follow Our Journey
          </Text>
          
          <View className="flex-row justify-center space-x-6">
            {[
              { platform: "instagram", icon: "logo-instagram", color: "#E4405F" },
              { platform: "facebook", icon: "logo-facebook", color: "#1877F2" },
              { platform: "twitter", icon: "logo-twitter", color: "#1DA1F2" },
            ].map(({ platform, icon, color }) => (
              <Pressable
                key={platform}
                onPress={() => handleSocialPress(platform)}
                className="w-16 h-16 rounded-full items-center justify-center shadow-sm"
                style={{ backgroundColor: color }}
              >
                <Ionicons name={icon as any} size={28} color="white" />
              </Pressable>
            ))}
          </View>
          
          <Text className="text-charcoal/60 text-center mt-4 leading-5">
            Join our community of mothers sharing their postpartum journey
          </Text>
        </View>

        {/* Support Hours */}
        <View className="mx-6 bg-sage/10 rounded-2xl p-6 mb-8">
          <Text className="text-charcoal text-xl font-bold mb-4 text-center">
            Customer Support Hours
          </Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Monday - Friday</Text>
              <Text className="text-sage font-semibold">9:00 AM - 6:00 PM EST</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Saturday</Text>
              <Text className="text-sage font-semibold">10:00 AM - 4:00 PM EST</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-charcoal">Sunday</Text>
              <Text className="text-charcoal/60">Closed</Text>
            </View>
          </View>
          
          <View className="mt-4 pt-4 border-t border-sage/20">
            <Text className="text-charcoal/70 text-sm text-center">
              For urgent matters outside business hours, please email us and we'll respond as soon as possible.
            </Text>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}