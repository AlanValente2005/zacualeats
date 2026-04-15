import React, { useMemo, useState } from 'react';
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
  cartBar: '#8E6F58',
  quantityBg: '#F2F2F2',
};

const defaultRestaurant = {
  name: 'Taquería El Sabor',
  categories: 'Tacos y antojitos',
  rating: '4.8',
  deliveryTime: '20-30 min',
  deliveryFee: '$15',
  image:
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1400&q=80',
  menu: [
    {
      id: '1',
      name: 'Tacos de Pastor',
      description: 'Tres tacos con carne al pastor, piña, cilantro y cebolla',
      price: '$45',
      image:
        'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '2',
      name: 'Tacos de Arrachera',
      description: 'Tres tacos de arrachera asada con guacamole',
      price: '$55',
      image:
        'https://images.unsplash.com/photo-1601924638867-3ec6c2d5f7b5?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '3',
      name: 'Quesadillas',
      description: 'Quesadilla grande con queso Oaxaca y champiñones',
      price: '$60',
      image:
        'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=500&q=80',
    },
  ],
};

function priceToNumber(price) {
  return Number(String(price).replace(/[^\d.]/g, '')) || 0;
}

function SeparatorDot() {
  return <View style={styles.separatorDot} />;
}

function MenuItemCard({ item, quantity, onAdd, onIncrement, onDecrement }) {
  const isMaxQuantity = quantity >= 3;

  return (
    <View style={styles.menuCard}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />

      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.menuDescription} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.menuPrice}>{item.price}</Text>
      </View>

      <View style={styles.menuActionWrap}>
        {quantity > 0 ? (
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.quantityButton} activeOpacity={0.85} onPress={onDecrement}>
              <Feather name="minus" size={18} color={COLORS.surface} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={[styles.quantityButton, isMaxQuantity && styles.quantityButtonDisabled]}
              activeOpacity={0.85}
              onPress={onIncrement}
              disabled={isMaxQuantity}
            >
              <Feather name="plus" size={18} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={onAdd}>
            <Feather name="plus" size={22} color={COLORS.surface} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function RestaurantMenuScreen({ navigation, onGoBack, restaurant }) {
  const [cart, setCart] = useState({});

  const resolvedRestaurant = useMemo(() => {
    if (!restaurant) {
      return defaultRestaurant;
    }

    return {
      ...defaultRestaurant,
      ...restaurant,
      categories: Array.isArray(restaurant.categories)
        ? restaurant.categories.join(' y ')
        : restaurant.categories || defaultRestaurant.categories,
      image: restaurant.image || restaurant.coverImage || defaultRestaurant.image,
      menu: restaurant.menu?.length ? restaurant.menu : defaultRestaurant.menu,
    };
  }, [restaurant]);

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(() => {
    return resolvedRestaurant.menu.reduce((sum, item) => {
      const quantity = cart[item.id] || 0;
      return sum + priceToNumber(item.price) * quantity;
    }, 0);
  }, [cart, resolvedRestaurant.menu]);

  const handleGoBack = () => {
    if (typeof onGoBack === 'function') {
      onGoBack();
      return;
    }

    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const addProduct = (productId) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      if (currentQuantity >= 3) {
        return currentCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity + 1,
      };
    });
  };

  const incrementProduct = (productId) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      if (currentQuantity >= 3) {
        return currentCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity + 1,
      };
    });
  };

  const decrementProduct = (productId) => {
    setCart((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      if (currentQuantity <= 1) {
        const nextCart = { ...currentCart };
        delete nextCart[productId];
        return nextCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity - 1,
      };
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <FlatList
          data={resolvedRestaurant.menu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard
              item={item}
              quantity={cart[item.id] || 0}
              onAdd={() => addProduct(item.id)}
              onIncrement={() => incrementProduct(item.id)}
              onDecrement={() => decrementProduct(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <ImageBackground
                source={{ uri: resolvedRestaurant.image }}
                style={styles.heroImage}
                resizeMode="cover"
              >
                <TouchableOpacity style={styles.backButton} activeOpacity={0.88} onPress={handleGoBack}>
                  <Feather name="arrow-left" size={22} color="#111111" />
                </TouchableOpacity>
              </ImageBackground>

              <View style={styles.detailsBlock}>
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
                  <Text style={styles.detailsText}>Envío {resolvedRestaurant.deliveryFee}</Text>
                </View>

                <Text style={styles.menuSectionTitle}>Menú</Text>
              </View>
            </View>
          }
        />

        {totalItems > 0 ? (
          <TouchableOpacity style={styles.cartBar} activeOpacity={0.92}>
            <View style={styles.cartBarLeft}>
              <Feather name="shopping-cart" size={22} color={COLORS.surface} />
              <Text style={styles.cartBarCount}>{totalItems}</Text>
            </View>

            <View style={styles.cartBarDivider} />

            <Text style={styles.cartBarText}>Ver carrito ${totalPrice.toFixed(2)}</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} activeOpacity={0.85}>
            <Feather name="home" size={24} color={COLORS.muted} />
            <Text style={styles.tabLabel}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} activeOpacity={0.85}>
            <View style={styles.tabIconWrap}>
              <Feather name="shopping-bag" size={24} color={COLORS.muted} />
              {totalItems > 0 ? (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{totalItems}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.tabLabel}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} activeOpacity={0.85}>
            <Feather name="user" size={24} color={COLORS.muted} />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 180,
  },
  heroImage: {
    height: 315,
    marginHorizontal: 22,
    marginTop: 8,
    borderRadius: 28,
    overflow: 'hidden',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsBlock: {
    paddingHorizontal: 34,
    paddingTop: 26,
    paddingBottom: 10,
  },
  restaurantTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  restaurantSubtitle: {
    fontSize: 17,
    color: COLORS.muted,
    marginBottom: 18,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 28,
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
    marginHorizontal: 14,
  },
  menuSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 22,
    marginBottom: 16,
    padding: 14,
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },
  menuInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    minWidth: 0,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  menuDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.muted,
    marginBottom: 12,
  },
  menuPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  menuActionWrap: {
    marginLeft: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.quantityBg,
    borderRadius: 22,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 18,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginHorizontal: 4,
  },
  quantityButtonDisabled: {
    opacity: 0.45,
  },
  cartBar: {
    position: 'absolute',
    left: 82,
    right: 82,
    bottom: 108,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cartBar,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  cartBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBarCount: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  cartBarDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginHorizontal: 16,
  },
  cartBarText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    paddingTop: 14,
    paddingBottom: 26,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 14,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrap: {
    position: 'relative',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -9,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    color: COLORS.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  tabLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.muted,
  },
});