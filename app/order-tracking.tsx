import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const { width } = Dimensions.get('window');

const RESTAURANT_COORD = { latitude: 37.7749, longitude: -122.4194 };
const USER_COORD = { latitude: 37.78825, longitude: -122.4324 };

const STEPS = [
    { id: 1, title: 'Confirmed', icon: 'checkmark.circle.fill' },
    { id: 2, title: 'Preparing', icon: 'clock.fill' },
    { id: 3, title: 'Courier on the way', icon: 'bicycle' },
    { id: 4, title: 'Delivered', icon: 'house.fill' },
];

export default function OrderTrackingScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [currentStep, setCurrentStep] = useState(1);
    const [courierPos, setCourierPos] = useState(RESTAURANT_COORD);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < 4) return prev + 1;
                clearInterval(timer);
                return prev;
            });
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    // Simulate movement when courier is on the way
    useEffect(() => {
        if (currentStep < 3) return;
        if (currentStep === 4) {
            setCourierPos(USER_COORD);
            return;
        }

        let frame = 0;
        const totalFrames = 100;
        const moveTimer = setInterval(() => {
            frame++;
            const ratio = frame / totalFrames;
            const lat = RESTAURANT_COORD.latitude + (USER_COORD.latitude - RESTAURANT_COORD.latitude) * ratio;
            const lng = RESTAURANT_COORD.longitude + (USER_COORD.longitude - RESTAURANT_COORD.longitude) * ratio;
            setCourierPos({ latitude: lat, longitude: lng });

            if (frame >= totalFrames) clearInterval(moveTimer);
        }, 100);

        return () => clearInterval(moveTimer);
    }, [currentStep]);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Stack.Screen options={{ presentation: 'fullScreenModal', headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>Order Status</Text>
            </View>

            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: (RESTAURANT_COORD.latitude + USER_COORD.latitude) / 2,
                        longitude: (RESTAURANT_COORD.longitude + USER_COORD.longitude) / 2,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03,
                    }}
                >
                    <Polyline
                        coordinates={[RESTAURANT_COORD, USER_COORD]}
                        strokeColor={theme.tint}
                        strokeWidth={4}
                        lineDashPattern={[1]}
                    />
                    <Marker coordinate={RESTAURANT_COORD} title="Restaurant">
                        <View style={[styles.markerContainer, { backgroundColor: theme.tint }]}>
                            <IconSymbol name="house.fill" size={16} color="#FFFFFF" />
                        </View>
                    </Marker>
                    <Marker coordinate={USER_COORD} title="You">
                        <View style={[styles.markerContainer, { backgroundColor: theme.accent }]}>
                            <IconSymbol name="person.fill" size={16} color="#FFFFFF" />
                        </View>
                    </Marker>
                    <Marker coordinate={courierPos} title="Courier">
                        <View style={[styles.courierMarker, { backgroundColor: '#FFFFFF', borderColor: theme.tint }]}>
                            <IconSymbol name="bicycle" size={20} color={theme.tint} />
                        </View>
                    </Marker>
                </MapView>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.statusCard, { backgroundColor: theme.secondary }]}>
                    <View style={styles.statusHeader}>
                        <Text style={[styles.orderNumber, { color: theme.icon }]}>Order #12345</Text>
                        <Text style={[styles.arrivalText, { color: theme.tint }]}>ETA: 25 mins</Text>
                    </View>

                    <View style={styles.timeline}>
                        {STEPS.map((step, index) => {
                            const isActive = step.id <= currentStep;
                            const isLast = index === STEPS.length - 1;

                            return (
                                <View key={step.id} style={styles.stepContainer}>
                                    <View style={styles.iconColumn}>
                                        <View style={[
                                            styles.dot,
                                            { backgroundColor: isActive ? theme.tint : theme.border }
                                        ]}>
                                            {isActive && <IconSymbol name="checkmark" size={12} color="#FFFFFF" />}
                                        </View>
                                        {!isLast && (
                                            <View style={[
                                                styles.line,
                                                { backgroundColor: step.id < currentStep ? theme.tint : theme.border }
                                            ]} />
                                        )}
                                    </View>
                                    <View style={styles.textColumn}>
                                        <Text style={[
                                            styles.stepTitle,
                                            { color: isActive ? theme.text : theme.icon, fontWeight: isActive ? '700' : '400' }
                                        ]}>
                                            {step.title}
                                        </Text>
                                        {isActive && currentStep === step.id && (
                                            <Text style={[styles.activeStatus, { color: theme.tint }]}>
                                                Processing your delight...
                                            </Text>
                                        )}
                                    </View>
                                    <IconSymbol
                                        name={step.icon as any}
                                        size={24}
                                        color={isActive ? theme.tint : theme.border}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.courierInfo}>
                    <View style={[styles.avatar, { backgroundColor: theme.border }]} />
                    <View style={styles.courierText}>
                        <Text style={[styles.courierName, { color: theme.text }]}>Alex Courier</Text>
                        <Text style={[styles.courierDetails, { color: theme.icon }]}>Rating: ⭐ 4.9</Text>
                    </View>
                    <TouchableOpacity style={[styles.callButton, { backgroundColor: theme.tint }]}>
                        <IconSymbol name="phone.fill" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button title="Back to Home" onPress={() => router.replace('/(tabs)')} variant="outline" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        paddingTop: 60,
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mapContainer: { height: 300, width: '100%', overflow: 'hidden' },
    map: { ...StyleSheet.absoluteFillObject },
    markerContainer: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
    courierMarker: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 3, elevation: 5 },
    content: {
        padding: 24,
    },
    statusCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    orderNumber: {
        fontSize: 14,
        fontWeight: '600',
    },
    arrivalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeline: {
        marginLeft: 8,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    iconColumn: {
        alignItems: 'center',
        marginRight: 16,
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    line: {
        width: 2,
        height: 48,
        marginTop: -2,
        marginBottom: -2,
    },
    textColumn: {
        flex: 1,
        paddingTop: 2,
    },
    stepTitle: {
        fontSize: 16,
    },
    activeStatus: {
        fontSize: 12,
        marginTop: 4,
    },
    courierInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    courierText: {
        flex: 1,
        marginLeft: 16,
    },
    courierName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courierDetails: {
        fontSize: 14,
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        padding: 24,
        paddingBottom: 40,
    },
});
