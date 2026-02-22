import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
        } catch (e: any) {
            Alert.alert('Login Failed', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: theme.secondary }]}>
                        <IconSymbol name="house.fill" size={40} color={theme.tint} />
                    </View>
                    <Text style={[styles.title, { color: theme.text }]}>Welcome Back!</Text>
                    <Text style={[styles.subtitle, { color: theme.icon }]}>Sign in to continue ordering delicious food</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="example@mail.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <Input
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={{ color: theme.tint, fontWeight: '600' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.loginButton}
                    />

                    <View style={styles.footer}>
                        <Text style={{ color: theme.icon }}>Don't have an account? </Text>
                        <Link href="/(auth)/signup" asChild>
                            <TouchableOpacity>
                                <Text style={{ color: theme.tint, fontWeight: '700' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    loginButton: {
        marginTop: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
});
