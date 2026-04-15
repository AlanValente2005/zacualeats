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
import { Feather, Ionicons } from '@expo/vector-icons';
import AddAddressScreen from './AddAddressScreen';

const COLORS = {
  primary: '#800020',
  background: '#F8F8F8',
  surface: '#FFFFFF',
  text: '#2E2323',
  muted: '#7A6D6D',
  action: '#6F4E37',
  dashed: '#D8B7BD',
};

export const defaultAddress = {
  label: 'Casa',
  street: 'Av. Juárez #45',
  neighborhood: 'Centro',
  city: 'Zacualtipán de Ángeles',
  references: 'Casa blanca con portón café, frente a la farmacia',
};

export default function AddressSelectionScreen({
  visible,
  onClose,
  onContinue,
  selectedAddress: selectedAddressProp,
  onAddressChange,
}) {
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [internalSelectedAddress, setInternalSelectedAddress] = useState(defaultAddress);

  const selectedAddress = selectedAddressProp || internalSelectedAddress;

  const addressLine = useMemo(() => {
    return [selectedAddress.neighborhood, selectedAddress.city].filter(Boolean).join(', ');
  }, [selectedAddress.city, selectedAddress.neighborhood]);

  const handleOpenAddAddress = () => {
    setIsAddAddressVisible(true);
  };

  const handleCloseAddAddress = () => {
    setIsAddAddressVisible(false);
  };

  const handleSaveAddress = (address) => {
    if (typeof onAddressChange === 'function') {
      onAddressChange(address);
    } else {
      setInternalSelectedAddress(address);
    }

    setIsAddAddressVisible(false);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      <Modal
        visible={visible && !isAddAddressVisible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={onClose} />

          <SafeAreaView style={styles.sheet} edges={['bottom']}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={onClose}>
                <Feather name="arrow-left" size={26} color={COLORS.text} />
              </TouchableOpacity>

              <Text style={styles.title}>Dirección de entrega</Text>
            </View>

            <View style={styles.addressCard}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={26} color={COLORS.surface} />
              </View>

              <View style={styles.addressInfo}>
                <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
                <Text style={styles.addressText}>{selectedAddress.street}</Text>
                <Text style={styles.addressText}>{addressLine}</Text>
                {selectedAddress.references ? (
                  <Text style={styles.referenceText}>Ref: {selectedAddress.references}</Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity style={styles.addAddressButton} activeOpacity={0.85} onPress={handleOpenAddAddress}>
              <Feather name="plus" size={28} color={COLORS.primary} />
              <Text style={styles.addAddressText}>Agregar nueva dirección</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} activeOpacity={0.9} onPress={onContinue}>
              <Text style={styles.continueText}>Continuar con esta dirección</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>

      <AddAddressScreen
        visible={isAddAddressVisible}
        onClose={handleCloseAddAddress}
        onSave={handleSaveAddress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    paddingBottom: 24,
  },
  handle: {
    width: 82,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8DFD7',
    alignSelf: 'center',
    marginBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
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
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  addressCard: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 6,
    fontWeight: '500',
  },
  referenceText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.muted,
    marginTop: 6,
    fontWeight: '500',
  },
  addAddressButton: {
    minHeight: 98,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.dashed,
    borderStyle: 'dashed',
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addAddressText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 12,
  },
  continueButton: {
    minHeight: 62,
    borderRadius: 20,
    backgroundColor: COLORS.action,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.surface,
    textAlign: 'center',
  },
});