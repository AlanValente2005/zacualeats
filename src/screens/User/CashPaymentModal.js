import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#800020',
  surface: '#FFFFFF',
  secondaryBg: '#F5F5F5',
  border: '#F0E3E0',
  activeBg: '#FBF5F4',
  muted: '#6B605D',
  text: '#312625',
  inputBorder: '#F0E3E0',
  summaryBg: '#F9F6F4',
  overlay: 'rgba(0,0,0,0.5)',
  handle: '#E8DFD7',
  action: '#6F4E37',
  divider: '#E8D8D2',
  buttonBg: '#F3ECE7',
};

function sanitizeAmount(value) {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');

  if (parts.length <= 2) {
    return cleaned;
  }

  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export default function CashPaymentModal({
  visible,
  onClose,
  onBack,
  onConfirm,
  totalAmount = 60,
}) {
  const subtotal = Number(totalAmount || 0);
  const [selectedOption, setSelectedOption] = useState('none');
  const [customTip, setCustomTip] = useState('0.00');

  const tipOptions = useMemo(
    () => [
      { id: 'none', title: 'Sin propina', amount: 0 },
      { id: '10', title: '10%', amount: subtotal * 0.1 },
      { id: '15', title: '15%', amount: subtotal * 0.15 },
      { id: '20', title: '20%', amount: subtotal * 0.2 },
    ],
    [subtotal]
  );

  const customTipAmount = useMemo(() => {
    const numericValue = Number.parseFloat(customTip);
    return Number.isNaN(numericValue) ? 0 : numericValue;
  }, [customTip]);

  const selectedTipAmount = useMemo(() => {
    if (selectedOption === 'custom') {
      return customTipAmount;
    }

    return tipOptions.find((option) => option.id === selectedOption)?.amount || 0;
  }, [customTipAmount, selectedOption, tipOptions]);

  const total = useMemo(() => subtotal + selectedTipAmount, [selectedTipAmount, subtotal]);

  const handleSelectOption = (option) => {
    setSelectedOption(option.id);

    if (option.id === 'none') {
      setCustomTip('0.00');
      return;
    }

    setCustomTip(option.amount.toFixed(2));
  };

  const handleChangeTip = (value) => {
    setSelectedOption('custom');
    setCustomTip(sanitizeAmount(value));
  };

  const handleConfirm = () => {
    Vibration.vibrate(30);

    if (typeof onConfirm === 'function') {
      onConfirm({
        method: 'Efectivo',
        tipAmount: selectedTipAmount,
        total,
      });
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

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButtonCircle} activeOpacity={0.85} onPress={onBack}>
                <MaterialIcons name="arrow-back" size={24} color="#000000" />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Agregar propina</Text>
            </View>

            <View style={styles.questionSection}>
              <Text style={styles.questionSubtitle}>¿Deseas agregar propina para el repartidor?</Text>
            </View>

            <View style={styles.tipGrid}>
              {tipOptions.map((option) => {
                const isSelected = selectedOption === option.id;
                const isNone = option.id === 'none';

                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.tipCard, isSelected && styles.tipCardSelected]}
                    activeOpacity={0.88}
                    onPress={() => handleSelectOption(option)}
                  >
                    {isNone ? (
                      <Text style={styles.tipCardPrimary}>{option.title}</Text>
                    ) : (
                      <>
                        <Text style={styles.tipCardPrimary}>{option.title}</Text>
                        <Text style={styles.tipCardSecondary}>${option.amount.toFixed(2)}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.customSection}>
              <Text style={styles.customLabel}>O ingresa una cantidad personalizada</Text>
            </View>

            <View style={styles.customInputWrap}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                value={customTip}
                onChangeText={handleChangeTip}
                keyboardType="decimal-pad"
                style={styles.customInput}
                placeholder="0.00"
                placeholderTextColor="#B2A5A5"
              />
            </View>

            <View style={styles.summarySection}>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryMutedLabel}>Subtotal</Text>
                <Text style={styles.summaryMutedValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryLine}>
                <Text style={styles.summaryMutedLabel}>Propina</Text>
                <Text style={styles.summaryMutedValue}>${selectedTipAmount.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.confirmSection}>
              <TouchableOpacity style={styles.confirmButton} activeOpacity={0.9} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    maxHeight: '92%',
  },
  handle: {
    width: 82,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.handle,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  questionSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  questionSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.muted,
  },
  tipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 25,
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '47.5%',
    minHeight: 130,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tipCardSelected: {
    backgroundColor: COLORS.activeBg,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  tipCardPrimary: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  tipCardSecondary: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.muted,
  },
  customSection: {
    marginTop: 2,
    paddingHorizontal: 20,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.muted,
  },
  customInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 86,
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  customInput: {
    flex: 1,
    fontSize: 22,
    color: '#A8A0A0',
    marginLeft: 12,
    paddingVertical: 0,
  },
  summarySection: {
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: COLORS.summaryBg,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryMutedLabel: {
    fontSize: 16,
    color: COLORS.muted,
  },
  summaryMutedValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: 6,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  confirmSection: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  confirmButton: {
    height: 86,
    borderRadius: 24,
    backgroundColor: COLORS.action,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
});