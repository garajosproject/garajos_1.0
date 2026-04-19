import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import MapPinSvg from '../components/icons/MapPinSvg';
import BellSvg from '../components/icons/BellSvg';
import LogoSvg from '../components/icons/LogoSvg';

interface Props {
  onContinue: () => void;
}

export default function PermissionsScreen({ onContinue }: Props) {
  const { theme: t } = useTheme();
  const [locationGranted, setLocationGranted] = useState(false);
  const [notifGranted, setNotifGranted] = useState(false);

  const permissions = [
    {
      id: 'location',
      icon: <MapPinSvg size={24} color={t.brand} />,
      title: 'Location Access',
      description: 'Find garages near you and get accurate service estimates.',
      granted: locationGranted,
      onAllow: () => setLocationGranted(true),
    },
    {
      id: 'notifications',
      icon: <BellSvg size={24} color={t.brand} />,
      title: 'Notifications',
      description: 'Get real-time updates on service progress and reminders.',
      granted: notifGranted,
      onAllow: () => setNotifGranted(true),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <View style={styles.content}>
        <LogoSvg size={48} />

        <Text style={[styles.title, { color: t.textPrimary }]}>
          {'Allow\nPermissions'}
        </Text>
        <Text style={[styles.subtitle, { color: t.textSub }]}>
          GarajOS needs a couple of permissions to give you the best experience.
        </Text>

        <View style={styles.cardsWrapper}>
          {permissions.map(p => (
            <View
              key={p.id}
              style={[styles.permCard, { backgroundColor: t.bgCardAlt, borderColor: p.granted ? t.brand : t.border }]}
            >
              <View style={[styles.iconBadge, { backgroundColor: t.bgCardSoft }]}>
                {p.icon}
              </View>
              <View style={styles.permText}>
                <Text style={[styles.permTitle, { color: t.textPrimary }]}>{p.title}</Text>
                <Text style={[styles.permDesc, { color: t.textSub }]}>{p.description}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.allowBtn,
                  p.granted
                    ? { backgroundColor: t.bgSecondary }
                    : { backgroundColor: t.brand },
                ]}
                onPress={p.onAllow}
                activeOpacity={p.granted ? 1 : 0.85}
              >
                <Text style={[styles.allowText, { color: p.granted ? t.brand : '#000000' }]}>
                  {p.granted ? '✓ Allowed' : 'Allow'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={onContinue} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onContinue} activeOpacity={0.7}>
          <Text style={[styles.skipText, { color: t.textMuted }]}>
            Maybe later
          </Text>
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
    paddingHorizontal: 24,
    paddingTop: 64,
    gap: 20,
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
  cardsWrapper: { alignSelf: 'stretch', gap: 12 },
  permCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permText: { flex: 1, gap: 4 },
  permTitle: { fontFamily: 'Lato_700Bold', fontSize: 14 },
  permDesc: { fontFamily: 'Lato_400Regular', fontSize: 12, lineHeight: 17 },
  allowBtn: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 72,
    alignItems: 'center',
  },
  allowText: { fontFamily: 'Lato_700Bold', fontSize: 13 },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 12,
  },
  continueBtn: {
    alignSelf: 'stretch',
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: '#000000' },
  skipText: { fontFamily: 'Lato_400Regular', fontSize: 14, textDecorationLine: 'underline' },
});
