import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Heart, Plus } from 'lucide-react-native';
import { Product } from '@/types';
import { colors } from '@/theme/colors';
import { spacing, radius } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useFavoritesStore } from '@/stores';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAdd?: () => void;
  compact?: boolean;
}

function ProductCardComponent({ product, onPress, onAdd, compact = false }: ProductCardProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, compact && styles.compact, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, $${product.basePrice.toFixed(2)}`}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
        <Pressable
          onPress={() => toggleFavorite(product.id)}
          style={styles.favBtn}
          hitSlop={8}
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            color={isFavorite ? colors.primary : colors.text.inverse}
            fill={isFavorite ? colors.primary : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.ingredients} numberOfLines={2}>
          {product.ingredients.slice(0, 3).join(', ')}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${product.basePrice.toFixed(2)}</Text>
          {onAdd && (
            <Pressable
              onPress={onAdd}
              style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.8 }]}
              accessibilityLabel={`Add ${product.name} to cart`}
            >
              <Plus size={18} color={colors.text.inverse} strokeWidth={2.5} />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
  },
  compact: {
    maxWidth: 180,
  },
  pressed: {
    opacity: 0.92,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    ...typography.title,
    color: colors.text.primary,
  },
  ingredients: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  price: {
    ...typography.price,
    color: colors.primary,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
