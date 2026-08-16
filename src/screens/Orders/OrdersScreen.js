import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  background: '#FAF8F5',
  surface: '#FFFFFF',
  text: '#3D2D2D',
  muted: '#7E6D6D',
  divider: '#EFE3E3',
  total: '#800020',
  shadow: '#000000',
  preparingBg: '#FFF6DD',
  preparingText: '#E59A10',
  onTheWayBg: '#EAF3FF',
  onTheWayText: '#2F7CF6',
  deliveredBg: '#EAFBF2',
  deliveredText: '#19BA56',
};

const ordersMockData = [
  {
    id: '1',
    restaurantName: 'Taquería El Sabor',
    status: 'preparing',
    date: 'Hace unos momentos',
    items: ['1x Tacos de Pastor'],
    totalAmount: '$72.00',
  },
  {
    id: '2',
    restaurantName: 'Taquería El Sabor',
    status: 'on_the_way',
    date: 'Hoy 14:30',
    items: ['3x Tacos de Pastor', '1x Guacamole'],
    totalAmount: '$80.00',
  },
  {
    id: '3',
    restaurantName: 'Antojitos Doña María',
    status: 'delivered',
    date: 'Ayer 19:15',
    items: ['2x Gorditas Rellenas', '1x Agua Fresca'],
    totalAmount: '$101.00',
  },
];

const STATUS_CONFIG = {
  preparing: {
    label: 'Preparando',
    icon: 'package-variant-closed',
    backgroundColor: COLORS.preparingBg,
    color: COLORS.preparingText,
  },
  on_the_way: {
    label: 'En camino',
    icon: 'map-marker-outline',
    backgroundColor: COLORS.onTheWayBg,
    color: COLORS.onTheWayText,
  },
  delivered: {
    label: 'Entregado',
    icon: 'check-circle-outline',
    backgroundColor: COLORS.deliveredBg,
    color: COLORS.deliveredText,
  },
};

function OrderCard({ order }) {
  const status = STATUS_CONFIG[order.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderText}>
          <Text style={styles.restaurantName}>{order.restaurantName}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: status.backgroundColor }]}>
          <MaterialCommunityIcons name={status.icon} size={22} color={status.color} />
          <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {order.items.map((item) => (
          <Text key={item} style={styles.itemText}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>{order.totalAmount}</Text>
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <FlatList
        data={ordersMockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Mis Pedidos</Text>
            <Text style={styles.subtitle}>Historial de tus pedidos</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 132,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderText: {
    flex: 1,
    paddingRight: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: COLORS.muted,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
  },
  itemsList: {
    marginBottom: 18,
  },
  itemText: {
    fontSize: 15,
    lineHeight: 28,
    color: '#6B5A5A',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.muted,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.total,
  },
});