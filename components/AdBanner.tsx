import { useEffect } from 'react';
import { isNativeAdsAvailable } from '../constants/ads';
import type { AppColors } from '../utils/theme';
import { AdBannerPlaceholder } from './AdBannerPlaceholder';

type Props = {
  colors: AppColors;
};

export function AdBanner({ colors }: Props) {
  useEffect(() => {
    if (!isNativeAdsAvailable) return;

    const { default: mobileAds } =
      require('react-native-google-mobile-ads') as typeof import('react-native-google-mobile-ads');

    mobileAds()
      .initialize()
      .catch((error: unknown) => {
        console.error('Failed to initialize Google Mobile Ads:', error);
      });
  }, []);

  if (!isNativeAdsAvailable) {
    return <AdBannerPlaceholder colors={colors} />;
  }

  const { AdBannerNative } = require('./AdBannerNative') as typeof import('./AdBannerNative');
  return <AdBannerNative colors={colors} />;
}
