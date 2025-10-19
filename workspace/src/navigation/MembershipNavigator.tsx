import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useFontContext } from "../context/FontContext";

import MembershipDashboardScreen from "../screens/MembershipDashboardScreen";
import SubscriptionManagementScreen from "../screens/SubscriptionManagementScreen";
import DigitalResourcesScreen from "../screens/DigitalResourcesScreen";
import EventsClassesScreen from "../screens/EventsClassesScreen";
import PerksOffersScreen from "../screens/PerksOffersScreen";
import MemberSettingsScreen from "../screens/MemberSettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function WebsiteButton() {
  const navigation = useNavigation<any>();
  
  return (
    <Pressable
      onPress={() => navigation?.navigate && navigation.navigate("Main", { screen: "Home" })}
      className="ml-4 flex-row items-center"
    >
      <Ionicons name="storefront-outline" size={20} color="#A6B8A0" />
      <Text className="text-sage text-sm font-medium ml-1">Website</Text>
    </Pressable>
  );
}

function MembershipTabNavigator() {
  const { fontsLoaded } = useFontContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Subscription") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Resources") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Perks") {
            iconName = focused ? "gift" : "gift-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
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
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: "#F9F6F1",
        },
        headerTintColor: "#4B4B4B",
        headerTitleStyle: {
          fontFamily: fontsLoaded ? "CedarvilleCursive_400Regular" : "System",
          fontSize: fontsLoaded ? 22 : 18,
          fontWeight: fontsLoaded ? "400" : "600",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={MembershipDashboardScreen}
        options={{
          title: "Dashboard",
          headerTitle: "Mothership Portal",
          headerLeft: () => <WebsiteButton />,
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionManagementScreen}
        options={{
          title: "Subscription",
        }}
      />
      <Tab.Screen
        name="Resources"
        component={DigitalResourcesScreen}
        options={{
          title: "Resources",
          headerTitle: "Digital Resources",
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsClassesScreen}
        options={{
          title: "Events",
          headerTitle: "Events & Classes",
        }}
      />
      <Tab.Screen
        name="Perks"
        component={PerksOffersScreen}
        options={{
          title: "Perks",
          headerTitle: "Perks & Offers",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MemberSettingsScreen}
        options={{
          title: "Settings",
          headerTitle: "Member Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default function MembershipNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F9F6F1",
        },
        headerTintColor: "#4B4B4B",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="MembershipTabs"
        component={MembershipTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}