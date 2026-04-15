import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const COLORS = {
  primary: '#800020',
  surface: '#FFFFFF',
  text: '#2E2323',
  muted: '#7A6D6D',
  border: '#EFE4E1',
  iconBg: '#F6ECE7',
  summaryBg: '#F9F6F4',
  overlay: 'rgba(0,0,0,0.5)',
  handle: '#E8DFD7',
};

const paymentOptions = [
  {
    id: 'card',
    title: 'Tarjeta de Crédito/Débito',
    subtitle: 'Pago seguro con tarjeta',
    icon: 'credit-card',
  },
  {
    id: 'cash',
    title: 'Efectivo',
    subtitle: 'Paga al recibir tu pedido',
    icon: 'dollar-sign',
  },
];

function PaymentOptionCard({ option, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.optionCard, isSelected && styles.optionCardSelected]}
      activeOpacity={0.88}
      onPress={onPress}
    >
      <View style={styles.iconWrap}>
        <Feather name={option.icon} size={24} color={COLORS.primary} />
      </View>

      <View style={styles.optionTextWrap}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function PaymentMethodModal({
  visible,
  onClose,
  onBack,
  totalAmount = 60,
  selectedMethod,
  onMethodChange,
}) {
  const [internalMethod, setInternalMethod] = useState('card');

  const activeMethod = selectedMethod || internalMethod;

  const formattedTotal = useMemo(() => {
    return `$${Number(totalAmount || 0).toFixed(2)}`;
  }, [totalAmount]);

  const handleSelectMethod = (methodId) => {
    if (typeof onMethodChange === 'function') {
      onMethodChange(methodId);
      return;
    }

    setInternalMethod(methodId);
  };

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <SafeAreaView style={styles.sheet} edges={['bottom']}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={handleBack}>
              <Feather name="arrow-left" size={25} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.title}>Método de pago</Text>
          </View>

          <View style={styles.optionsWrap}>
            {paymentOptions.map((option) => (
              <PaymentOptionCard
                key={option.id}
                option={option}
                isSelected={activeMethod === option.id}
                onPress={() => handleSelectMethod(option.id)}
              />
            ))}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total a pagar</Text>
            <Text style={styles.summaryValue}>{formattedTotal}</Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 26,
  },
  handle: {
    width: 82,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.handle,
    alignSelf: 'center',
    marginBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3ECE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  optionsWrap: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 16,
  },
  optionCardSelected: {
    borderColor: '#E5D4D0',
    backgroundColor: '#FFFDFC',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  optionTextWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 15,
    color: COLORS.muted,
    fontWeight: '500',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.summaryBg,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  summaryLabel: {
    fontSize: 17,
    color: COLORS.muted,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
});