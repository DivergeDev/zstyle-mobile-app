import React, { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Video, ResizeMode } from "expo-av"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated"

interface VideoAvatarProps {
  isIdle?: boolean
  isSpeaking?: boolean
  isListening?: boolean
  onVideoLoad?: () => void
  onVideoError?: (error: any) => void
}

const { width: screenWidth } = Dimensions.get("window")

export const VideoAvatar: React.FC<VideoAvatarProps> = ({
  isIdle = true,
  isSpeaking = false,
  isListening = false,
  onVideoLoad,
  onVideoError,
}) => {
  const videoRef = useRef<Video>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Animation values
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const pulseScale = useSharedValue(1)

  // Animated styles
  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }))

  // Handle state changes
  useEffect(() => {
    if (isSpeaking) {
      // Speaking animation - gentle bounce
      scale.value = withRepeat(
        withSequence(withTiming(1.05, { duration: 300 }), withTiming(1, { duration: 300 })),
        -1,
        true,
      )
    } else if (isListening) {
      // Listening animation - pulse effect
      pulseScale.value = withRepeat(
        withSequence(withTiming(1.1, { duration: 800 }), withTiming(1, { duration: 800 })),
        -1,
        true,
      )
    } else {
      // Idle state - reset animations
      scale.value = withTiming(1, { duration: 300 })
      pulseScale.value = withTiming(1, { duration: 300 })
    }
  }, [isSpeaking, isListening, isIdle])

  const handleVideoLoad = () => {
    setIsLoaded(true)
    onVideoLoad?.()
  }

  const handleVideoError = (error: any) => {
    console.error("Video avatar error:", error)
    onVideoError?.(error)
  }

  return (
    <View style={styles.container}>
      {/* Pulse effect background for listening state */}
      {isListening && <Animated.View style={[styles.pulseBackground, pulseStyle]} />}

      {/* Avatar container */}
      <Animated.View style={[styles.avatarContainer, avatarStyle]}>
        {/* For now, we'll use a placeholder circle since we don't have video files */}
        {/* In a real implementation, you would use Video component with actual video files */}
        <View style={styles.avatarPlaceholder}>
          <View
            style={[
              styles.avatarFace,
              {
                backgroundColor: isSpeaking ? "#4F46E5" : isListening ? "#10B981" : "#6B7280",
              },
            ]}
          >
            {/* Simple face representation */}
            <View style={styles.eyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View
              style={[
                styles.mouth,
                {
                  height: isSpeaking ? 8 : 4,
                  borderRadius: isSpeaking ? 4 : 2,
                },
              ]}
            />
          </View>
        </View>

        {/* Uncomment this when you have actual video files */}
        {/*
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: 'your-avatar-video-url' }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={isSpeaking}
          isLooping={true}
          isMuted={true}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
        />
        */}
      </Animated.View>

      {/* Status indicator */}
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: isSpeaking ? "#EF4444" : isListening ? "#10B981" : "#6B7280",
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 80,
    elevation: 8,
    height: 160,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: 160,
  },
  avatarFace: {
    alignItems: "center",
    borderRadius: 60,
    height: 120,
    justifyContent: "center",
    position: "relative",
    width: 120,
  },
  avatarPlaceholder: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  eye: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    height: 12,
    marginHorizontal: 8,
    width: 12,
  },
  eyes: {
    flexDirection: "row",
    marginBottom: 20,
  },
  mouth: {
    backgroundColor: "#FFFFFF",
    width: 20,
  },
  pulseBackground: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 100,
    height: 200,
    position: "absolute",
    width: 200,
  },
  statusContainer: {
    bottom: -10,
    position: "absolute",
    right: 10,
  },
  statusDot: {
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    height: 16,
    width: 16,
  },
  video: {
    height: "100%",
    width: "100%",
  },
})
