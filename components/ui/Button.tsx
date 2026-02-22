import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle
}: ButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const getButtonStyle = () => {
        switch (variant) {
            case 'secondary':
                return [styles.button, { backgroundColor: theme.secondary }, style];
            case 'outline':
                return [styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.tint }, style];
            default:
                return [styles.button, { backgroundColor: theme.tint }, style];
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'secondary':
                return [styles.text, { color: theme.tint }, textStyle];
            case 'outline':
                return [styles.text, { color: theme.tint }, textStyle];
            default:
                return [styles.text, { color: '#FFFFFF' }, textStyle];
        }
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : theme.tint} />
            ) : (
                <Text style={getTextStyle()}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    },
});
