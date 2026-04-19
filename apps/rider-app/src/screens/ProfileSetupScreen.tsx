import React, { useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import ChevronLeftSvg from '../components/icons/ChevronLeftSvg';
import LogoSvg from '../components/icons/LogoSvg';

interface Props {
  onNext: (name: string) => void;
  onBack: () => void;
  onSkip: () => void;
}

function CameraIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19C23 20.1 22.1 21 21 21H3C1.9 21 1 20.1 1 19V8C1 6.9 1.9 6 3 6H7L9 3H15L17 6H21C22.1 6 23 6.9 23 8V19Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Circle cx={12} cy={13} r={4} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export default function ProfileSetupScreen({ onNext, onBack, onSkip }: Props) {
  const { theme: t } = useTheme();
  const [name, setName] = useState('');
  const nameRef = useRef<TextInput>(null);

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      nameRef.current?.focus();
      return;
    }
    onNext(trimmed);
  };

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeftSvg size={24} color={t.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.textPrimary }]}>Profile Setup</Text>
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: t.textMuted }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: t.bgSecondary, borderColor: t.borderStrong }]}>
            <LogoSvg size={48} />
          </View>
          <TouchableOpacity style={[styles.cameraBadge, { backgroundColor: t.brand }]} activeOpacity={0.8}>
            <CameraIcon color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.avatarHint, { color: t.textMuted }]}>Tap to add a photo</Text>

        {/* Name input */}
        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, { color: t.textSub }]}>FULL NAME</Text>
          <TextInput
            ref={nameRef}
            style={[
              styles.input,
              {
                color: t.textPrimary,
                backgroundColor: t.inputBg,
                borderColor: t.inputBorder,
              },
            ]}
            placeholder="Enter your name"
            placeholderTextColor={t.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
            selectionColor={t.brand}
          />
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* CTA */}
        <TouchableOpacity
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={styles.skipLinkBtn}>
          <Text style={[styles.skipLink, { color: t.textMuted }]}>Set up later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  headerTitle: { flex: 1, fontFamily: 'Lato_700Bold', fontSize: 16, textAlign: 'center' },
  skipBtn: { width: 36, alignItems: 'flex-end' },
  skipText: { fontFamily: 'Lato_400Regular', fontSize: 14 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  avatarSection: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarHint: { fontFamily: 'Lato_400Regular', fontSize: 12, marginBottom: 32 },
  inputSection: { alignSelf: 'stretch', gap: 8 },
  inputLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  button: {
    alignSelf: 'stretch',
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: '#000000' },
  skipLinkBtn: { paddingVertical: 8 },
  skipLink: { fontFamily: 'Lato_400Regular', fontSize: 14, textDecorationLine: 'underline' },
});
