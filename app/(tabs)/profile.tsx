import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const { user, signOut, changePassword } = useAuth();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await changePassword(oldPassword, newPassword);
            Alert.alert('Success', 'Password changed successfully');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordForm(false);
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <View style={[styles.avatarContainer, { backgroundColor: theme.secondary }]}>
                    <Text style={[styles.avatarText, { color: theme.tint }]}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text style={[styles.userName, { color: theme.text }]}>{user?.name}</Text>
                <Text style={[styles.userEmail, { color: theme.icon }]}>{user?.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>

                <TouchableOpacity
                    style={[styles.menuItem, { borderBottomColor: theme.border }]}
                    onPress={() => setShowPasswordForm(!showPasswordForm)}
                >
                    <IconSymbol name="lock.fill" size={24} color={theme.icon} />
                    <Text style={[styles.menuItemText, { color: theme.text }]}>Change Password</Text>
                    <IconSymbol name="chevron.right" size={20} color={theme.icon} />
                </TouchableOpacity>

                {showPasswordForm && (
                    <View style={styles.passwordForm}>
                        <Input
                            label="Old Password"
                            placeholder="••••••••"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry
                        />
                        <Input
                            label="New Password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <Input
                            label="Confirm New Password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        <Button
                            title="Update Password"
                            onPress={handleChangePassword}
                            loading={loading}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.menuItem, { borderBottomColor: theme.border }]}
                    onPress={signOut}
                >
                    <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={theme.error} />
                    <Text style={[styles.menuItemText, { color: theme.error }]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    menuItemText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
    passwordForm: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
});
