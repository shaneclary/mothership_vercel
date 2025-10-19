import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HowItWorksScreen() {
  const navigation = useNavigation();

  const steps = [
    {
      id: 1,
      icon: "heart-outline",
      title: "Choose Your Plan",
      description: "Browse our curated meal plans designed specifically for postpartum nourishment. Each plan includes a variety of soups, broths, and complete meals.",
      details: [
        "Individual meals or complete plans available",
        "Customizable based on dietary preferences", 
        "Options for different recovery stages"
      ]
    },
    {
      id: 2,
      icon: "flame-outline", 
      title: "We Cook & Freeze",
      description: "Our team of experienced chefs prepares your meals using traditional recipes and the highest quality ingredients, then flash-freezes them to preserve nutrients.",
      details: [
        "Prepared fresh daily in our certified kitchen",
        "Flash-frozen within hours of cooking",
        "Nutrient retention optimized for healing"
      ]
    },
    {
      id: 3,
      icon: "car-outline",
      title: "Delivered to Your Door", 
      description: "Your meals arrive in insulated packaging to maintain freshness. Simply store in your freezer and heat when ready to enjoy.",
      details: [
        "Delivered within 3-5 business days",
        "Insulated packaging keeps meals frozen",
        "Free shipping on orders over $50"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long do meals last frozen?",
      answer: "Our meals maintain optimal quality for up to 6 months in the freezer when stored properly."
    },
    {
      question: "Do you deliver nationwide?",
      answer: "Yes! We currently deliver to all 50 states. Alaska and Hawaii may have extended delivery times."
    },
    {
      question: "Can I customize my order for dietary restrictions?",
      answer: "Absolutely. We offer vegan, gluten-free, and dairy-free options. Contact us for specific allergies or medical dietary needs."
    },
    {
      question: "How do I heat the meals?",
      answer: "Most meals can be heated in the microwave (3-4 minutes) or on the stovetop (5-7 minutes). Detailed heating instructions come with each meal."
    },
    {
      question: "What if I don't like a meal?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with any meal, contact us for a full refund or replacement."
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView automaticallyAdjustContentInsets={true}>
        {/* Hero */}
        <View className="px-6 py-8 text-center">
          <Text className="text-charcoal text-3xl font-bold mb-4 text-center">
            How Mothership Works
          </Text>
          <Text className="text-charcoal/70 text-lg text-center leading-6">
            From our kitchen to your table in three simple steps
          </Text>
        </View>

        {/* Steps */}
        <View className="px-6 mb-8">
          {steps.map((step, index) => (
            <View key={step.id} className="mb-8">
              <View className="flex-row items-start mb-4">
                <View className="bg-sage w-16 h-16 rounded-full items-center justify-center mr-4">
                  <Text className="text-white text-2xl font-bold">{step.id}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-charcoal text-2xl font-bold mb-2">
                    {step.title}
                  </Text>
                  <Text className="text-charcoal text-base leading-6">
                    {step.description}
                  </Text>
                </View>
              </View>
              
              <View className="bg-white rounded-2xl p-4 ml-20 shadow-sm">
                {step.details.map((detail, detailIndex) => (
                  <View key={detailIndex} className="flex-row items-center mb-2 last:mb-0">
                    <Ionicons name="checkmark-circle" size={16} color="#A6B8A0" />
                    <Text className="text-charcoal/70 text-sm ml-2 flex-1">
                      {detail}
                    </Text>
                  </View>
                ))}
              </View>

              {index < steps.length - 1 && (
                <View className="ml-8 my-4">
                  <Ionicons name="chevron-down" size={24} color="#A6B8A0" />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Delivery Info */}
        <View className="bg-sage/10 mx-6 rounded-2xl p-6 mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="cube-outline" size={28} color="#A6B8A0" />
            <Text className="text-charcoal text-2xl font-bold ml-3">
              Delivery Details
            </Text>
          </View>
          <View className="space-y-3">
            <View className="flex-row items-start">
              <Ionicons name="time-outline" size={20} color="#A6B8A0" />
              <View className="ml-3 flex-1">
                <Text className="text-charcoal font-semibold">Processing Time</Text>
                <Text className="text-charcoal/70 text-sm">Orders placed by 2 PM ship next business day</Text>
              </View>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="snow-outline" size={20} color="#A6B8A0" />
              <View className="ml-3 flex-1">
                <Text className="text-charcoal font-semibold">Temperature Control</Text>
                <Text className="text-charcoal/70 text-sm">Insulated packaging with dry ice keeps meals frozen for 24+ hours</Text>
              </View>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="shield-checkmark-outline" size={20} color="#A6B8A0" />
              <View className="ml-3 flex-1">
                <Text className="text-charcoal font-semibold">Safe Delivery</Text>
                <Text className="text-charcoal/70 text-sm">Contactless delivery available, photo confirmation provided</Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQs */}
        <View className="px-6 mb-8">
          <Text className="text-charcoal text-3xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </Text>
          <View className="space-y-4">
            {faqs.map((faq, index) => (
              <View key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                <Text className="text-charcoal font-semibold text-lg mb-3">
                  {faq.question}
                </Text>
                <Text className="text-charcoal/70 text-base leading-5">
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <View className="mx-6 mb-8">
          <View className="bg-dustyRose/20 rounded-2xl p-6 text-center">
            <Text className="text-charcoal text-2xl font-bold mb-3 text-center">
              Ready to Get Started?
            </Text>
            <Text className="text-charcoal/70 text-base mb-6 text-center leading-6">
              Join thousands of mothers who trust Mothership for their postpartum nourishment
            </Text>
            <View className="space-y-3">
              <Pressable
                onPress={() => navigation.navigate("Shop" as never)}
                className="bg-sage py-4 rounded-full items-center"
              >
                <Text className="text-white font-bold text-lg">Shop Our Meals</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Contact" as never)}
                className="bg-white border-2 border-sage py-4 rounded-full items-center"
              >
                <Text className="text-sage font-semibold text-lg">Have Questions?</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}