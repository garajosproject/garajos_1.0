import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import ChevronLeftSvg from '../components/icons/ChevronLeftSvg';
import CheckCircleSvg from '../components/icons/CheckCircleSvg';

interface Props {
  vehicleNumber: string;
  onContinue: () => void;
  onBack: () => void;
}

// Mock vehicle data based on number plate
const MOCK_VEHICLE = {
  make: 'Royal Enfield',
  model: 'Classic 350',
  year: '2022',
  color: 'Gunmetal Grey',
  fuelType: 'Petrol',
  cc: '349 cc',
};

export default function VehicleConfirmationScreen({ vehicleNumber, onContinue, onBack }: Props) {
  const { theme: t } = useTheme();

  const plate = vehicleNumber.toUpperCase();
  const formatted = `${plate.slice(0, 2)} ${plate.slice(2, 4)} ${plate.slice(4, 7)} ${plate.slice(7)}`;

  const details = [
    { label: 'Make', value: MOCK_VEHICLE.make },
    { label: 'Model', value: MOCK_VEHICLE.model },
    { label: 'Year', value: MOCK_VEHICLE.year },
    { label: 'Color', value: MOCK_VEHICLE.color },
    { label: 'Fuel', value: MOCK_VEHICLE.fuelType },
    { label: 'Engine', value: MOCK_VEHICLE.cc },
  ];

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeftSvg size={24} color={t.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.textPrimary }]}>Confirm Vehicle</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* Success badge */}
        <View style={styles.successBadge}>
          <CheckCircleSvg size={56} color="#F97316" />
          <Text style={[styles.successText, { color: t.textPrimary }]}>Vehicle Found!</Text>
        </View>

        {/* Number plate */}
        <View style={[styles.plateCard, { backgroundColor: t.bgCardAlt, borderColor: t.border }]}>
          <View style={styles.indBadge}>
            <Text style={styles.indFlag}>🇮🇳</Text>
            <Text style={styles.indText}>IND</Text>
          </View>
          <Text style={[styles.plateNumber, { color: t.textPrimary }]}>{formatted}</Text>
        </View>

        {/* Vehicle details */}
        <View style={[styles.detailsCard, { backgroundColor: t.bgCardAlt, borderColor: t.border }]}>
          {details.map((d, i) => (
            <View
              key={d.label}
              style={[
                styles.detailRow,
                i < details.length - 1 && { borderBottomColor: t.border, borderBottomWidth: 1 },
              ]}
            >
              <Text style={[styles.detailLabel, { color: t.textMuted }]}>{d.label}</Text>
              <Text style={[styles.detailValue, { color: t.textPrimary }]}>{d.value}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.disclaimer, { color: t.textMuted }]}>
          Vehicle details fetched from RC registration. Please verify before continuing.
        </Text>
      </View>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={onContinue} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Yes, This Is My Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.changeBtn}>
          <Text style={[styles.changeText, { color: t.brand }]}>Change vehicle number</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 16,
  },
  successBadge: { alignItems: 'center', gap: 10, marginBottom: 4 },
  successText: { fontFamily: 'Lato_700Bold', fontSize: 18 },
  plateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
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
  indText: { fontFamily: 'Lato_700Bold', fontSize: 9, color: '#FFFFFF', letterSpacing: 0.5 },
  plateNumber: { fontFamily: 'Lato_700Bold', fontSize: 24, letterSpacing: 2 },
  detailsCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailLabel: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  detailValue: { fontFamily: 'Lato_700Bold', fontSize: 13 },
  disclaimer: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
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
  changeBtn: { alignItems: 'center', paddingVertical: 8 },
  changeText: { fontFamily: 'Lato_700Bold', fontSize: 14 },
});
