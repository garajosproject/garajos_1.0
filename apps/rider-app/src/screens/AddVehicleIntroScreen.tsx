import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onAdd: () => void;
  onSkip: () => void;
}

function BikeIllustration() {
  return (
    <Svg width={180} height={140} viewBox="0 0 180 140" fill="none">
      {/* Glow */}
      <Ellipse cx={90} cy={120} rx={70} ry={12} fill="#F97316" fillOpacity={0.15} />
      {/* Rear wheel */}
      <Circle cx={45} cy={100} r={32} stroke="#F97316" strokeWidth={3} />
      <Circle cx={45} cy={100} r={20} stroke="#3F3F3F" strokeWidth={2} />
      <Circle cx={45} cy={100} r={5} fill="#F97316" />
      {/* Front wheel */}
      <Circle cx={138} cy={100} r={32} stroke="#F97316" strokeWidth={3} />
      <Circle cx={138} cy={100} r={20} stroke="#3F3F3F" strokeWidth={2} />
      <Circle cx={138} cy={100} r={5} fill="#F97316" />
      {/* Frame */}
      <Path d="M45 100L75 48L100 100" stroke="#F97316" strokeWidth={3} strokeLinejoin="round" />
      <Path d="M100 100L138 100" stroke="#F97316" strokeWidth={3} strokeLinecap="round" />
      <Path d="M75 48L138 68L138 100" stroke="#F97316" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {/* Tank / body */}
      <Path d="M75 48L110 40L138 68L100 100L75 48Z" fill="#F97316" fillOpacity={0.2} stroke="#F97316" strokeWidth={2} strokeLinejoin="round" />
      {/* Handlebar */}
      <Path d="M135 65L148 58L152 62" stroke="#F97316" strokeWidth={2.5} strokeLinecap="round" />
      {/* Seat */}
      <Path d="M80 50L105 42" stroke="#A3A3A3" strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

export default function AddVehicleIntroScreen({ onAdd, onSkip }: Props) {
  const { theme: t } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <View style={styles.content}>
        <BikeIllustration />

        <Text style={[styles.title, { color: t.textPrimary }]}>
          {'Add Your\nMotorcycle'}
        </Text>

        <Text style={[styles.subtitle, { color: t.textSub }]}>
          Connect your bike to GarajOS to get personalised service recommendations, nearby garage alerts, and full service history.
        </Text>

        <View style={[styles.featureRow, { backgroundColor: t.bgCardAlt, borderColor: t.border }]}>
          {[
            { icon: '🛡️', text: 'Service history' },
            { icon: '📍', text: 'Nearby garages' },
            { icon: '⚡', text: 'Instant alerts' },
          ].map(f => (
            <View key={f.text} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={[styles.featureLabel, { color: t.textSub }]}>{f.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onAdd} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Add My Motorcycle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: t.textMuted }]}>Skip for now</Text>
        </TouchableOpacity>
      </View>
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
    gap: 24,
  },
  title: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.4,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    justifyContent: 'space-around',
  },
  featureItem: { alignItems: 'center', gap: 6 },
  featureIcon: { fontSize: 24 },
  featureLabel: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
  },
  button: {
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: '#000000' },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontFamily: 'Lato_400Regular', fontSize: 14, textDecorationLine: 'underline' },
});
