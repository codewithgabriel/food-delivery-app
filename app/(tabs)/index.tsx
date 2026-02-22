import { FoodCard } from '@/components/FoodCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { CATEGORIES, FOODS } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { addToCart, itemCount } = useCart();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFoods = FOODS.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.greeting, { color: theme.icon }]}>Hello, {user?.name} 👋</Text>
          <Text style={[styles.title, { color: theme.text }]}>What would you like to eat today?</Text>
        </View>
        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: theme.secondary }]}
          onPress={() => router.push('/cart')}
        >
          <IconSymbol name="cart.fill" size={24} color={theme.tint} />
          {itemCount > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.error }]}>
              <Text style={styles.badgeText}>{itemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.secondary }]}>
        <IconSymbol name="magnifyingglass" size={20} color={theme.icon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search for food..."
          placeholderTextColor={theme.icon}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryItem,
              { backgroundColor: selectedCategory === 'All' ? theme.tint : theme.secondary }
            ]}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={[styles.categoryIcon]}>🍴</Text>
            <Text style={[
              styles.categoryName,
              { color: selectedCategory === 'All' ? '#FFFFFF' : theme.text }
            ]}>All</Text>
          </TouchableOpacity>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryItem,
                { backgroundColor: selectedCategory === cat.name ? theme.tint : theme.secondary }
              ]}
              onPress={() => setSelectedCategory(cat.name)}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={[
                styles.categoryName,
                { color: selectedCategory === cat.name ? '#FFFFFF' : theme.text }
              ]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Near You</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={filteredFoods}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            onPress={() => router.push(`/food/${item.id}`)}
            onAddToCart={() => addToCart(item)}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    maxWidth: '80%',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
