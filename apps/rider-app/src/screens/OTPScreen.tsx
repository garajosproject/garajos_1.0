import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ChevronLeftSvg from '../components/icons/ChevronLeftSvg';

const OTP_LENGTH = 6;

interface Props {
  phoneNumber: string;
  onVerify: () => void;
  onBack: () => void;
}

export default function OTPScreen({ phoneNumber, onVerify, onBack }: Props) {
  const { theme } = useTheme();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  useEffect(() => {
    if (resendCountdown === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendCountdown(v => v - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true, easing: Easing.linear }),
    ]).start();
  };

  const handleChange = (text: string, index: number) => {
    setError('');
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = '';
      setOtp(next);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every(d => d !== '');

  const handleVerify = () => {
    if (!isComplete) return;
    const code = otp.join('');
    // Demo: accept any 6-digit code except "000000"
    if (code === '000000') {
      setError('Wrong OTP. Please try again.');
      shake();
      setOtp(Array(OTP_LENGTH).fill(''));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } else {
      onVerify();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    setCanResend(false);
    setResendCountdown(30);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const t = theme;
  const borderColor = error ? t.error : t.inputBorder;

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeftSvg size={24} color={t.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.textPrimary }]}>OTP Verification</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.sentLabel, { color: t.textSub }]}>
          We sent a verification code to
        </Text>
        <Text style={[styles.phone, { color: t.textPrimary }]}>
          +91 {phoneNumber}
        </Text>

        {/* OTP Boxes */}
        <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
          {otp.map((digit, i) => (
            <View
              key={i}
              style={[
                styles.otpBox,
                {
                  backgroundColor: t.inputBg,
                  borderColor: digit ? t.brand : borderColor,
                },
              ]}
            >
              <TextInput
                ref={ref => { inputRefs.current[i] = ref; }}
                style={[styles.otpInput, { color: t.textPrimary }]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={e => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                caretHidden
              />
            </View>
          ))}
        </Animated.View>

        {/* Error */}
        {error ? (
          <Text style={[styles.errorText, { color: t.error }]}>{error}</Text>
        ) : null}

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.button, !isComplete && styles.buttonDisabled]}
          onPress={handleVerify}
          activeOpacity={isComplete ? 0.85 : 1}
        >
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>

        {/* Resend */}
        <Text style={[styles.resendLabel, { color: t.textSub }]}>
          Didn't get the OTP?
        </Text>
        <TouchableOpacity onPress={handleResend} activeOpacity={canResend ? 0.7 : 1}>
          <Text style={[styles.resendLink, { color: canResend ? t.brand : t.textMuted }]}>
            {canResend ? 'Resend OTP' : `Resend in ${resendCountdown}s`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  headerRight: {
    width: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    gap: 16,
  },
  sentLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  phone: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    fontFamily: 'Lato_700Bold',
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
  errorText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    height: 52,
    backgroundColor: '#F97316',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#000000',
  },
  resendLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    marginTop: 4,
  },
  resendLink: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
  },
});
