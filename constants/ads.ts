import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/** Expo Go ではネイティブ広告モジュールが使えない */
export const isNativeAdsAvailable =
  Constants.executionEnvironment !== ExecutionEnvironment.StoreClient;

/** Google 公式テスト用 ID */
export const TEST_ADMOB_APP_ID = {
  ios: 'ca-app-pub-3940256099942544~1458002511',
  android: 'ca-app-pub-3940256099942544~3347511713',
} as const;

export const TEST_BANNER_AD_UNIT_ID = {
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
} as const;

const PLACEHOLDER_PATTERN = /x{4,}|y{4,}/i;

type AdMobExtra = {
  useTestAds?: boolean;
  admobBannerIos?: string;
  admobBannerAndroid?: string;
};

function getExtra(): AdMobExtra {
  return (Constants.expoConfig?.extra ?? {}) as AdMobExtra;
}

/** テスト広告を使うか（開発ビルドは true、本番ビルドは false） */
export function shouldUseTestAds(): boolean {
  if (__DEV__) {
    return getExtra().useTestAds !== false;
  }
  return getExtra().useTestAds === true;
}

function getProductionBannerId(): string {
  const extra = getExtra();
  const id =
    Platform.OS === 'ios' ? extra.admobBannerIos : extra.admobBannerAndroid;

  if (!id || PLACEHOLDER_PATTERN.test(id)) {
    if (__DEV__) {
      console.warn(
        '[AdMob] 本番バナー ID が未設定です。.env に EXPO_PUBLIC_ADMOB_BANNER_* を設定してください。',
      );
    }
    return Platform.OS === 'ios'
      ? TEST_BANNER_AD_UNIT_ID.ios
      : TEST_BANNER_AD_UNIT_ID.android;
  }

  return id;
}

export function getBannerAdUnitId(): string {
  if (shouldUseTestAds()) {
    return Platform.OS === 'ios'
      ? TEST_BANNER_AD_UNIT_ID.ios
      : TEST_BANNER_AD_UNIT_ID.android;
  }

  return getProductionBannerId();
}

export function getAdMobAppIds() {
  return {
    ios:
      process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID ?? TEST_ADMOB_APP_ID.ios,
    android:
      process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? TEST_ADMOB_APP_ID.android,
  };
}
