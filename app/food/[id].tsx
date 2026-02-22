import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FOODS } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FoodDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const food = FOODS.find(f => f.id === id);

    if (!food) return null;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: food.image }} style={styles.image} />
                    <TouchableOpacity
                        style={[styles.backButton, { backgroundColor: theme.background }]}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.name, { color: theme.text }]}>{food.name}</Text>
                        <View style={styles.ratingContainer}>
                            <IconSymbol name="star.fill" size={16} color="#FFD700" />
                            <Text style={[styles.rating, { color: theme.text }]}>{food.rating}</Text>
                        </View>
                    </View>

                    <Text style={[styles.category, { color: theme.tint }]}>{food.category}</Text>

                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
                    <Text style={[styles.description, { color: theme.icon }]}>{food.description}</Text>

                    <View style={styles.footer}>
                        <View>
                            <Text style={[styles.priceLabel, { color: theme.icon }]}>Price</Text>
                            <Text style={[styles.price, { color: theme.accent }]}>${food.price.toFixed(2)}</Text>
                        </View>
                        <Button
                            title="Add to Cart"
                            onPress={() => {
                                addToCart(food);
                                router.back();
                            }}
                            style={styles.addButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 350,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    content: {
        padding: 24,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        backgroundColor: '#FFFFFF', // Overwritten by theme if needed
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    rating: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 6,
    },
    category: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    priceLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        paddingHorizontal: 40,
    },
});
