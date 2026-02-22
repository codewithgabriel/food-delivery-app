/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#FF6B01'; // Vibrant Orange
const tintColorDark = '#FF8C33';

export const Colors = {
  light: {
    text: '#1A1C1E',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorLight,
    secondary: '#FFFAF6', // Very light orange background
    accent: '#22C55E',    // Green for success/prices
    border: '#E5E7EB',
    error: '#EF4444',
  },
  dark: {
    text: '#F3F4F6',
    background: '#111827',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorDark,
    secondary: '#1F2937',
    accent: '#4ADE80',
    border: '#374151',
    error: '#F87171',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
