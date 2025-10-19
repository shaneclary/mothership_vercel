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

export default function MemberSignupScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { register, isLoading } = useMembershipStore();
  const { fontsLoaded } = useFontContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreedToTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    Keyboard.dismiss();
    
    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password
      });
      
      if (success) {
        Alert.alert(
          "Welcome to Mothership!",
          "Your account has been created successfully. Welcome to your Mothership Portal.",
          [
            {
              text: "Continue",
              onPress: () => navigation.reset({
                index: 0,
                routes: [{ name: "MembershipPortal" }],
              })
            }
          ]
        );
      } else {
        Alert.alert("Signup Failed", "There was an error creating your account. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
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
              Join Mothership
            </Text>
            <Text 
              className="text-charcoal/70 text-lg"
              style={{
                fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : undefined
              }}
            >
              Create your account and access your Mothership Portal
            </Text>
          </View>

          {/* Signup Form */}
          <View className="px-6">
            {/* Name Inputs */}
            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-charcoal font-semibold mb-2">First Name</Text>
                <View className={cn(
                  "bg-white rounded-xl px-4 py-3 border",
                  errors.firstName ? "border-red-300" : "border-gray-200"
                )}>
                  <TextInput
                    value={formData.firstName}
                    onChangeText={(text) => {
                      setFormData(prev => ({ ...prev, firstName: text }));
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                    }}
                    placeholder="First name"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    className="text-charcoal text-base"
                    editable={!isLoading}
                  />
                </View>
                {errors.firstName && (
                  <Text className="text-red-500 text-sm mt-1">{errors.firstName}</Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-charcoal font-semibold mb-2">Last Name</Text>
                <View className={cn(
                  "bg-white rounded-xl px-4 py-3 border",
                  errors.lastName ? "border-red-300" : "border-gray-200"
                )}>
                  <TextInput
                    value={formData.lastName}
                    onChangeText={(text) => {
                      setFormData(prev => ({ ...prev, lastName: text }));
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: "" }));
                    }}
                    placeholder="Last name"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    className="text-charcoal text-base"
                    editable={!isLoading}
                  />
                </View>
                {errors.lastName && (
                  <Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>
                )}
              </View>
            </View>

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

            {/* Phone Input */}
            <View className="mb-4">
              <Text className="text-charcoal font-semibold mb-2">Phone (Optional)</Text>
              <View className="bg-white rounded-xl px-4 py-3 border border-gray-200">
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  className="text-charcoal text-base"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
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
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-charcoal font-semibold mb-2">Confirm Password</Text>
              <View className={cn(
                "bg-white rounded-xl px-4 py-3 border flex-row items-center",
                errors.confirmPassword ? "border-red-300" : "border-gray-200"
              )}>
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(text) => {
                    setFormData(prev => ({ ...prev, confirmPassword: text }));
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 text-charcoal text-base"
                  editable={!isLoading}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-3"
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </Pressable>
              </View>
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Terms Agreement */}
            <View className="mb-8">
              <Pressable
                onPress={() => {
                  setAgreedToTerms(!agreedToTerms);
                  if (errors.terms) setErrors(prev => ({ ...prev, terms: "" }));
                }}
                className="flex-row items-start"
              >
                <View className={cn(
                  "w-5 h-5 rounded border-2 mr-3 items-center justify-center mt-0.5",
                  agreedToTerms ? "bg-sage border-sage" : "border-gray-300"
                )}>
                  {agreedToTerms && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="flex-1 text-charcoal text-sm leading-5">
                  I agree to the{" "}
                  <Text className="text-sage font-semibold">Terms of Service</Text>
                  {" "}and{" "}
                  <Text className="text-sage font-semibold">Privacy Policy</Text>
                </Text>
              </Pressable>
              {errors.terms && (
                <Text className="text-red-500 text-sm mt-1">{errors.terms}</Text>
              )}
            </View>

            {/* Signup Button */}
            <Pressable
              onPress={handleSignup}
              disabled={isLoading}
              className={cn(
                "bg-sage rounded-xl py-4 flex-row justify-center items-center",
                isLoading && "opacity-70"
              )}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">Create Account</Text>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center items-center">
              <Text className="text-charcoal/70">Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate("MemberLogin")}>
                <Text className="text-sage font-semibold">Sign In</Text>
              </Pressable>
            </View>
          </View>

          <View style={{ height: insets.bottom + 20 }} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}