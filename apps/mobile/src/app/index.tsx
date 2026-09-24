import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { TAGLINE, ACCENT_SCRIPT, APP_NAME } from '@/constants';
import { useSettingsStore } from '@/stores';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const hasOnboarded = useSettingsStore((s) => s.hasOnboarded);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(30)).current;
  const glow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(titleY, { toValue: 0, duration: 700, useNativeDriver: true }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glow, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(glow, { toValue: 0.4, duration: 800, useNativeDriver: true }),
          ])
        ),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      if (hasOnboarded) {
        router.replace('/(tabs)/menu');
      } else {
        router.replace('/onboarding');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [hasOnboarded]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[...colors.gradient.dark]} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.glow, { opacity: glow }]} />
      <Animated.View style={{ opacity: logoOpacity }}>
        <Text style={styles.logo}>{APP_NAME}</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: titleY }] }}>
        <Text style={styles.tagline}>{TAGLINE}</Text>
        <Text style={styles.script}>{ACCENT_SCRIPT}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: colors.primary,
    opacity: 0.15,
  },
  logo: {
    ...typography.displayLG,
    color: colors.text.inverse,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  tagline: {
    ...typography.caption,
    color: colors.accentOrange,
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: spacing.lg,
    textTransform: 'uppercase',
  },
  script: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
