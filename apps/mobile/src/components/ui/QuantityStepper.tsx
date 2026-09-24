import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { spacing, radius } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        accessibilityLabel="Decrease quantity"
        hitSlop={8}
      >
        <Minus size={16} color={colors.text.primary} strokeWidth={2.5} />
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        accessibilityLabel="Increase quantity"
        hitSlop={8}
      >
        <Plus size={16} color={colors.text.primary} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  value: {
    ...typography.title,
    minWidth: 28,
    textAlign: 'center',
    color: colors.text.primary,
  },
});
