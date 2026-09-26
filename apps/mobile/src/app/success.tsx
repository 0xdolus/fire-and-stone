import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, SCREEN_PADDING } from '@/theme/spacing';
import { ETA_MINUTES } from '@/constants';

export default function SuccessScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xxxl }]}>
      <CheckCircle size={80} color={colors.success} strokeWidth={1.5} />
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.orderId}>Order {orderId}</Text>
      <Text style={styles.eta}>Estimated arrival in ~{ETA_MINUTES} minutes</Text>

      <View style={styles.actions}>
        <Button
          title="Track Order"
          onPress={() => router.replace(`/tracking/${orderId}`)}
          fullWidth
          size="lg"
        />
        <Button
          title="Return Home"
          variant="secondary"
          onPress={() => router.replace('/(tabs)/menu')}
          fullWidth
          style={{ marginTop: spacing.md }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  title: {
    ...typography.heading,
    color: colors.text.primary,
    marginTop: spacing.xl,
  },
  orderId: {
    ...typography.title,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  eta: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    marginTop: spacing.xxxl,
  },
});
