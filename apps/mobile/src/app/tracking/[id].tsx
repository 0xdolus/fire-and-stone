import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useOrderStore } from '@/stores';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { OrderStatus } from '@/types';
import { formatTime } from '@/lib/format';
import { ETA_MINUTES } from '@/constants';

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'confirmed', label: 'Order Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  confirmed: 0,
  preparing: 1,
  out_for_delivery: 2,
  delivered: 3,
  cancelled: -1,
};

export default function TrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const order = useOrderStore((s) => s.getOrder(id || ''));
  const updateStatus = useOrderStore((s) => s.updateStatus);
  const [elapsed, setElapsed] = useState(0);

  // Mock timeline progression
  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    const timers: NodeJS.Timeout[] = [];
    const schedule = [
      { at: 5, status: 'preparing' as OrderStatus },
      { at: 20, status: 'out_for_delivery' as OrderStatus },
      { at: 45, status: 'delivered' as OrderStatus },
    ];
    schedule.forEach(({ at, status }) => {
      timers.push(
        setTimeout(() => {
          updateStatus(order.id, status);
        }, at * 1000)
      );
    });
    const tick = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
    };
  }, [order?.id]);

  if (!order) {
    return (
      <View style={styles.center}>
        <Text>Order not found</Text>
      </View>
    );
  }

  const currentIdx = STATUS_INDEX[order.status];
  const remaining = Math.max(0, ETA_MINUTES - Math.floor(elapsed / 2));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.etaCard}>
        <Text style={styles.etaLabel}>Estimated arrival</Text>
        <Text style={styles.etaValue}>
          {order.status === 'delivered' ? 'Delivered!' : `~${remaining} min`}
        </Text>
        <Text style={styles.orderId}>{order.id}</Text>
      </View>

      <View style={styles.timeline}>
        {STEPS.map((step, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          return (
            <View key={step.key} style={styles.step}>
              <View style={styles.stepLeft}>
                <View style={[styles.dot, done && styles.dotDone, active && styles.dotActive]}>
                  {done && <Check size={14} color={colors.text.inverse} strokeWidth={3} />}
                </View>
                {i < STEPS.length - 1 && (
                  <View style={[styles.line, i < currentIdx && styles.lineDone]} />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{step.label}</Text>
                {active && order.status !== 'delivered' && (
                  <Text style={styles.stepSub}>In progress…</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.details}>
        <Text style={styles.detailLabel}>Delivering to</Text>
        <Text style={styles.detailValue}>{order.address}</Text>
        <Text style={[styles.detailLabel, { marginTop: spacing.md }]}>Placed at</Text>
        <Text style={styles.detailValue}>{formatTime(order.createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.text.primary,
  },
  etaCard: {
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
  },
  etaLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.8)',
  },
  etaValue: {
    ...typography.displayLG,
    color: colors.text.inverse,
    marginTop: spacing.xs,
  },
  orderId: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.sm,
  },
  timeline: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: spacing.xxl,
  },
  step: {
    flexDirection: 'row',
    minHeight: 64,
  },
  stepLeft: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: colors.success,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  stepContent: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingTop: 4,
  },
  stepLabel: {
    ...typography.title,
    color: colors.text.muted,
  },
  stepLabelDone: {
    color: colors.text.primary,
  },
  stepSub: {
    ...typography.caption,
    color: colors.primary,
    marginTop: 2,
  },
  details: {
    marginTop: spacing.xxl,
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
    marginTop: 2,
  },
});
