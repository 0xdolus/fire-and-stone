import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trash2, ShoppingBag } from 'lucide-react-native';
import { useCartStore } from '@/stores';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatCurrency } from '@/lib/format';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { ETA_MINUTES } from '@/constants';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());

  if (items.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.screenTitle}>Cart</Text>
        <EmptyState
          title="Your cart is empty"
          description="Browse our wood-fired menu and add something delicious."
          actionLabel="Browse Menu"
          onAction={() => router.push('/(tabs)/menu')}
          icon={<ShoppingBag size={48} color={colors.text.muted} />}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.screenTitle}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING, paddingBottom: 200 }}
        renderItem={({ item }) => {
          const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0);
          const lineTotal = (item.unitPrice + extrasTotal) * item.quantity;
          return (
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.thumb} contentFit="cover" />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.sub}>
                  {item.size}" · {item.extras.length ? item.extras.map((e) => e.name).join(', ') : 'No extras'}
                </Text>
                <View style={styles.rowActions}>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                  />
                  <Text style={styles.linePrice}>{formatCurrency(lineTotal)}</Text>
                </View>
              </View>
              <Pressable onPress={() => removeItem(item.id)} hitSlop={8} style={styles.trash}>
                <Trash2 size={18} color={colors.error} />
              </Pressable>
            </View>
          );
        }}
      />

      <View style={[styles.summary, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>
            {deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Est. time</Text>
          <Text style={styles.summaryValue}>{ETA_MINUTES} min</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
        <Button title="Checkout" onPress={() => router.push('/checkout')} fullWidth size="lg" />
      </View>
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
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...typography.title,
    color: colors.text.primary,
  },
  sub: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  linePrice: {
    ...typography.price,
    color: colors.primary,
  },
  trash: {
    padding: spacing.xs,
  },
  summary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: SCREEN_PADDING,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    ...typography.title,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.price,
    color: colors.primary,
    fontSize: 20,
  },
});
