import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import LogoSvg from '../components/icons/LogoSvg';

const { width: W } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

const SLIDES = [
  {
    icon: 'garage',
    title: 'Find Nearby Garages',
    subtitle: 'Connect with verified mechanics and garages in your area instantly.',
  },
  {
    icon: 'tracking',
    title: 'Real-time Tracking',
    subtitle: 'Follow your bike\'s service progress live — no more waiting in the dark.',
  },
  {
    icon: 'vehicle',
    title: 'Your Digital Garage',
    subtitle: 'Manage all your vehicles, service history, and documents in one place.',
  },
];

function GarageIcon() {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
      <Circle cx={48} cy={48} r={48} fill="#F97316" fillOpacity={0.12} />
      <Path d="M20 60V42L48 24L76 42V60H20Z" stroke="#F97316" strokeWidth={2.5} strokeLinejoin="round" />
      <Rect x={36} y={42} width={24} height={18} rx={2} stroke="#F97316" strokeWidth={2.5} />
      <Path d="M44 60V51H52V60" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M20 60H76" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function TrackingIcon() {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
      <Circle cx={48} cy={48} r={48} fill="#F97316" fillOpacity={0.12} />
      <Circle cx={48} cy={48} r={20} stroke="#F97316" strokeWidth={2.5} />
      <Circle cx={48} cy={48} r={6} fill="#F97316" />
      <Path d="M48 18V28" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M48 68V78" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M18 48H28" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M68 48H78" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function VehicleIcon() {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
      <Circle cx={48} cy={48} r={48} fill="#F97316" fillOpacity={0.12} />
      <Circle cx={28} cy={60} r={10} stroke="#F97316" strokeWidth={2.5} />
      <Circle cx={28} cy={60} r={4} fill="#F97316" />
      <Circle cx={68} cy={60} r={10} stroke="#F97316" strokeWidth={2.5} />
      <Circle cx={68} cy={60} r={4} fill="#F97316" />
      <Path d="M18 60H38M58 60H78" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M38 60L46 36H62L74 52" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M46 36L38 52H72" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const ICONS = [GarageIcon, TrackingIcon, VehicleIcon];

export default function OnboardingScreen({ onFinish }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / W);
    setActiveIndex(idx);
  };

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: W * (activeIndex + 1), animated: true });
      setActiveIndex(activeIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={onFinish} activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, i) => {
          const Icon = ICONS[i];
          return (
            <View key={i} style={[styles.slide, { width: W }]}>
              <View style={styles.iconContainer}>
                <Icon />
              </View>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.button} onPress={goNext} activeOpacity={0.85}>
        <Text style={styles.buttonText}>
          {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>

      {/* Branding */}
      <View style={styles.brandRow}>
        <LogoSvg size={16} />
        <Text style={styles.brandText}>GarajOS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#737373',
  },
  scrollView: {
    flex: 1,
    marginTop: 80,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    gap: 24,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 22,
    fontWeight: '600',
    color: '#FAFAFA',
    textAlign: 'center',
    letterSpacing: 0.4,
    lineHeight: 30,
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: '#A3A3A3',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    height: 4,
    borderRadius: 9999,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#F97316',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#3F3F3F',
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 24,
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 40,
  },
  brandText: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 12,
    color: '#3F3F3F',
    letterSpacing: 0.5,
  },
});
