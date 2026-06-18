import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppColors } from '../utils/theme';

const PLACEHOLDER_HEIGHT = 50;

type Props = {
  colors: AppColors;
};

/** Expo Go 用のレイアウトプレースホルダー（EAS Build では本物の広告が表示される） */
export function AdBannerPlaceholder({ colors }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: PLACEHOLDER_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
