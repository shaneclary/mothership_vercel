import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useMembershipStore } from "../state/membershipStore";
import { DigitalResource } from "../types/membership";
import { cn } from "../utils/cn";

export default function DigitalResourcesScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedResource, setSelectedResource] = useState<DigitalResource | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);

  const {
    digitalResources,
    completedResources,
    downloadedResources,
    markResourceCompleted,
    downloadResource,
    updateResourceProgress
  } = useMembershipStore();

  const categories = [
    { id: "all", name: "All Resources", icon: "library-outline" as const },
    { id: "postpartum-guides", name: "Postpartum Guides", icon: "book-outline" as const },
    { id: "nutrition", name: "Nutrition", icon: "nutrition-outline" as const },
    { id: "recovery", name: "Recovery", icon: "heart-outline" as const },
    { id: "self-care", name: "Self-Care", icon: "flower-outline" as const },
  ];

  const filteredResources = digitalResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleResourcePress = (resource: DigitalResource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  const handleDownload = (resource: DigitalResource) => {
    downloadResource(resource.id);
    Alert.alert("Download Started", `${resource.title} is being downloaded for offline access.`);
  };

  const handleMarkComplete = (resource: DigitalResource) => {
    markResourceCompleted(resource.id, 100);
    Alert.alert("Completed!", `You've completed ${resource.title}. Great job!`);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf": return "document-text-outline";
      case "audio": return "musical-notes-outline";
      case "video": return "play-circle-outline";
      default: return "document-outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "postpartum-guides": return "bg-purple-100 text-purple-700";
      case "nutrition": return "bg-green-100 text-green-700";
      case "recovery": return "bg-blue-100 text-blue-700";
      case "self-care": return "bg-pink-100 text-pink-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const ResourceModal = () => {
    if (!selectedResource) return null;

    const isCompleted = completedResources.includes(selectedResource.id);
    const isDownloaded = downloadedResources.includes(selectedResource.id);

    return (
      <Modal
        visible={showResourceModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-cream">
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <Pressable onPress={() => setShowResourceModal(false)}>
              <Ionicons name="close" size={24} color="#4B4B4B" />
            </Pressable>
            <Text className="text-charcoal font-semibold text-lg">Resource Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView className="flex-1 px-6">
            {selectedResource.thumbnailUrl && (
              <Image
                source={{ uri: selectedResource.thumbnailUrl }}
                className="w-full h-48 rounded-2xl mt-6 mb-4"
                resizeMode="cover"
              />
            )}

            <Text className="text-charcoal text-2xl font-bold mb-2">
              {selectedResource.title}
            </Text>

            <View className="flex-row items-center mb-4">
              <View className={cn("px-3 py-1 rounded-full mr-3", getCategoryColor(selectedResource.category))}>
                <Text className="text-sm font-semibold capitalize">
                  {selectedResource.category.replace("-", " ")}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name={getResourceIcon(selectedResource.type) as any}
                  size={16}
                  color="#A6B8A0"
                />
                <Text className="text-sage text-sm ml-1 capitalize">{selectedResource.type}</Text>
              </View>
            </View>

            <Text className="text-charcoal text-base leading-6 mb-6">
              {selectedResource.description}
            </Text>

            {selectedResource.duration && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                <Text className="text-charcoal/70 ml-2">{selectedResource.duration} minutes</Text>
              </View>
            )}

            {selectedResource.fileSize && (
              <View className="flex-row items-center mb-6">
                <Ionicons name="cloud-download-outline" size={16} color="#9CA3AF" />
                <Text className="text-charcoal/70 ml-2">{selectedResource.fileSize}</Text>
              </View>
            )}

            {selectedResource.progress !== undefined && selectedResource.progress > 0 && (
              <View className="mb-6">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-charcoal font-semibold">Progress</Text>
                  <Text className="text-sage">{selectedResource.progress}%</Text>
                </View>
                <View className="bg-gray-200 rounded-full h-2">
                  <View
                    className="bg-sage rounded-full h-2"
                    style={{ width: `${selectedResource.progress}%` }}
                  />
                </View>
              </View>
            )}

            <View className="space-y-3 mb-8">
              <Pressable
                onPress={() => Alert.alert("Opening Resource", "This would open the resource for viewing/listening.")}
                className="bg-sage rounded-xl py-4 flex-row justify-center items-center"
              >
                <Ionicons name="play-outline" size={20} color="white" />
                <Text className="text-white font-semibold text-lg ml-2">
                  {selectedResource.type === "pdf" ? "View" : selectedResource.type === "audio" ? "Listen" : "Watch"}
                </Text>
              </Pressable>

              {selectedResource.isDownloadable && (
                <Pressable
                  onPress={() => handleDownload(selectedResource)}
                  disabled={isDownloaded}
                  className={cn(
                    "rounded-xl py-4 flex-row justify-center items-center border",
                    isDownloaded
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-sage"
                  )}
                >
                  <Ionicons
                    name={isDownloaded ? "checkmark-circle" : "cloud-download-outline"}
                    size={20}
                    color={isDownloaded ? "#059669" : "#A6B8A0"}
                  />
                  <Text className={cn(
                    "font-semibold text-lg ml-2",
                    isDownloaded ? "text-green-700" : "text-sage"
                  )}>
                    {isDownloaded ? "Downloaded" : "Download"}
                  </Text>
                </Pressable>
              )}

              {!isCompleted && (
                <Pressable
                  onPress={() => handleMarkComplete(selectedResource)}
                  className="bg-white rounded-xl py-4 flex-row justify-center items-center border border-terracotta"
                >
                  <Ionicons name="checkmark-outline" size={20} color="#CBA392" />
                  <Text className="text-terracotta font-semibold text-lg ml-2">Mark as Complete</Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-charcoal text-2xl font-bold mb-2">
            Digital Resources
          </Text>
          <Text className="text-charcoal/70 text-base">
            Guides, audio content, and resources to support your journey
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-4">
          <View className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex-row items-center">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search resources..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-charcoal text-base ml-3"
            />
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 mb-6"
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={cn(
                "flex-row items-center px-4 py-2 rounded-full mr-3 border",
                selectedCategory === category.id
                  ? "bg-sage border-sage"
                  : "bg-white border-gray-200"
              )}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={selectedCategory === category.id ? "white" : "#A6B8A0"}
              />
              <Text className={cn(
                "ml-2 font-semibold text-sm",
                selectedCategory === category.id ? "text-white" : "text-charcoal"
              )}>
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Resources List */}
        <View className="px-6">
          {filteredResources.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center">
              <Ionicons name="library-outline" size={48} color="#D1D5DB" />
              <Text className="text-charcoal/60 text-lg font-semibold mt-4 mb-2">No Resources Found</Text>
              <Text className="text-charcoal/50 text-center">
                Try adjusting your search or category filter
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {filteredResources.map((resource) => {
                const isCompleted = completedResources.includes(resource.id);
                const isDownloaded = downloadedResources.includes(resource.id);

                return (
                  <Pressable
                    key={resource.id}
                    onPress={() => handleResourcePress(resource)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
                  >
                    {resource.thumbnailUrl ? (
                      <Image
                        source={{ uri: resource.thumbnailUrl }}
                        className="w-16 h-16 rounded-xl mr-4"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-16 h-16 rounded-xl mr-4 bg-sage/10 items-center justify-center">
                        <Ionicons
                          name={getResourceIcon(resource.type) as any}
                          size={24}
                          color="#A6B8A0"
                        />
                      </View>
                    )}

                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-1">
                        <Text className="text-charcoal font-bold text-base flex-1 mr-2">
                          {resource.title}
                        </Text>
                        {isCompleted && (
                          <View className="bg-green-100 w-6 h-6 rounded-full items-center justify-center">
                            <Ionicons name="checkmark" size={14} color="#059669" />
                          </View>
                        )}
                      </View>

                      <Text className="text-charcoal/70 text-sm mb-2" numberOfLines={2}>
                        {resource.description}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <View className={cn("px-2 py-1 rounded-full mr-2", getCategoryColor(resource.category))}>
                            <Text className="text-xs font-semibold capitalize">
                              {resource.category.replace("-", " ")}
                            </Text>
                          </View>
                          {resource.duration && (
                            <Text className="text-charcoal/50 text-xs">
                              {resource.duration} min
                            </Text>
                          )}
                        </View>

                        <View className="flex-row items-center">
                          {isDownloaded && (
                            <Ionicons name="cloud-done" size={16} color="#059669" className="mr-2" />
                          )}
                          {resource.progress !== undefined && resource.progress > 0 && (
                            <Text className="text-sage text-sm font-semibold">
                              {resource.progress}%
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
            </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      <ResourceModal />
    </SafeAreaView>
  );
}