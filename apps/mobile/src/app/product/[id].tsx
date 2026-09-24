import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Share,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Share2, ChevronLeft, Check } from 'lucide-react-native';
import { products } from '@/data/products';
import { useCartStore, useFavoritesStore } from '@/stores';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { Extra, PizzaSize } from '@/types';
import { formatCurrency } from '@/lib/format';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const product = products.find((p) => p.id === id);

  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id || ''));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  const defaultSize = product?.sizes.find((s) => s.size === '12') || product?.sizes[0];
  const [size, setSize] = useState<PizzaSize>(defaultSize?.size || '12');
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [qty, setQty] = useState(1);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const sizePrice = product.sizes.find((s) => s.size === size)?.price ?? product.basePrice;
    const extras = selectedExtras.reduce((s, e) => s + e.price, 0);
    return sizePrice + extras;
  }, [product, size, selectedExtras]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
        <Button title="Go back" onPress={() => router.back()} />
      </View>
    );
  }

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size,
      quantity: qty,
      unitPrice: product.sizes.find((s) => s.size === size)?.price ?? product.basePrice,
      extras: selectedExtras,
      image: product.image,
    });
    router.back();
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} at Fire & Stone Pizza – $${unitPrice.toFixed(2)}`,
      });
    } catch {}
  };

  const hasSizes = product.sizes.length > 1;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.hero}>
          <Image source={{ uri: product.heroImage }} style={styles.heroImg} contentFit="cover" />
          <Pressable
            style={[styles.backBtn, { top: insets.top + 8 }]}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <ChevronLeft size={24} color={colors.text.inverse} />
          </Pressable>
          <View style={[styles.heroActions, { top: insets.top + 8 }]}>
            <Pressable style={styles.iconBtn} onPress={() => toggleFavorite(product.id)}>
              <Heart
                size={22}
                color={isFavorite ? colors.primary : colors.text.inverse}
                fill={isFavorite ? colors.primary : 'transparent'}
              />
            </Pressable>
            <Pressable style={styles.iconBtn} onPress={onShare}>
              <Share2 size={20} color={colors.text.inverse} />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.desc}>{product.description}</Text>
          <Text style={styles.price}>{formatCurrency(unitPrice)}</Text>

          {hasSizes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.chips}>
                {product.sizes.map((s) => (
                  <Pressable
                    key={s.size}
                    onPress={() => setSize(s.size)}
                    style={[styles.sizeChip, size === s.size && styles.sizeChipActive]}
                  >
                    <Text style={[styles.sizeText, size === s.size && styles.sizeTextActive]}>
                      {s.size}"
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {product.extras.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Add-ons</Text>
              {product.extras.map((extra) => {
                const selected = selectedExtras.some((e) => e.id === extra.id);
                return (
                  <Pressable
                    key={extra.id}
                    onPress={() => toggleExtra(extra)}
                    style={styles.extraRow}
                  >
                    <View style={[styles.checkbox, selected && styles.checkboxActive]}>
                      {selected && <Check size={14} color={colors.text.inverse} strokeWidth={3} />}
                    </View>
                    <Text style={styles.extraName}>{extra.name}</Text>
                    <Text style={styles.extraPrice}>+{formatCurrency(extra.price)}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantityStepper value={qty} onChange={setQty} />
          </View>

          {product.allergens.length > 0 && (
            <Text style={styles.allergens}>
              Allergens: {product.allergens.join(', ')}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          title={`Add to Cart · ${formatCurrency(unitPrice * qty)}`}
          onPress={handleAdd}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  hero: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActions: {
    position: 'absolute',
    right: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: SCREEN_PADDING,
  },
  name: {
    ...typography.heading,
    color: colors.text.primary,
  },
  desc: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  price: {
    ...typography.price,
    color: colors.primary,
    fontSize: 24,
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sizeChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  sizeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text.primary,
  },
  sizeTextActive: {
    color: colors.text.inverse,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  extraName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  extraPrice: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  allergens: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.xl,
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
