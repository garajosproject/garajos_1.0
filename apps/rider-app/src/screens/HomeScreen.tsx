import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LogoSvg from '../components/icons/LogoSvg';
import MapPinSvg from '../components/icons/MapPinSvg';
import SearchSvg from '../components/icons/SearchSvg';
import HomeSvg from '../components/icons/HomeSvg';
import WrenchSvg from '../components/icons/WrenchSvg';
import CartSvg from '../components/icons/CartSvg';
import UserSvg from '../components/icons/UserSvg';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type Tab = 'garaj' | 'service' | 'mygaraj' | 'market' | 'account';

interface Props {
  userName: string;
  vehicleNumber?: string;
}

function QuickActionCard({
  emoji,
  label,
  bg,
}: {
  emoji: string;
  label: string;
  bg: string;
}) {
  const { theme: t } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.quickCard, { backgroundColor: bg, borderColor: t.border }]}
      activeOpacity={0.8}
    >
      <Text style={styles.quickEmoji}>{emoji}</Text>
      <Text style={[styles.quickLabel, { color: t.textPrimary }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function ServiceCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  const { theme: t } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: t.bgCardAlt, borderColor: t.border }]}
      activeOpacity={0.8}
    >
      <Text style={styles.serviceIcon}>{icon}</Text>
      <View style={styles.serviceText}>
        <Text style={[styles.serviceTitle, { color: t.textPrimary }]}>{title}</Text>
        <Text style={[styles.serviceSub, { color: t.textSub }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.serviceArrow, { color: t.brand }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ userName, vehicleNumber }: Props) {
  const { theme: t, isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('mygaraj');

  const displayName = userName.trim() || 'Rider';
  const firstName = displayName.split(' ')[0];

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'garaj', label: 'GARAJ', icon: <HomeSvg size={22} color={activeTab === 'garaj' ? t.brand : t.textMuted} /> },
    { id: 'service', label: 'SERVICE', icon: <WrenchSvg size={22} color={activeTab === 'service' ? t.brand : t.textMuted} /> },
    { id: 'mygaraj', label: 'MY GARAJ', icon: <LogoSvg size={activeTab === 'mygaraj' ? 28 : 22} /> },
    { id: 'market', label: 'MARKET', icon: <CartSvg size={22} color={activeTab === 'market' ? t.brand : t.textMuted} /> },
    { id: 'account', label: 'ACCOUNT', icon: <UserSvg size={22} color={activeTab === 'account' ? t.brand : t.textMuted} /> },
  ];

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: t.bg, borderBottomColor: t.border }]}>
        <View style={styles.headerLeft}>
          <MapPinSvg size={18} color={t.textSub} />
          <View style={styles.locationText}>
            <Text style={[styles.locationLabel, { color: t.textMuted }]}>Your Location</Text>
            <Text style={[styles.locationValue, { color: t.textPrimary }]}>Kalyan, Thane 421306</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {/* Theme toggle */}
          <TouchableOpacity onPress={toggleTheme} style={[styles.iconBtn, { backgroundColor: t.bgCardAlt }]} activeOpacity={0.7}>
            <Text style={{ fontSize: 14 }}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: t.bgCardAlt }]} activeOpacity={0.7}>
            <SearchSvg size={18} color={t.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greetingText, { color: t.textPrimary }]}>
            Hey, {firstName} 👋
          </Text>
          <Text style={[styles.greetingSub, { color: t.textSub }]}>
            What do you need today?
          </Text>
        </View>

        {/* Vehicle chip */}
        {vehicleNumber ? (
          <View style={[styles.vehicleChip, { backgroundColor: t.bgCardAlt, borderColor: t.border }]}>
            <Text style={{ fontSize: 16 }}>🏍️</Text>
            <Text style={[styles.vehicleChipText, { color: t.textPrimary }]}>
              {vehicleNumber.toUpperCase().replace(/(.{2})(.{2})(.{3})(.{4})/, '$1 $2 $3 $4')}
            </Text>
            <View style={[styles.vehicleChipDot, { backgroundColor: '#22C55E' }]} />
          </View>
        ) : null}

        {/* Quick actions */}
        <Text style={[styles.sectionTitle, { color: t.textPrimary }]}>Quick Actions</Text>
        <View style={styles.quickRow}>
          <QuickActionCard emoji="🔧" label="Service" bg={t.bgCardAlt} />
          <QuickActionCard emoji="🏪" label="Find Garage" bg={t.bgCardAlt} />
          <QuickActionCard emoji="📋" label="History" bg={t.bgCardAlt} />
          <QuickActionCard emoji="🚨" label="SOS" bg="rgba(239,68,68,0.12)" />
        </View>

        {/* Services */}
        <Text style={[styles.sectionTitle, { color: t.textPrimary }]}>Services</Text>
        <View style={styles.servicesList}>
          <ServiceCard icon="🛢️" title="Oil Change" subtitle="Every 3,000 km" />
          <ServiceCard icon="🔋" title="Battery Check" subtitle="Free inspection" />
          <ServiceCard icon="🛞" title="Tyre Service" subtitle="Puncture repair · Rotation" />
          <ServiceCard icon="🧹" title="Bike Wash" subtitle="Doorstep available" />
        </View>

        {/* Nearby garages banner */}
        <View style={[styles.nearbyBanner, { backgroundColor: t.bgCardAlt, borderColor: t.brand }]}>
          <View>
            <Text style={[styles.nearbyTitle, { color: t.textPrimary }]}>3 Garages Nearby</Text>
            <Text style={[styles.nearbySub, { color: t.textSub }]}>Within 2 km · Open now</Text>
          </View>
          <TouchableOpacity style={[styles.nearbyBtn, { backgroundColor: t.brand }]} activeOpacity={0.8}>
            <Text style={styles.nearbyBtnText}>View</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: t.bg, borderTopColor: t.border }]}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabItem,
              tab.id === 'mygaraj' && styles.tabItemCenter,
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            {tab.id === 'mygaraj' ? (
              <View style={[styles.logoTabBg, activeTab === 'mygaraj' && { borderColor: t.textPrimary }]}>
                {tab.icon}
              </View>
            ) : (
              tab.icon
            )}
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeTab === tab.id
                    ? tab.id === 'mygaraj' ? t.textPrimary : t.brand
                    : t.textMuted,
                  fontFamily: activeTab === tab.id ? 'Lato_700Bold' : 'Lato_400Regular',
                },
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.id && tab.id !== 'mygaraj' && (
              <View style={[styles.tabIndicator, { backgroundColor: t.brand }]} />
            )}
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locationText: { gap: 1 },
  locationLabel: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  locationValue: { fontFamily: 'Lato_700Bold', fontSize: 13 },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },
  greetingSection: { marginBottom: 16, gap: 4 },
  greetingText: { fontFamily: 'Orbitron_600SemiBold', fontSize: 20, letterSpacing: 0.3 },
  greetingSub: { fontFamily: 'Lato_400Regular', fontSize: 14 },
  vehicleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  vehicleChipText: { fontFamily: 'Lato_700Bold', fontSize: 14, letterSpacing: 1 },
  vehicleChipDot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    letterSpacing: 0.2,
    marginBottom: 12,
    marginTop: 4,
  },
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  quickCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  quickEmoji: { fontSize: 22 },
  quickLabel: { fontFamily: 'Lato_400Regular', fontSize: 11, textAlign: 'center' },
  servicesList: { gap: 10, marginBottom: 24 },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  serviceIcon: { fontSize: 22, width: 32, textAlign: 'center' },
  serviceText: { flex: 1, gap: 3 },
  serviceTitle: { fontFamily: 'Lato_700Bold', fontSize: 14 },
  serviceSub: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  serviceArrow: { fontSize: 22, lineHeight: 24 },
  nearbyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  nearbyTitle: { fontFamily: 'Lato_700Bold', fontSize: 15 },
  nearbySub: { fontFamily: 'Lato_400Regular', fontSize: 12, marginTop: 2 },
  nearbyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  nearbyBtnText: { fontFamily: 'Lato_700Bold', fontSize: 13, color: '#000000' },
  bottomNav: {
    flexDirection: 'row',
    height: 72,
    borderTopWidth: 1,
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
    gap: 3,
    position: 'relative',
  },
  tabItemCenter: {
    justifyContent: 'flex-end',
  },
  logoTabBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  tabLabel: {
    fontSize: 9,
    letterSpacing: 0.3,
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 2,
    borderRadius: 1,
  },
});
