const admobIosAppId =
  process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID ?? 'ca-app-pub-3940256099942544~1458002511';
const admobAndroidAppId =
  process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? 'ca-app-pub-3940256099942544~3347511713';

const config = {
  name: '今日だけToDo',
  slug: 'today-only-todo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  scheme: 'today-only-todo',
  primaryColor: '#3B82F6',
  description:
    '翌日リセットされる、今日だけのToDoアプリ。持ち越しなし、プレッシャーなし。',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#3B82F6',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.todayonlytodo.app',
    buildNumber: '1',
    infoPlist: {
      CFBundleDisplayName: '今日だけToDo',
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: 'com.todayonlytodo.app',
    versionCode: 1,
    softwareKeyboardLayoutMode: 'resize',
    adaptiveIcon: {
      backgroundColor: '#3B82F6',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    'expo-dev-client',
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: admobAndroidAppId,
        iosAppId: admobIosAppId,
      },
    ],
  ],
  extra: {
    router: {},
    eas: {
      projectId: 'c0a6cf1b-0a20-41fd-ab2e-a97c7cafd624',
    },
    useTestAds: process.env.EXPO_PUBLIC_USE_TEST_ADS !== 'false',
    admobBannerIos: process.env.EXPO_PUBLIC_ADMOB_BANNER_IOS ?? '',
    admobBannerAndroid: process.env.EXPO_PUBLIC_ADMOB_BANNER_ANDROID ?? '',
    privacyPolicyUrl: process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL ?? '',
    contactEmail: process.env.EXPO_PUBLIC_CONTACT_EMAIL ?? 'workatweekends.m@gmail.com',
    operatorName: process.env.EXPO_PUBLIC_OPERATOR_NAME ?? '今日だけToDo 運営',
  },
  owner: 'workatweekends',
};

export default config;
