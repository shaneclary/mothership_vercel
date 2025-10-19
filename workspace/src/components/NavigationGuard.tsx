import React, { ReactNode, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import safeLogger from "../utils/safeLogger";

interface NavigationGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

export default function NavigationGuard({ 
  children, 
  fallback,
  delay = 100 
}: NavigationGuardProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    safeLogger.info('Starting navigation delay', { delay }, 'NavigationGuard');
    
    // Give NavigationContainer time to fully initialize
    const timer = setTimeout(() => {
      safeLogger.info('Navigation delay complete, rendering children', undefined, 'NavigationGuard');
      setIsReady(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      safeLogger.info('NavigationGuard cleanup', undefined, 'NavigationGuard');
    };
  }, [delay]);

  if (!isReady) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <View className="items-center justify-center p-4">
        <ActivityIndicator size="small" color="#A6B8A0" />
        <Text className="text-charcoal/70 text-sm mt-2">Loading...</Text>
      </View>
    );
  }

  safeLogger.info('Rendering protected children', undefined, 'NavigationGuard');
  return <>{children}</>;
}