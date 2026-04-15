import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const COLORS = {
  overlay: 'rgba(0,0,0,0.5)',
  surface: '#FFFFFF',
  action: '#6F4E37',
  text: '#1F1A19',
  muted: '#7B7370',
  summaryBg: '#F9F6F4',
  primary: '#800020',
};

export default function OrderSuccessModal({
  visible,
  paymentMethod = 'Efectivo',
  totalPaid = 0,
  onComplete,
  onClose,
}) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    setAnimationKey((currentKey) => currentKey + 1);

    const timer = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
        return;
      }

      if (typeof onClose === 'function') {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, onComplete, visible]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.centerWrap}>
          <Animatable.View
            key={`order-success-card-${animationKey}`}
            animation={visible ? 'fadeInUp' : undefined}
            duration={700}
            easing="ease-out"
            useNativeDriver
            style={styles.card}
          >
            <Animatable.View
              key={`order-success-circle-${animationKey}`}
              animation={visible ? 'zoomIn' : undefined}
              delay={260}
              duration={620}
              easing="ease-out"
              useNativeDriver
              style={styles.successCircle}
            >
              <Animatable.View
                key={`order-success-check-${animationKey}`}
                animation={visible ? 'fadeInDown' : undefined}
                delay={760}
                duration={1100}
                easing="ease-out-back"
                useNativeDriver
              >
                <MaterialIcons name="check" size={52} color="#FFFFFF" />
              </Animatable.View>
            </Animatable.View>

            <Text style={styles.title}>¡Pedido confirmado!</Text>
            <Text style={styles.subtitle}>Tu pedido ha sido registrado exitosamente</Text>

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Método de pago</Text>
                <Text style={styles.summaryMethod}>{paymentMethod}</Text>
              </View>

              <View style={styles.summaryRowLast}>
                <Text style={styles.summaryLabel}>Total pagado</Text>
                <Text style={styles.summaryValue}>${Number(totalPaid || 0).toFixed(2)}</Text>
              </View>
            </View>
          </Animatable.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 28,
    alignItems: 'center',
  },
  successCircle: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: COLORS.action,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: COLORS.summaryBg,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  summaryMethod: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
});