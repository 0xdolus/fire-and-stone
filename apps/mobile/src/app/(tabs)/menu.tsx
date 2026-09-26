import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories, promotions } from '@/data/products';
import { useCartStore } from '@/stores';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { Product } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SCREEN_PADDING * 2 - spacing.md) / 2;

export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const addItem = useCartStore((s) => s.addItem);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = products;
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, selectedCategory]);

  const popular = useMemo(() => products.filter((p) => p.isPopular), []);

  const handleAdd = useCallback(
    (product: Product) => {
      const defaultSize = product.sizes.find((s) => s.size === '12') || product.sizes[0];
      addItem({
        productId: product.id,
        name: product.name,
        size: defaultSize.size,
        quantity: 1,
        unitPrice: defaultSize.price,
        extras: [],
        image: product.image,
      });
    },
    [addItem]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome</Text>
          <Text style={styles.brand}>Fire & Stone Pizza</Text>
        </View>

        {/* Search */}
        <View style={styles.section}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        {/* Promo carousel */}
        {!query && !selectedCategory && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoRow}
            decelerationRate="fast"
            snapToInterval={width * 0.75 + spacing.md}
          >
            {promotions.map((promo) => (
              <View key={promo.id} style={[styles.promoCard, { backgroundColor: promo.color }]}>
                <Image source={{ uri: promo.image }} style={styles.promoImg} contentFit="cover" />
                <View style={styles.promoOverlay} />
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <Text style={styles.promoSub}>{promo.subtitle}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <CategoryChip
            label="All"
            selected={!selectedCategory}
            onPress={() => setSelectedCategory(null)}
          />
          {categories.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            />
          ))}
        </ScrollView>

        {/* Popular */}
        {!query && !selectedCategory && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popular.map((p) => (
                <View key={p.id} style={{ width: 160, marginRight: spacing.md }}>
                  <ProductCard
                    product={p}
                    compact
                    onPress={() => router.push(`/product/${p.id}`)}
                    onAdd={() => handleAdd(p)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All / filtered grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory || (query ? 'Results' : 'Menu')}
          </Text>
          {filtered.length === 0 ? (
            <Text style={styles.empty}>No items found. Try a different search.</Text>
          ) : (
            <View style={styles.grid}>
              {filtered.map((p) => (
                <View key={p.id} style={{ width: CARD_WIDTH, marginBottom: spacing.md }}>
                  <ProductCard
                    product={p}
                    onPress={() => router.push(`/product/${p.id}`)}
                    onAdd={() => handleAdd(p)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  brand: {
    ...typography.heading,
    color: colors.text.primary,
  },
  section: {
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: spacing.lg,
  },
  promoRow: {
    paddingHorizontal: SCREEN_PADDING,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  promoCard: {
    width: width * 0.75,
    height: 140,
    borderRadius: radius.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  promoImg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  promoTitle: {
    ...typography.title,
    color: colors.text.inverse,
  },
  promoSub: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
  },
  chips: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  empty: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: spacing.xxl,
  },
});
