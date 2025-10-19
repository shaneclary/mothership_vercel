import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useMembershipStore } from "../state/membershipStore";
import { useFontContext } from "../context/FontContext";
import { cn } from "../utils/cn";

export default function MemberLoginScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { login, isLoading } = useMembershipStore();
  const { fontsLoaded } = useFontContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    Keyboard.dismiss();
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MembershipPortal" }],
        });
      } else {
        Alert.alert("Login Failed", "Invalid email or password. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "sarah.johnson@email.com",
      password: "password123"
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-cream">
        <ScrollView 
          className="flex-1"
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Pressable
              onPress={() => navigation.goBack()}
              className="self-start mb-6"
            >
              <Ionicons name="arrow-back" size={24} color="#4B4B4B" />
            </Pressable>
            
            <Text className="text-charcoal text-3xl font-bold mb-2">
              Welcome Back
            </Text>
            <Text 
              className="text-charcoal/70 text-lg"
              style={{
                fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : undefined
              }}
            >
              Sign in to access your Mothership Portal
            </Text>
          </View>

          {/* Demo Login Helper */}
          <View className="mx-6 mb-6 bg-sage/10 p-4 rounded-xl">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={20} color="#A6B8A0" />
              <Text className="text-sage font-semibold ml-2">Demo Account</Text>
            </View>
            <Text 
              className="text-charcoal/70 text-sm mb-3"
              style={{
                fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : undefined
              }}
            >
              Try the Mothership Portal with our demo account
            </Text>
            <Pressable
              onPress={handleDemoLogin}
              className="bg-sage/20 px-4 py-2 rounded-lg self-start"
            >
              <Text className="text-sage font-semibold">Fill Demo Credentials</Text>
            </Pressable>
          </View>

          {/* Login Form */}
          <View className="px-6">
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-charcoal font-semibold mb-2">Email</Text>
              <View className={cn(
                "bg-white rounded-xl px-4 py-3 border",
                errors.email ? "border-red-300" : "border-gray-200"
              )}>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData(prev => ({ ...prev, email: text }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="text-charcoal text-base"
                  editable={!isLoading}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-charcoal font-semibold mb-2">Password</Text>
              <View className={cn(
                "bg-white rounded-xl px-4 py-3 border flex-row items-center",
                errors.password ? "border-red-300" : "border-gray-200"
              )}>
                <TextInput
                  value={formData.password}
                  onChangeText={(text) => {
                    setFormData(prev => ({ ...prev, password: text }));
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  className="flex-1 text-charcoal text-base"
                  editable={!isLoading}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="ml-3"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
              )}
            </View>

            {/* Forgot Password */}
            <Pressable className="self-end mb-8">
              <Text className="text-sage font-semibold">Forgot Password?</Text>
            </Pressable>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              className={cn(
                "bg-sage rounded-xl py-4 flex-row justify-center items-center",
                isLoading && "opacity-70"
              )}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">Sign In</Text>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-charcoal/70">Don't have an account? </Text>
              <Pressable onPress={() => navigation.navigate("MemberSignup")}>
                <Text className="text-sage font-semibold">Sign Up</Text>
              </Pressable>
            </View>
          </View>

          <View style={{ height: insets.bottom + 20 }} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}