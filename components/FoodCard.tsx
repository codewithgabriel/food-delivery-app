import { Food } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface FoodCardProps {
    food: Food;
    onPress: () => void;
    onAddToCart: () => void;
}

export function FoodCard({ food, onPress, onAddToCart }: FoodCardProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.background, shadowColor: '#000' }]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image source={{ uri: food.image }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{food.name}</Text>
                    <View style={styles.ratingContainer}>
                        <IconSymbol name="star.fill" size={14} color="#FFD700" />
                        <Text style={[styles.rating, { color: theme.text }]}>{food.rating}</Text>
                    </View>
                </View>
                <Text style={[styles.description, { color: theme.icon }]} numberOfLines={2}>
                    {food.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={[styles.price, { color: theme.accent }]}>${food.price.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: theme.tint }]}
                        onPress={onAddToCart}
                    >
                        <IconSymbol name="plus" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    rating: {
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
