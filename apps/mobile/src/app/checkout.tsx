import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, CreditCard, Clock, ChevronLeft } from 'lucide-react-native';
import { useCartStore, useOrderStore } from '@/stores';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/format';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';

const ADDRESSES = [
  { id: '1', label: 'Home', street: '42 Ember Lane', city: 'Melbourne VIC 3000' },
  { id: '2', label: 'Work', street: '18 Stone Ave', city: 'Southbank VIC 3006' },
];

const PAYMENTS = [
  { id: 'cash', label: 'Cash on Delivery' },
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'mobile', label: 'Mobile Money' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const deliveryFee = useCartStore((s) => s.deliveryFee());
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [addressId, setAddressId] = useState(ADDRESSES[0].id);
  const [paymentId, setPaymentId] = useState(PAYMENTS[0].id);
  const [asap, setAsap] = useState(true);
  const [loading, setLoading] = useState(false);

  const address = ADDRESSES.find((a) => a.id === addressId)!;
  const payment = PAYMENTS.find((p) => p.id === paymentId)!;

  const handlePlace = () => {
    setLoading(true);
    const order = placeOrder({
      items,
      subtotal,
      deliveryFee,
      total,
      address: `${address.street}, ${address.city}`,
      paymentMethod: payment.label,
    });
    clearCart();
    setTimeout(() => {
      setLoading(false);
      router.replace({ pathname: '/success', params: { orderId: order.id } });
    }, 600);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <ChevronLeft size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: SCREEN_PADDING, paddingBottom: 140 }}>
        {/* Address */}
        <Text style={styles.sectionTitle}>
          <MapPin size={16} color={colors.primary} /> Delivery Address
        </Text>
        {ADDRESSES.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => setAddressId(a.id)}
            style={[styles.card, addressId === a.id && styles.cardActive]}
          >
            <Text style={styles.cardLabel}>{a.label}</Text>
            <Text style={styles.cardSub}>
              {a.street}, {a.city}
            </Text>
          </Pressable>
        ))}

        {/* Timing */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          <Clock size={16} color={colors.primary} /> Delivery Option
        </Text>
        <View style={styles.row}>
          <Pressable
            onPress={() => setAsap(true)}
            style={[styles.option, asap && styles.optionActive]}
          >
            <Text style={[styles.optionText, asap && styles.optionTextActive]}>ASAP</Text>
          </Pressable>
          <Pressable
            onPress={() => setAsap(false)}
            style={[styles.option, !asap && styles.optionActive]}
          >
            <Text style={[styles.optionText, !asap && styles.optionTextActive]}>Scheduled</Text>
          </Pressable>
        </View>

        {/* Payment */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          <CreditCard size={16} color={colors.primary} /> Payment Method
        </Text>
        {PAYMENTS.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => setPaymentId(p.id)}
            style={[styles.card, paymentId === p.id && styles.cardActive]}
          >
            <Text style={styles.cardLabel}>{p.label}</Text>
          </Pressable>
        ))}

        {/* Summary */}
        <View style={styles.summaryBox}>
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
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          title={`Place Order · ${formatCurrency(total)}`}
          onPress={handlePlace}
          loading={loading}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  sectionTitle: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5F2',
  },
  cardLabel: {
    ...typography.title,
    color: colors.text.primary,
  },
  cardSub: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionText: {
    ...typography.title,
    color: colors.text.primary,
  },
  optionTextActive: {
    color: colors.text.inverse,
  },
  summaryBox: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalRow: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xs,
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
  cta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: SCREEN_PADDING,
  },
});
