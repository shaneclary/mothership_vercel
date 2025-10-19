import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import safeLogger from "../utils/safeLogger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  isNavigationError: boolean;
  errorMessage?: string;
  retryCount: number;
}

export default class NavigationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      isNavigationError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Determine if this is a navigation context error
    const isNavigationError = error.message.includes("navigation context") || 
                             error.message.includes("MISSING_CONTEXT_ERROR") ||
                             error.message.includes("NavigationStateContext");

    // Log the error safely (no console calls in static method)
    safeLogger.error('Error boundary caught error', {
      message: error.message,
      isNavigationError,
      stack: error.stack?.substring(0, 200) // Limit stack trace
    }, 'NavigationErrorBoundary');

    return { 
      hasError: true, 
      isNavigationError,
      errorMessage: error.message
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Safe logging without direct console calls
    safeLogger.error('Component error details', {
      errorMessage: error.message,
      componentStack: errorInfo.componentStack?.substring(0, 300), // Limit size
      isNavigationError: this.state.isNavigationError
    }, 'NavigationErrorBoundary');

    // Update state with error info (no console calls here)
    this.setState(prevState => ({
      ...prevState,
      hasError: true,
      isNavigationError: prevState.isNavigationError,
      errorMessage: error.message
    }));
  }

  handleRetry = () => {
    safeLogger.info('Error boundary retry requested', { 
      retryCount: this.state.retryCount + 1 
    }, 'NavigationErrorBoundary');

    this.setState(prevState => ({ 
      hasError: false, 
      isNavigationError: false,
      errorMessage: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="bg-sage rounded-2xl p-6 mx-6 mt-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mr-4">
              <Ionicons name="warning-outline" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">
                {this.state.isNavigationError ? "Navigation Loading..." : "Something went wrong"}
              </Text>
              <Text className="text-white/90 text-sm">
                {this.state.isNavigationError 
                  ? "The navigation system is still initializing. Please wait a moment."
                  : "We encountered an unexpected error."
                }
              </Text>
            </View>
          </View>

          <Pressable
            onPress={this.handleRetry}
            className="bg-white py-3 rounded-xl mt-4"
          >
            <Text className="text-sage font-semibold text-center">
              {this.state.isNavigationError ? "Retry" : "Try Again"}
            </Text>
          </Pressable>

          {/* Debug info in development - safe display */}
          {__DEV__ && this.state.errorMessage && (
            <View className="mt-4 p-3 bg-white/10 rounded">
              <Text className="text-white/60 text-xs" numberOfLines={2}>
                Debug: {this.state.errorMessage.substring(0, 100)}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}