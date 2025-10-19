import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useFontContext } from "../context/FontContext";

import HomeScreen from "../screens/HomeScreen";
import ShopScreen from "../screens/ShopScreen";
import MealPackagesScreen from "../screens/MealPackagesScreen";
import AboutScreen from "../screens/AboutScreen";
import HowItWorksScreen from "../screens/HowItWorksScreen";
import ContactScreen from "../screens/ContactScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import PackageDetailScreen from "../screens/PackageDetailScreen";
import CartScreen from "../screens/CartScreen";
import GiftCardScreen from "../screens/GiftCardScreen";
import MemberLoginScreen from "../screens/MemberLoginScreen";
import MemberSignupScreen from "../screens/MemberSignupScreen";
import SubscriptionManagementScreen from "../screens/SubscriptionManagementScreen";
import DigitalResourcesScreen from "../screens/DigitalResourcesScreen";
import EventsClassesScreen from "../screens/EventsClassesScreen";
import PerksOffersScreen from "../screens/PerksOffersScreen";
import MemberSettingsScreen from "../screens/MemberSettingsScreen";
import MembershipNavigator from "./MembershipNavigator";
import MembershipPortalDemo from "../components/MembershipPortalDemo";

import { useAppStore } from "../state/appStore";
import { useMembershipStore } from "../state/membershipStore";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CartButton({ navigation }: any) {
  const cartItems = useAppStore(state => state.cartItems);
  const packageItems = useAppStore(state => state.packageItems);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0) + 
                       packageItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Pressable
      onPress={() => navigation.navigate("Cart")}
      className="relative mr-4"
    >
      <Ionicons name="bag-outline" size={24} color="#4B4B4B" />
      {cartItemCount > 0 && (
        <View className="absolute -top-2 -right-2 bg-terracotta rounded-full w-5 h-5 flex items-center justify-center">
          <Text className="text-white text-xs font-bold">
            {cartItemCount > 9 ? "9+" : cartItemCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function MembershipButton({ navigation }: any) {
  const { isAuthenticated } = useMembershipStore();

  return (
    <Pressable
      onPress={() => {
        if (isAuthenticated) {
          navigation.navigate("MembershipPortal");
        } else {
          navigation.navigate("Portal");
        }
      }}
      className="mr-3"
    >
      <Ionicons 
        name={isAuthenticated ? "person-circle" : "person-circle-outline"} 
        size={24} 
        color={isAuthenticated ? "#A6B8A0" : "#4B4B4B"} 
      />
    </Pressable>
  );
}

function TabNavigator() {
  const { fontsLoaded } = useFontContext();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "storefront" : "storefront-outline";
          } else if (route.name === "Packages") {
            iconName = focused ? "gift" : "gift-outline";
          } else if (route.name === "About") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Contact") {
            iconName = focused ? "mail" : "mail-outline";
          } else {
            iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#A6B8A0",
        tabBarInactiveTintColor: "#4B4B4B",
        tabBarStyle: {
          backgroundColor: "#F9F6F1",
          borderTopColor: "#A6B8A0",
          borderTopWidth: 0.5,
        },
        headerStyle: {
          backgroundColor: "#F9F6F1",
        },
        headerTintColor: "#4B4B4B",
        headerTitleStyle: {
          fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : "System",
          fontSize: 24,
          fontWeight: fontsLoaded ? "400" : "600",
        },
          headerRight: () => (
            <View className="flex-row items-center">
              <MembershipButton navigation={navigation} />
              <CartButton navigation={navigation} />
            </View>
          ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Mothership",
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "Shop Meals",
        }}
      />
      <Tab.Screen
        name="Packages"
        component={MealPackagesScreen}
        options={{
          title: "Meal Plans",
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: "Contact",
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { loadMembershipData } = useMembershipStore();
  const { fontsLoaded } = useFontContext();

  useEffect(() => {
    loadMembershipData();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#F9F6F1",
        },
        headerTintColor: "#4B4B4B",
        headerTitleStyle: {
          fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : "System",
          fontSize: 24,
          fontWeight: fontsLoaded ? "400" : "600",
        },
        headerRight: () => (
          <View className="flex-row items-center">
            <MembershipButton navigation={navigation} />
            <CartButton navigation={navigation} />
          </View>
        ),
      })}
    >
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HowItWorks"
          component={HowItWorksScreen}
          options={{ title: "How It Works" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Meal Details" }}
        />
        <Stack.Screen
          name="PackageDetail"
          component={PackageDetailScreen}
          options={{ title: "Package Details" }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: "Your Order",
            presentation: "modal",
            headerRight: undefined,
          }}
        />
        <Stack.Screen
          name="GiftCard"
          component={GiftCardScreen}
          options={{ title: "Gift Card" }}
        />
        <Stack.Screen
          name="Portal"
          component={MembershipPortalDemo}
          options={{ title: "Mothership Membership" }}
        />
        <Stack.Screen
          name="Login"
          component={MemberLoginScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="Signup"
          component={MemberSignupScreen}
          options={{ title: "Create Account" }}
        />
        {/* Legacy route names for backward compatibility */}
        <Stack.Screen
          name="MemberLogin"
          component={MemberLoginScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="MemberSignup"
          component={MemberSignupScreen}
          options={{ title: "Create Account" }}
        />
        <Stack.Screen
          name="MembershipPortal"
          component={MembershipNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubscriptionManagement"
          component={SubscriptionManagementScreen}
          options={{ title: "Manage Subscription" }}
        />
        <Stack.Screen
          name="DigitalResources"
          component={DigitalResourcesScreen}
          options={{ title: "Digital Resources" }}
        />
        <Stack.Screen
          name="EventsClasses"
          component={EventsClassesScreen}
          options={{ title: "Events & Classes" }}
        />
        <Stack.Screen
          name="PerksOffers"
          component={PerksOffersScreen}
          options={{ title: "Perks & Offers" }}
        />
        <Stack.Screen
          name="MemberSettings"
          component={MemberSettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
  );
}