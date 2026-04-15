import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const COLORS = {
  surface: '#FCF8F3',
  white: '#FFFFFF',
  text: '#4B3A3A',
  muted: '#7B6A68',
  placeholder: '#A99A99',
  border: '#E9DCDC',
  required: '#C4545C',
  action: '#C09797',
  handle: '#E7DDD1',
  buttonBg: '#EFE5DB',
  disabledText: '#3C2F2F',
};

function FieldLabel({ text, required = false }) {
  return (
    <Text style={styles.label}>
      {text}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>
  );
}

export default function AddAddressScreen({ visible, onClose, onSave }) {
  const [label, setLabel] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('Zacualtipán de Ángeles');
  const [references, setReferences] = useState('');

  const isFormValid = useMemo(() => {
    return label.trim() && street.trim() && neighborhood.trim();
  }, [label, street, neighborhood]);

  const handleSave = () => {
    if (!isFormValid) {
      return;
    }

    if (typeof onSave === 'function') {
      onSave({
        label: label.trim(),
        street: street.trim(),
        neighborhood: neighborhood.trim(),
        city: city.trim(),
        references: references.trim(),
      });
    }

    setLabel('');
    setStreet('');
    setNeighborhood('');
    setCity('Zacualtipán de Ángeles');
    setReferences('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
        >
          <SafeAreaView style={styles.sheet} edges={['bottom']}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} activeOpacity={0.85} onPress={onClose}>
                <Feather name="arrow-left" size={26} color={COLORS.text} />
              </TouchableOpacity>

              <Text style={styles.title}>Nueva dirección</Text>
            </View>

            <ScrollView
              style={styles.formScroll}
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.fieldGroup}>
                <FieldLabel text="Etiqueta" required />
                <TextInput
                  value={label}
                  onChangeText={setLabel}
                  placeholder="Ej: Casa, Trabajo, etc."
                  placeholderTextColor={COLORS.placeholder}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <FieldLabel text="Calle y número" required />
                <TextInput
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Ej: Av. Juárez #123"
                  placeholderTextColor={COLORS.placeholder}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <FieldLabel text="Colonia" required />
                <TextInput
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                  placeholder="Ej: Centro"
                  placeholderTextColor={COLORS.placeholder}
                  style={styles.input}
                />
              </View>

              <View style={styles.fieldGroup}>
                <FieldLabel text="Ciudad" />
                <TextInput
                  value={city}
                  editable={false}
                  selectTextOnFocus={false}
                  style={[styles.input, styles.disabledInput]}
                />
              </View>

              <View style={styles.fieldGroup}>
                <FieldLabel text="Referencias (opcional)" />
                <TextInput
                  value={references}
                  onChangeText={setReferences}
                  placeholder="Ej: Casa color azul, portón negro, junto a la farmacia..."
                  placeholderTextColor={COLORS.placeholder}
                  style={[styles.input, styles.textArea]}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
                activeOpacity={0.9}
                onPress={handleSave}
                disabled={!isFormValid}
              >
                <Text style={styles.saveButtonText}>Guardar dirección</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 12,
    maxHeight: '92%',
  },
  handle: {
    width: 70,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.handle,
    alignSelf: 'center',
    marginBottom: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  formScroll: {
    flexGrow: 0,
  },
  formContent: {
    paddingBottom: 28,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.muted,
    marginBottom: 12,
  },
  required: {
    color: COLORS.required,
  },
  input: {
    minHeight: 62,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  disabledInput: {
    backgroundColor: '#FFFDFC',
    color: COLORS.disabledText,
    fontWeight: '600',
  },
  textArea: {
    minHeight: 122,
    paddingTop: 16,
    paddingBottom: 16,
  },
  saveButton: {
    minHeight: 80,
    borderRadius: 20,
    backgroundColor: COLORS.action,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    opacity: 0.55,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
});