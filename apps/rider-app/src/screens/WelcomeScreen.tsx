import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import LogoSvg from '../components/icons/LogoSvg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const BG_IMAGE = require('../../assets/welcome-bg.jpg') as number;

// WhatsApp icon
function WhatsAppIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#25D366"
      />
      <Path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.655 1.435 5.163L2 22l4.948-1.398A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        stroke="#25D366" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

interface Props {
  onContinue: (phone: string) => void;
}

export default function WelcomeScreen({ onContinue }: Props) {
  const phoneRef = useRef<TextInput>(null);
  const [phone, setPhone] = useState('');

  const isValid = phone.replace(/\D/g, '').length === 10;

  const handleContinue = () => {
    Keyboard.dismiss();
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      onContinue(digits);
    } else {
      phoneRef.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Motorcycle background + gradient fade */}
      <View style={styles.bgContainer}>
        <Image source={BG_IMAGE} style={styles.bgImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', '#000000']}
          locations={[0.55, 0.92]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Login Card — 32px from bottom, matches Figma */}
      <View style={styles.card}>
        {/* Logo + Welcome text */}
        <View style={styles.logoRow}>
          <LogoSvg size={44} />
        </View>

        <View style={styles.headingGroup}>
          <Text style={styles.welcomeText}>Welcome to GarajOS</Text>
          <Text style={styles.loginMessage}>
            Login or Join into your Digital Garage
          </Text>
        </View>

        {/* Phone input */}
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.inputField}
            activeOpacity={0.9}
            onPress={() => phoneRef.current?.focus()}
          >
            <Text style={styles.flagEmoji}>🇮🇳</Text>
            <Text style={styles.phonePrefix}>+91</Text>
            <TextInput
              ref={phoneRef}
              style={styles.phoneInput}
              placeholder="Enter Phone Number"
              placeholderTextColor="#737373"
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="done"
              selectionColor="#F97316"
              value={phone}
              onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 10))}
              onSubmitEditing={handleContinue}
            />
          </TouchableOpacity>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* OR divider */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        {/* WhatsApp sign in */}
        <TouchableOpacity style={styles.whatsappBtn} activeOpacity={0.85}>
          <WhatsAppIcon />
          <Text style={styles.whatsappText}>Sign in with WhatsApp</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>By continuing, you agree to our</Text>
        <View style={styles.termsLinks}>
          <Text style={styles.termsLink}>Terms of Service</Text>
          <Text style={styles.termsDot}>·</Text>
          <Text style={styles.termsLink}>Privacy Policy</Text>
          <Text style={styles.termsDot}>·</Text>
          <Text style={styles.termsLink}>Content Policy</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.72,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  logoRow: {
    alignItems: 'flex-start',
  },
  headingGroup: {
    gap: 4,
  },
  welcomeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 22,
    fontWeight: '700',
    color: '#FAFAFA',
    lineHeight: 30,
  },
  loginMessage: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    color: '#A3A3A3',
    lineHeight: 22,
  },
  inputWrapper: {
    gap: 0,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  flagEmoji: { fontSize: 16 },
  phonePrefix: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: '#FAFAFA',
  },
  phoneInput: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    color: '#FAFAFA',
    padding: 0,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  button: {
    height: 48,
    backgroundColor: '#F97316',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#171717',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  orText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    color: '#737373',
    letterSpacing: 1,
  },
  whatsappBtn: {
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  whatsappText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#FAFAFA',
  },
  termsText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#737373',
    textAlign: 'center',
  },
  termsLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: -8,
  },
  termsLink: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#A3A3A3',
    textDecorationLine: 'underline',
  },
  termsDot: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#3F3F3F',
  },
});
