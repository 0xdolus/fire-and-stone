import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { useSettingsStore } from '@/stores';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';

const MENU = [
  { icon: MapPin, label: 'Addresses', route: null },
  { icon: CreditCard, label: 'Payment Methods', route: null },
  { icon: Bell, label: 'Notifications', route: null, toggle: true },
  { icon: HelpCircle, label: 'Help & Support', route: null },
  { icon: Info, label: 'About Fire & Stone Pizza', route: null },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled);
  const setHasOnboarded = useSettingsStore((s) => s.setHasOnboarded);

  const logout = () => {
    setHasOnboarded(false);
    router.replace('/onboarding');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <Text style={styles.screenTitle}>Account</Text>

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <User size={32} color={colors.text.inverse} />
          </View>
          <View>
            <Text style={styles.name}>Fire & Stone Guest</Text>
            <Text style={styles.phone}>Sign in coming in Phase 2</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable
              key={item.label}
              style={styles.menuItem}
              onPress={() => {
                // Settings detail screens planned for Phase 2
              }}
            >
              <View style={styles.menuLeft}>
                <item.icon size={20} color={colors.primary} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              {item.toggle ? (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ true: colors.primary, false: colors.border }}
                />
              ) : (
                <ChevronRight size={18} color={colors.text.muted} />
              )}
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logout} onPress={logout}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log out / Reset onboarding</Text>
        </Pressable>

        <Text style={styles.version}>Fire & Stone Pizza v2.0 · Demo Shell</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenTitle: {
    ...typography.heading,
    color: colors.text.primary,
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: spacing.lg,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.title,
    color: colors.text.primary,
  },
  phone: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  menu: {
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  version: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
