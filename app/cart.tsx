import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
    const router = useRouter();
    const { items, total, updateQuantity, clearCart } = useCart();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const handleCheckout = () => {
        if (items.length === 0) {
            Alert.alert('Empty Cart', 'Please add some items to your cart first');
            return;
        }
        // Simulation: Create an order and clear cart
        router.push('/order-tracking');
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={[styles.cartItem, { borderBottomColor: theme.border }]}>
            <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.itemPrice, { color: theme.accent }]}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={[styles.qtyButton, { backgroundColor: theme.secondary }]}
                    onPress={() => updateQuantity(item.id, -1)}
                >
                    <IconSymbol name="minus" size={16} color={theme.tint} />
                </TouchableOpacity>
                <Text style={[styles.quantity, { color: theme.text }]}>{item.quantity}</Text>
                <TouchableOpacity
                    style={[styles.qtyButton, { backgroundColor: theme.secondary }]}
                    onPress={() => updateQuantity(item.id, 1)}
                >
                    <IconSymbol name="plus" size={16} color={theme.tint} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <IconSymbol name="xmark" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>Shopping Cart</Text>
                <TouchableOpacity onPress={clearCart}>
                    <Text style={{ color: theme.error, fontWeight: '600' }}>Clear</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <IconSymbol name="cart" size={64} color={theme.icon} />
                        <Text style={[styles.emptyText, { color: theme.icon }]}>Your cart is empty</Text>
                        <Button title="Go Back" onPress={() => router.back()} variant="outline" style={{ marginTop: 24 }} />
                    </View>
                }
            />

            {items.length > 0 && (
                <View style={[styles.footer, { borderTopColor: theme.border, backgroundColor: theme.background }]}>
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalLabel, { color: theme.icon }]}>Total</Text>
                        <Text style={[styles.totalAmount, { color: theme.text }]}>${total.toFixed(2)}</Text>
                    </View>
                    <Button title="Checkout" onPress={handleCheckout} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingTop: 60,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 24,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '700',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        marginTop: 16,
    },
    footer: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    totalLabel: {
        fontSize: 18,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
