import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import * as SplashScreenModule from 'expo-splash-screen';
import {
  useFonts,
  Orbitron_600SemiBold,
} from '@expo-google-fonts/orbitron';
import {
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato';

import { ThemeProvider } from './src/context/ThemeContext';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import AddVehicleIntroScreen from './src/screens/AddVehicleIntroScreen';
import AddVehicleScreen from './src/screens/AddVehicleScreen';
import VehicleConfirmationScreen from './src/screens/VehicleConfirmationScreen';
import PermissionsScreen from './src/screens/PermissionsScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import HomeScreen from './src/screens/HomeScreen';

// Keep native splash screen until fonts are loaded
SplashScreenModule.preventAutoHideAsync();

type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'otp'
  | 'profile'
  | 'add-vehicle-intro'
  | 'add-vehicle'
  | 'vehicle-confirm'
  | 'permissions'
  | 'success'
  | 'home';

function FadeScreen({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[StyleSheet.absoluteFill, { opacity }]}
    >
      {children}
    </Animated.View>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const [fontsLoaded] = useFonts({
    Orbitron_600SemiBold,
    Lato_400Regular,
    Lato_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreenModule.hideAsync();
    }
  }, [fontsLoaded]);

  const navigate = useCallback((to: AppScreen) => {
    setScreen(to);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>

        <FadeScreen visible={screen === 'splash'}>
          <SplashScreen onFinish={() => navigate('onboarding')} />
        </FadeScreen>

        <FadeScreen visible={screen === 'onboarding'}>
          <OnboardingScreen onFinish={() => navigate('login')} />
        </FadeScreen>

        <FadeScreen visible={screen === 'login'}>
          <WelcomeScreen
            onContinue={(phone) => {
              setPhoneNumber(phone);
              navigate('otp');
            }}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'otp'}>
          <OTPScreen
            phoneNumber={phoneNumber}
            onVerify={() => navigate('profile')}
            onBack={() => navigate('login')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'profile'}>
          <ProfileSetupScreen
            onNext={(name) => {
              setUserName(name);
              navigate('add-vehicle-intro');
            }}
            onBack={() => navigate('otp')}
            onSkip={() => navigate('add-vehicle-intro')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'add-vehicle-intro'}>
          <AddVehicleIntroScreen
            onAdd={() => navigate('add-vehicle')}
            onSkip={() => navigate('permissions')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'add-vehicle'}>
          <AddVehicleScreen
            onContinue={(vn) => {
              setVehicleNumber(vn);
              navigate('vehicle-confirm');
            }}
            onBack={() => navigate('add-vehicle-intro')}
            onSkip={() => navigate('permissions')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'vehicle-confirm'}>
          <VehicleConfirmationScreen
            vehicleNumber={vehicleNumber}
            onContinue={() => navigate('permissions')}
            onBack={() => navigate('add-vehicle')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'permissions'}>
          <PermissionsScreen onContinue={() => navigate('success')} />
        </FadeScreen>

        <FadeScreen visible={screen === 'success'}>
          <SuccessScreen
            userName={userName}
            onEnter={() => navigate('home')}
          />
        </FadeScreen>

        <FadeScreen visible={screen === 'home'}>
          <HomeScreen userName={userName} vehicleNumber={vehicleNumber} />
        </FadeScreen>

      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
