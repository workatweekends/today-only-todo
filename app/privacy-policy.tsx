import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useAppSettings } from '../contexts/AppSettingsContext';
import {
  APP_NAME,
  CONTACT_EMAIL,
  OPERATOR_NAME,
  PRIVACY_POLICY_LAST_UPDATED,
} from '../constants/legal';

const SECTIONS = [
  {
    title: '1. はじめに',
    body: `${OPERATOR_NAME}（以下「当方」）は、${APP_NAME}（以下「本アプリ」）におけるユーザーの情報の取り扱いについて、本プライバシーポリシーに定めます。`,
  },
  {
    title: '2. 収集する情報',
    body: `本アプリはアカウント登録を必要としません。以下の情報をお使いの端末内に保存します。\n\n・ToDoタスクの内容（テキスト、完了状態、作成日時）\n・アプリ設定（リセット時刻、テーマ設定）\n・最後にアプリを開いた日付\n\nこれらはすべて端末内（AsyncStorage）にのみ保存され、当方のサーバーには送信されません。`,
  },
  {
    title: '3. 情報の利用目的',
    body: '収集した情報は、以下の目的でのみ利用します。\n\n・ToDo機能の提供\n・設定の保存と反映\n・日付が変わった際のタスク自動リセット',
  },
  {
    title: '4. 広告について',
    body: '本アプリでは Google AdMob を利用してバナー広告を表示しています。AdMob は広告の配信・効果測定のために、広告識別子（IDFA 等）や端末情報、利用状況などを収集する場合があります。\n\n詳細は Google のプライバシーポリシーをご確認ください。\nhttps://policies.google.com/privacy',
  },
  {
    title: '5. 第三者への提供',
    body: '当方は、法令に基づく場合を除き、ユーザーの情報を第三者に提供しません。ただし、広告配信サービス（Google AdMob）が独自のポリシーに基づき情報を収集する場合があります。',
  },
  {
    title: '6. データの保存と削除',
    body: '・タスクデータは端末内にのみ保存されます\n・設定したリセット時刻を過ぎると、タスクは自動的に削除されます\n・アプリを削除すると、端末内のすべてのデータが削除されます',
  },
  {
    title: '7. お子様のプライバシー',
    body: '本アプリは13歳未満のお子様を対象としていません。',
  },
  {
    title: '8. ポリシーの変更',
    body: '本ポリシーは必要に応じて変更することがあります。重要な変更がある場合は、アプリ内または公開ページでお知らせします。',
  },
  {
    title: '9. お問い合わせ',
    body: `本ポリシーに関するお問い合わせは、以下までご連絡ください。\n\n${CONTACT_EMAIL}`,
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppSettings();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={[styles.back, { color: colors.accent }]}>戻る</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>プライバシーポリシー</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.updated, { color: colors.textMuted }]}>
          最終更新日: {PRIVACY_POLICY_LAST_UPDATED}
        </Text>

        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>
              {section.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 8,
  },
  back: {
    fontSize: 16,
    fontWeight: '600',
    width: 48,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 48,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  updated: {
    fontSize: 13,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
  },
});
