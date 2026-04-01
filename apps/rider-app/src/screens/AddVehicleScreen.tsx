import React, { useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Rect, G } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import ChevronLeftSvg from '../components/icons/ChevronLeftSvg';
import ScanSvg from '../components/icons/ScanSvg';

interface Props {
  onContinue: (vehicleNumber: string) => void;
  onBack: () => void;
  onSkip: () => void;
}

// India number plate badge
function INDBadge() {
  return (
    <View style={styles.indBadge}>
      <Text style={styles.indFlag}>🇮🇳</Text>
      <Text style={styles.indText}>IND</Text>
    </View>
  );
}

// Format "MH12AB1234" → "MH 12 AB 1234" for display
function formatPlate(raw: string): string {
  const v = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  // State (2) + District (2) + Series (1-3 letters) + Number (4)
  if (v.length <= 2) return v;
  if (v.length <= 4) return `${v.slice(0, 2)} ${v.slice(2)}`;
  if (v.length <= 6) return `${v.slice(0, 2)} ${v.slice(2, 4)} ${v.slice(4)}`;
  return `${v.slice(0, 2)} ${v.slice(2, 4)} ${v.slice(4, 7)} ${v.slice(7, 11)}`;
}

function ManualIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M12 20H21" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04018C19.0692 3.14681 19.303 3.30316 19.5 3.5C19.697 3.69684 19.8532 3.93061 19.9598 4.18801C20.0665 4.44541 20.1213 4.72142 20.1213 5C20.1213 5.27858 20.0665 5.55459 19.9598 5.81199C19.8532 6.06939 19.697 6.30316 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function AddVehicleScreen({ onContinue, onBack, onSkip }: Props) {
  const { theme: t } = useTheme();
  const [raw, setRaw] = useState('');
  const inputRef = useRef<TextInput>(null);

  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const isValid = clean.length >= 6;
  const displayValue = formatPlate(clean);

  const handleChange = (text: string) => {
    const v = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setRaw(v);
  };

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeftSvg size={24} color={t.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.textPrimary }]}>Add Vehicle</Text>
        <TouchableOpacity onPress={onSkip} style={styles.skipBtn} activeOpacity={0.7}>
          <Text style={[styles.skipText, { color: t.textMuted }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: t.textPrimary }]}>
          Search with a vehicle number
        </Text>

        {/* Number Plate Input */}
        <TouchableOpacity
          style={[styles.plateContainer, { backgroundColor: t.bg, borderColor: raw ? t.brand : t.inputBorder }]}
          onPress={() => inputRef.current?.focus()}
          activeOpacity={0.9}
        >
          <INDBadge />
          <Text style={[styles.plateText, { color: raw ? t.textPrimary : t.textMuted }]}>
            {displayValue || 'AB 12 CD 3456'}
          </Text>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={clean}
            onChangeText={handleChange}
            autoCapitalize="characters"
            maxLength={10}
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={() => isValid && onContinue(clean)}
            selectionColor={t.brand}
            caretHidden
          />
        </TouchableOpacity>

        <Text style={[styles.hint, { color: t.textMuted }]}>
          Format: MH 12 AB 1234
        </Text>

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.primaryBtn, !isValid && styles.btnDisabled]}
          onPress={() => isValid && onContinue(clean)}
          activeOpacity={isValid ? 0.85 : 1}
        >
          <Text style={styles.primaryBtnText}>Continue</Text>
        </TouchableOpacity>

        {/* OR */}
        <View style={styles.orRow}>
          <View style={[styles.orLine, { backgroundColor: t.border }]} />
          <Text style={[styles.orText, { color: t.textMuted }]}>OR</Text>
          <View style={[styles.orLine, { backgroundColor: t.border }]} />
        </View>

        {/* Secondary options */}
        <TouchableOpacity style={[styles.secondaryBtn, { backgroundColor: t.bgSecondary, borderColor: t.border }]} activeOpacity={0.8}>
          <ScanSvg size={18} color={t.textPrimary} />
          <Text style={[styles.secondaryBtnText, { color: t.textPrimary }]}>Scan RC Book</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryBtn, { backgroundColor: t.bgSecondary, borderColor: t.border }]} activeOpacity={0.8}>
          <ManualIcon color={t.textPrimary} />
          <Text style={[styles.secondaryBtnText, { color: t.textPrimary }]}>Select Manually</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
    minHeight: 64,
    overflow: 'hidden',
  },
  indBadge: {
    backgroundColor: '#1F3A6E',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: 'center',
    gap: 2,
  },
  indFlag: { fontSize: 14 },
  indText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  plateText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 26,
    letterSpacing: 2,
    flex: 1,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  hint: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -8,
  },
  primaryBtn: {
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.45 },
  primaryBtnText: { fontFamily: 'Lato_700Bold', fontSize: 16, color: '#000000' },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orLine: { flex: 1, height: 1 },
  orText: { fontFamily: 'Lato_700Bold', fontSize: 11, letterSpacing: 1 },
  secondaryBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  secondaryBtnText: { fontFamily: 'Lato_700Bold', fontSize: 15 },
});
