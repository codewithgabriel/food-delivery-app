import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    error?: string;
    style?: ViewStyle;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function Input({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    error,
    style,
    keyboardType = 'default',
    autoCapitalize = 'none'
}: InputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={[styles.label, { color: theme.text }]}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.secondary,
                        color: theme.text,
                        borderColor: error ? theme.error : theme.border,
                        borderWidth: 1
                    }
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.icon}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});
