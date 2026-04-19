import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import LogoSvg from '../components/icons/LogoSvg';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in logo & text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    // Progress bar: 0 → 100% in 2.2s, smooth ease
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      useNativeDriver: false,
      delay: 300,
    }).start(() => {
      setTimeout(onFinish, 200);
    });
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 332],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
        <LogoSvg size={112} />
        <Text style={styles.appName}>GarajOS</Text>
      </Animated.View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  appName: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: '#fafafa',
    letterSpacing: 0.48,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  progressTrack: {
    width: 332,
    height: 8,
    backgroundColor: 'rgba(249, 115, 22, 0.25)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: '#f97316',
    borderRadius: 9999,
  },
});
