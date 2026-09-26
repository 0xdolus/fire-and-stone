import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing, radius, SCREEN_PADDING } from '@/theme/spacing';
import { useSettingsStore } from '@/stores';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Authentic Pizza Experience',
    description: 'Wood-fired, stone-baked pizzas crafted with the finest ingredients.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=1000&fit=crop',
  },
  {
    id: '2',
    title: 'Made Fresh Every Day',
    description: 'Dough prepared daily. Toppings sourced locally. No compromises.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=1000&fit=crop',
  },
  {
    id: '3',
    title: 'Delivery in 30–40 Minutes',
    description: 'Hot, fresh, and at your door faster than you can set the table.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=1000&fit=crop',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setHasOnboarded = useSettingsStore((s) => s.setHasOnboarded);
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const finish = () => {
    setHasOnboarded(true);
    router.replace('/(tabs)/menu');
  };

  const next = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finish();
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + spacing.lg }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.actions}>
          {index < SLIDES.length - 1 ? (
            <Button title="Skip" variant="ghost" onPress={finish} />
          ) : (
            <View style={{ width: 80 }} />
          )}
          <Button
            title={index === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={next}
            style={{ minWidth: 140 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charcoal,
  },
  slide: {
    width,
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SCREEN_PADDING,
    paddingBottom: 140,
  },
  title: {
    ...typography.displayLG,
    color: colors.text.inverse,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  desc: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    maxWidth: '90%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    backgroundColor: colors.accentOrange,
    width: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
