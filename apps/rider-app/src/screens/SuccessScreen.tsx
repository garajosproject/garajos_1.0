import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LogoSvg from '../components/icons/LogoSvg';

interface Props {
  userName: string;
  onEnter: () => void;
}

export default function SuccessScreen({ userName, onEnter }: Props) {
  const { theme: t } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const displayName = userName.trim() || 'Rider';
  const greeting = `Welcome, ${displayName}!`;

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <View style={styles.content}>
        {/* Animated logo */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
          <View style={[styles.logoBg, { backgroundColor: 'rgba(249,115,22,0.12)' }]}>
            <LogoSvg size={72} />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim, transform: [{ translateY: slideAnim }], alignItems: 'center', gap: 12 }}>
          <Text style={[styles.title, { color: t.textPrimary }]}>You're All Set!</Text>
          <Text style={[styles.greeting, { color: t.brand }]}>{greeting}</Text>
          <Text style={[styles.subtitle, { color: t.textSub }]}>
            Your digital garage is ready. Start exploring nearby garages and managing your ride.
          </Text>

          {/* Checklist */}
          <View style={styles.checklist}>
            {[
              'Profile created',
              'Motorcycle added',
              'Permissions configured',
            ].map(item => (
              <View key={item} style={styles.checkItem}>
                <Text style={[styles.checkIcon, { color: t.brand }]}>✓</Text>
                <Text style={[styles.checkLabel, { color: t.textSub }]}>{item}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.footer, { opacity: opacityAnim }]}>
        <TouchableOpacity style={styles.enterBtn} onPress={onEnter} activeOpacity={0.85}>
          <Text style={styles.enterBtnText}>Go to My Garaj</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 28,
  },
  logoBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  greeting: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  checklist: { gap: 10, marginTop: 8 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkIcon: { fontFamily: 'Lato_700Bold', fontSize: 16, width: 20 },
  checkLabel: { fontFamily: 'Lato_400Regular', fontSize: 14 },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  enterBtn: {
    height: 56,
    backgroundColor: '#F97316',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterBtnText: { fontFamily: 'Lato_700Bold', fontSize: 17, color: '#000000' },
});
