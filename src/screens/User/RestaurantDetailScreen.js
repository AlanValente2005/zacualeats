import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#800020',
  background: '#F8F8F8',
  surface: '#FFFFFF',
  text: '#2E2323',
  muted: '#7A6D6D',
  lightMuted: '#9B9090',
  border: '#EBDDDF',
  star: '#F5B301',
};

const defaultRestaurant = {
  name: 'Taqueria El Sabor',
  categories: 'Tacos y antojitos',
  rating: '4.8',
  deliveryTime: '20-30 min',
  deliveryFee: 'Envio $15',
  coverImage:
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1400&q=80',
};

const defaultMenuItems = [
  {
    id: '1',
    name: 'Tacos de Pastor',
    description: 'Carne al pastor, cebolla, cilantro y salsa de la casa.',
    price: '$45',
    image:
      'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '2',
    name: 'Gringa Especial',
    description: 'Tortilla de harina con queso fundido y pastor.',
    price: '$68',
    image:
      'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    name: 'Volcanes',
    description: 'Base crujiente con carne, queso y aguacate fresco.',
    price: '$55',
    image:
      'https://images.unsplash.com/photo-1604467707321-70d5ac45adda?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '4',
    name: 'Agua de Horchata',
    description: 'Bebida tradicional fria con canela y toque de vainilla.',
    price: '$28',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80',
  },
];

function MenuItemCard({ item }) {
  return (
    <TouchableOpacity style={styles.menuCard} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />

      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <Text style={styles.menuPrice}>{item.price}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
        <Feather name="plus" size={20} color={COLORS.surface} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function SeparatorDot() {
  return <View style={styles.separatorDot} />;
}

export default function RestaurantDetailScreen({ navigation, onGoBack, restaurant }) {
  const resolvedRestaurant = restaurant
    ? {
        ...restaurant,
        categories: Array.isArray(restaurant.categories)
          ? restaurant.categories.join(' y ')
          : restaurant.categories,
        deliveryFee: restaurant.deliveryFee?.startsWith('Envio')
          ? restaurant.deliveryFee
          : `Envio ${restaurant.deliveryFee}`,
      }
    : defaultRestaurant;

  const menuItems = restaurant?.menu?.length ? restaurant.menu : defaultMenuItems;

  const handleGoBack = () => {
    if (typeof onGoBack === 'function') {
      onGoBack();
      return;
    }

    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <ImageBackground
                source={{ uri: resolvedRestaurant.coverImage || resolvedRestaurant.image }}
                style={styles.heroImage}
                resizeMode="cover"
              >
                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.88}
                  onPress={handleGoBack}
                >
                  <Feather name="arrow-left" size={22} color="#111111" />
                </TouchableOpacity>
              </ImageBackground>

              <View style={styles.detailsSheet}>
                <Text style={styles.restaurantTitle}>{resolvedRestaurant.name}</Text>
                <Text style={styles.restaurantSubtitle}>{resolvedRestaurant.categories}</Text>

                <View style={styles.detailsRow}>
                  <View style={styles.ratingGroup}>
                    <Ionicons name="star" size={16} color={COLORS.star} />
                    <Text style={styles.detailsText}>{resolvedRestaurant.rating}</Text>
                  </View>

                  <SeparatorDot />
                  <Text style={styles.detailsText}>{resolvedRestaurant.deliveryTime}</Text>
                  <SeparatorDot />
                  <Text style={styles.detailsText}>{resolvedRestaurant.deliveryFee}</Text>
                </View>

                <Text style={styles.menuSectionTitle}>Menú</Text>
              </View>
            </View>
          }
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
    paddingBottom: 118,
  },
  heroImage: {
    height: 310,
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsSheet: {
    marginTop: -28,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 12,
  },
  restaurantTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  restaurantSubtitle: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 22,
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.muted,
    marginLeft: 6,
  },
  separatorDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.lightMuted,
    marginHorizontal: 12,
  },
  menuSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
    marginRight: 12,
  },
  menuInfo: {
    flex: 1,
    paddingRight: 10,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.muted,
    marginBottom: 10,
  },
  menuPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
});