import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useMembershipStore } from "../state/membershipStore";
import { Event, EventRegistration } from "../types/membership";
import { cn } from "../utils/cn";

export default function EventsClassesScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "registered">("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    availableEvents,
    eventRegistrations,
    registerForEvent,
    cancelEventRegistration
  } = useMembershipStore();

  const upcomingEvents = availableEvents.filter(event => event.status === "upcoming");
  const registeredEvents = availableEvents.filter(event => {
    const registration = eventRegistrations.find(reg => 
      reg.eventId === event.id && reg.status === "registered"
    );
    return registration;
  });

  const isRegisteredForEvent = (eventId: string) => {
    return eventRegistrations.some(reg => 
      reg.eventId === eventId && reg.status === "registered"
    );
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegisterForEvent = async (event: Event) => {
    if (event.registeredCount >= event.capacity) {
      Alert.alert("Event Full", "This event is currently full. You can join the waitlist.");
      return;
    }

    setIsRegistering(true);
    const success = await registerForEvent(event.id);
    setIsRegistering(false);

    if (success) {
      Alert.alert(
        "Registration Confirmed!",
        `You're registered for ${event.title}. You'll receive a confirmation email shortly.`
      );
      setShowEventModal(false);
    } else {
      Alert.alert("Registration Failed", "Unable to register for this event. Please try again.");
    }
  };

  const handleCancelRegistration = (event: Event) => {
    Alert.alert(
      "Cancel Registration",
      `Are you sure you want to cancel your registration for ${event.title}?`,
      [
        { text: "Keep Registration", style: "cancel" },
        {
          text: "Cancel Registration",
          style: "destructive",
          onPress: () => {
            cancelEventRegistration(event.id);
            Alert.alert("Registration Cancelled", "Your registration has been cancelled.");
            setShowEventModal(false);
          }
        }
      ]
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class": return "bg-blue-100 text-blue-700";
      case "workshop": return "bg-purple-100 text-purple-700";
      case "webinar": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming Events", count: upcomingEvents.length },
    { id: "registered", label: "My Events", count: registeredEvents.length },
  ];

  const EventModal = () => {
    if (!selectedEvent) return null;

    const isRegistered = isRegisteredForEvent(selectedEvent.id);
    const isFull = selectedEvent.registeredCount >= selectedEvent.capacity;
    const spotsLeft = selectedEvent.capacity - selectedEvent.registeredCount;

    return (
      <Modal
        visible={showEventModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-cream">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <Pressable onPress={() => setShowEventModal(false)}>
              <Ionicons name="close" size={24} color="#4B4B4B" />
            </Pressable>
            <Text className="text-charcoal font-semibold text-lg">Event Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView className="flex-1">
            {selectedEvent.imageUrl && (
              <Image
                source={{ uri: selectedEvent.imageUrl }}
                className="w-full h-48"
                resizeMode="cover"
              />
            )}

            <View className="p-6">
              <View className="flex-row items-center mb-3">
                <View className={cn("px-3 py-1 rounded-full mr-3", getEventTypeColor(selectedEvent.type))}>
                  <Text className="text-sm font-semibold capitalize">{selectedEvent.type}</Text>
                </View>
                {selectedEvent.isVirtual && (
                  <View className="bg-terracotta/20 px-3 py-1 rounded-full">
                    <Text className="text-terracotta text-sm font-semibold">Virtual</Text>
                  </View>
                )}
              </View>

              <Text className="text-charcoal text-2xl font-bold mb-3">
                {selectedEvent.title}
              </Text>

              <Text className="text-charcoal text-base leading-6 mb-6">
                {selectedEvent.description}
              </Text>

              <View className="space-y-4 mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={20} color="#A6B8A0" />
                  <Text className="text-charcoal ml-3 flex-1">{formatDate(selectedEvent.date)}</Text>
                </View>

                {!selectedEvent.isVirtual && selectedEvent.location && (
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={20} color="#A6B8A0" />
                    <Text className="text-charcoal ml-3 flex-1">{selectedEvent.location}</Text>
                  </View>
                )}

                {selectedEvent.instructorName && (
                  <View className="flex-row items-center">
                    <Ionicons name="person-outline" size={20} color="#A6B8A0" />
                    <Text className="text-charcoal ml-3 flex-1">Instructor: {selectedEvent.instructorName}</Text>
                  </View>
                )}

                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={20} color="#A6B8A0" />
                  <Text className="text-charcoal ml-3 flex-1">
                    {selectedEvent.registeredCount} / {selectedEvent.capacity} registered
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="pricetag-outline" size={20} color="#A6B8A0" />
                  <View className="ml-3 flex-1">
                    <Text className="text-charcoal">
                      Member Price: <Text className="font-bold text-sage">${selectedEvent.memberPrice}</Text>
                    </Text>
                    <Text className="text-charcoal/60 text-sm">
                      Regular Price: ${selectedEvent.regularPrice}
                    </Text>
                  </View>
                </View>
              </View>

              {selectedEvent.tags.length > 0 && (
                <View className="mb-6">
                  <Text className="text-charcoal font-semibold mb-3">Tags</Text>
                  <View className="flex-row flex-wrap">
                    {selectedEvent.tags.map((tag, index) => (
                      <View key={index} className="bg-dustyRose/20 px-3 py-1 rounded-full mr-2 mb-2">
                        <Text className="text-dustyRose text-sm font-medium capitalize">{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {!isFull && spotsLeft <= 5 && spotsLeft > 0 && (
                <View className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
                  <Text className="text-yellow-800 font-semibold">
                    Only {spotsLeft} spots left!
                  </Text>
                </View>
              )}

              {isFull && !isRegistered && (
                <View className="bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
                  <Text className="text-red-800 font-semibold">This event is full</Text>
                  <Text className="text-red-700 text-sm mt-1">
                    Join the waitlist to be notified if spots become available
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View className="p-6 border-t border-gray-200">
            {isRegistered ? (
              <Pressable
                onPress={() => handleCancelRegistration(selectedEvent)}
                className="bg-red-50 border border-red-200 rounded-xl py-4 flex-row justify-center items-center"
              >
                <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
                <Text className="text-red-600 font-semibold text-lg ml-2">Cancel Registration</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => handleRegisterForEvent(selectedEvent)}
                disabled={isRegistering}
                className={cn(
                  "rounded-xl py-4 flex-row justify-center items-center",
                  isFull ? "bg-gray-200" : "bg-sage",
                  isRegistering && "opacity-70"
                )}
              >
                {isRegistering ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons 
                      name={isFull ? "people-outline" : "checkmark-circle-outline"} 
                      size={20} 
                      color={isFull ? "#6B7280" : "white"} 
                    />
                    <Text className={cn(
                      "font-semibold text-lg ml-2",
                      isFull ? "text-gray-600" : "text-white"
                    )}>
                      {isFull ? "Join Waitlist" : "Reserve My Spot"}
                    </Text>
                  </>
                )}
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-charcoal text-2xl font-bold mb-2">
          Events & Classes
        </Text>
        <Text className="text-charcoal/70 text-base">
          Join our community events and educational workshops
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

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {selectedTab === "upcoming" && (
          <View className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <View className="bg-white rounded-2xl p-8 items-center">
                <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
                <Text className="text-charcoal/60 text-lg font-semibold mt-4 mb-2">No Upcoming Events</Text>
                <Text className="text-charcoal/50 text-center">
                  Check back soon for new events and workshops
                </Text>
              </View>
            ) : (
              upcomingEvents.map((event) => {
                const isRegistered = isRegisteredForEvent(event.id);
                const isFull = event.registeredCount >= event.capacity;
                const spotsLeft = event.capacity - event.registeredCount;

                return (
                  <Pressable
                    key={event.id}
                    onPress={() => handleEventPress(event)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    {event.imageUrl && (
                      <Image
                        source={{ uri: event.imageUrl }}
                        className="w-full h-32"
                        resizeMode="cover"
                      />
                    )}

                    <View className="p-4">
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center">
                          <View className={cn("px-3 py-1 rounded-full mr-2", getEventTypeColor(event.type))}>
                            <Text className="text-xs font-semibold capitalize">{event.type}</Text>
                          </View>
                          {event.isVirtual && (
                            <View className="bg-terracotta/20 px-2 py-1 rounded-full">
                              <Text className="text-terracotta text-xs font-semibold">Virtual</Text>
                            </View>
                          )}
                        </View>
                        
                        {isRegistered && (
                          <View className="bg-green-100 px-2 py-1 rounded-full">
                            <Text className="text-green-700 text-xs font-semibold">Registered</Text>
                          </View>
                        )}
                      </View>

                      <Text className="text-charcoal font-bold text-lg mb-2">{event.title}</Text>
                      
                      <Text className="text-charcoal/70 text-sm mb-3" numberOfLines={2}>
                        {event.description}
                      </Text>

                      <View className="space-y-2">
                        <View className="flex-row items-center">
                          <Ionicons name="calendar-outline" size={14} color="#A6B8A0" />
                          <Text className="text-charcoal text-sm ml-2">
                            {formatDate(event.date)}
                          </Text>
                        </View>

                        {!event.isVirtual && event.location && (
                          <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={14} color="#A6B8A0" />
                            <Text className="text-charcoal text-sm ml-2">{event.location}</Text>
                          </View>
                        )}

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons name="people-outline" size={14} color="#A6B8A0" />
                            <Text className="text-charcoal text-sm ml-2">
                              {event.registeredCount}/{event.capacity}
                            </Text>
                            {!isFull && spotsLeft <= 5 && (
                              <Text className="text-yellow-600 text-sm ml-2">
                                {spotsLeft} left
                              </Text>
                            )}
                            {isFull && (
                              <Text className="text-red-600 text-sm ml-2">Full</Text>
                            )}
                          </View>

                          <Text className="text-sage font-bold">${event.memberPrice}</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        )}

        {selectedTab === "registered" && (
          <View className="space-y-4">
            {registeredEvents.length === 0 ? (
              <View className="bg-white rounded-2xl p-8 items-center">
                <Ionicons name="calendar-clear-outline" size={48} color="#D1D5DB" />
                <Text className="text-charcoal/60 text-lg font-semibold mt-4 mb-2">No Registered Events</Text>
                <Text className="text-charcoal/50 text-center mb-4">
                  You haven't registered for any events yet
                </Text>
                <Pressable
                  onPress={() => setSelectedTab("upcoming")}
                  className="bg-sage px-6 py-3 rounded-xl"
                >
                  <Text className="text-white font-semibold">Browse Events</Text>
                </Pressable>
              </View>
            ) : (
              registeredEvents.map((event) => {
                const registration = eventRegistrations.find(reg => 
                  reg.eventId === event.id && reg.status === "registered"
                );

                return (
                  <Pressable
                    key={event.id}
                    onPress={() => handleEventPress(event)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <View className="flex-row items-start">
                      {event.imageUrl && (
                        <Image
                          source={{ uri: event.imageUrl }}
                          className="w-16 h-16 rounded-xl mr-4"
                          resizeMode="cover"
                        />
                      )}

                      <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                          <View className={cn("px-2 py-1 rounded-full mr-2", getEventTypeColor(event.type))}>
                            <Text className="text-xs font-semibold capitalize">{event.type}</Text>
                          </View>
                          <View className="bg-green-100 px-2 py-1 rounded-full">
                            <Text className="text-green-700 text-xs font-semibold">Registered</Text>
                          </View>
                        </View>

                        <Text className="text-charcoal font-bold text-base mb-1">{event.title}</Text>
                        
                        <View className="flex-row items-center mb-2">
                          <Ionicons name="calendar-outline" size={14} color="#A6B8A0" />
                          <Text className="text-charcoal text-sm ml-2">
                            {formatDate(event.date)}
                          </Text>
                        </View>

                        {registration && (
                          <Text className="text-sage text-sm font-semibold">
                            Paid: ${registration.pricePaid}
                          </Text>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      <EventModal />
    </SafeAreaView>
  );
}