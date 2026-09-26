import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClipboardList } from 'lucide-react-native';
import { useOrderStore } from '@/stores';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/format';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { OrderStatus } from '@/types';

const STATUS_LABEL: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'On the way',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  confirmed: colors.accentOrange,
  preparing: colors.accentOrange,
  out_for_delivery: colors.primary,
  delivered: colors.success,
  cancelled: colors.error,
};

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const orders = useOrderStore((s) => s.orders);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');
  const past = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');
  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Orders</Text>

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab('upcoming')}
          style={[styles.tab, tab === 'upcoming' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('past')}
          style={[styles.tab, tab === 'past' && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === 'past' && styles.tabTextActive]}>Past</Text>
        </Pressable>
      </View>

      {list.length === 0 ? (
        <EmptyState
          title={tab === 'upcoming' ? 'No upcoming orders' : 'No past orders'}
          description="Your order history will appear here."
          actionLabel="Browse Menu"
          onAction={() => router.push('/(tabs)/menu')}
          icon={<ClipboardList size={48} color={colors.text.muted} />}
        />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: SCREEN_PADDING, paddingBottom: spacing.xxxl }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => {
                if (item.status !== 'delivered' && item.status !== 'cancelled') {
                  router.push(`/tracking/${item.id}`);
                }
              }}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={{ uri: item.items[0]?.image }}
                  style={styles.thumb}
                  contentFit="cover"
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
                  <Text style={styles.items}>
                    {item.items.length} item{item.items.length > 1 ? 's' : ''} ·{' '}
                    {formatCurrency(item.total)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: STATUS_COLOR[item.status] + '22' },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>
                    {STATUS_LABEL[item.status]}
                  </Text>
                </View>
              </View>
              {item.status !== 'delivered' && item.status !== 'cancelled' && (
                <Button
                  title="Track"
                  size="sm"
                  onPress={() => router.push(`/tracking/${item.id}`)}
                  style={{ marginTop: spacing.md }}
                />
              )}
            </Pressable>
          )}
        />
      )}
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
  tabs: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 4,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.md,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.text.inverse,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
  },
  cardInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.title,
    color: colors.text.primary,
  },
  date: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  items: {
    ...typography.caption,
    color: colors.text.primary,
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 11,
  },
});
