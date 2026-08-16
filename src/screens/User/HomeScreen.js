import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import AddressSelectionScreen, { defaultAddress } from './AddressSelectionScreen';

const COLORS = {
  primary: '#800020',
  background: '#F8F8F8',
  surface: '#FFFFFF',
  search: '#F2F2F2',
  border: '#EBDDDF',
  text: '#2E2323',
  muted: '#7A6D6D',
  lightMuted: '#9B9090',
  ratingBg: '#FFF8E7',
  star: '#F5B301',
};

const categories = [
  { id: 'all', label: 'Todo', emoji: '🍽️' },
  { id: 'tacos', label: 'Tacos', emoji: '🌮' },
  { id: 'antojitos', label: 'Antojitos', emoji: '🌯' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
];

const restaurants = [
  {
    id: '1',
    name: 'Taqueria El Sabor',
    categories: ['Tacos', 'Antojitos'],
    deliveryTime: '20-30 min',
    deliveryFee: '$15',
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80',
    menu: [
      {
        id: '1',
        name: 'Tacos de Pastor',
        description: 'Tres tacos con carne al pastor, pina, cilantro y cebolla.',
        price: '$45',
        image:
          'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: '2',
        name: 'Tacos de Arrachera',
        description: 'Tres tacos de arrachera asada con guacamole.',
        price: '$55',
        image:
          'https://images.unsplash.com/photo-1601924638867-3ec6c2d5f7b5?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: '3',
        name: 'Quesadillas',
        description: 'Quesadilla grande con queso Oaxaca y champinones.',
        price: '$60',
        image:
          'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    id: '2',
    name: 'Mariscos del Puerto',
    categories: ['Tacos', 'Bebidas'],
    deliveryTime: '25-35 min',
    deliveryFee: '$20',
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1565299585323-38174c4a6f68?auto=format&fit=crop&w=1200&q=80',
    menu: [],
  },
  {
    id: '3',
    name: 'Dulce Antojo',
    categories: ['Postres', 'Bebidas'],
    deliveryTime: '15-25 min',
    deliveryFee: '$12',
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80',
      menu: [],
  },
];

    function CategoryChip({ item, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.categoryChip, isActive && styles.categoryChipActive]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
      <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

function RestaurantCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress(item)}>
      <View>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={16} color={COLORS.star} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCategoryText}>{item.categories.join(' y ')}</Text>

        <View style={styles.cardMetaRow}>
          <View style={styles.timeGroup}>
            <Feather name="clock" size={18} color={COLORS.muted} />
            <Text style={styles.cardMetaText}>{item.deliveryTime}</Text>
          </View>
          <Text style={styles.cardMetaText}>Envio {item.deliveryFee}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ onSelectRestaurant }) {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  const filteredRestaurants = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesCategory =
        activeCategory === 'all' ||
        restaurant.categories.some(
          (category) => category.toLowerCase() === activeCategory.toLowerCase()
        );

      const matchesSearch =
        !normalizedSearch ||
        restaurant.name.toLowerCase().includes(normalizedSearch) ||
        restaurant.categories.join(' ').toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchText]);

  const addressSummary = useMemo(() => {
    return [selectedAddress.street, selectedAddress.neighborhood].filter(Boolean).join(', ');
  }, [selectedAddress.neighborhood, selectedAddress.street]);

  const handleOpenAddressModal = () => {
    setIsAddressModalVisible(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantCard item={item} onPress={onSelectRestaurant || (() => {})} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <TouchableOpacity
                style={styles.header}
                activeOpacity={0.9}
                onPress={handleOpenAddressModal}
              >
                <View style={styles.locationIconWrap}>
                  <Ionicons name="location-sharp" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.headerTextWrap}>
                  <Text style={styles.headerEyebrow}>Entregar en</Text>
                  <Text style={styles.headerTitle}>{selectedAddress.label}</Text>
                  <Text style={styles.headerAddress}>{addressSummary}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.searchBar}>
                <Feather name="search" size={22} color={COLORS.lightMuted} />
                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Buscar restaurantes, platillos..."
                  placeholderTextColor={COLORS.lightMuted}
                  style={styles.searchInput}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
              >
                {categories.map((category) => (
                  <CategoryChip
                    key={category.id}
                    item={category}
                    isActive={activeCategory === category.id}
                    onPress={() => setActiveCategory(category.id)}
                  />
                ))}
              </ScrollView>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Restaurantes cerca de ti</Text>
                <Text style={styles.sectionMeta}>{filteredRestaurants.length} lugares</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No encontramos resultados</Text>
              <Text style={styles.emptyText}>Prueba con otra categoria o busqueda.</Text>
            </View>
          }
        />

        <AddressSelectionScreen
          visible={isAddressModalVisible}
          onClose={handleCloseAddressModal}
          onContinue={handleCloseAddressModal}
          selectedAddress={selectedAddress}
          onAddressChange={setSelectedAddress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  locationIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F9EBEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerEyebrow: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  headerAddress: {
    fontSize: 15,
    color: COLORS.muted,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.search,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 17,
    color: COLORS.text,
  },
  categoriesContent: {
    paddingBottom: 14,
    paddingRight: 8,
  },
  categoryChip: {
    width: 104,
    minHeight: 112,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowOpacity: 0.12,
  },
  categoryEmoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  categoryLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: COLORS.surface,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionMeta: {
    fontSize: 15,
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardInfo: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardCategoryText: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 18,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMetaText: {
    fontSize: 16,
    color: COLORS.muted,
    marginLeft: 8,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
  },
});