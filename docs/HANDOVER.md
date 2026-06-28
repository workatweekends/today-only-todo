# 今日だけToDo — Public Handover Summary

最終更新: 2026-06-27

> このファイルはGitHub Pagesで公開される可能性があるため、アカウントID、チームID、管理画面URL、連絡先などの運用情報は載せない。
> 詳細な引き継ぎ資料はObsidianの非公開メモ `04_プロジェクト/Codex/ToDo_HANDOVER_private.md` を参照する。

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| アプリ名 | 今日だけToDo |
| 概要 | 翌日リセットされるシンプルなToDoアプリ。タスクは端末内のみ保存 |
| 技術スタック | Expo / TypeScript / Expo Router / React Native |
| 収益化 | Google AdMob バナー広告 |
| 対応OS | iOS公開済み / Android未公開 |

---

## 2. 開発場所

ローカル開発は以下のプロジェクト本体で行う。

```bash
cd "/Users/keiichiro/Desktop/プロジェクト/ToDo"
```

`/Users/keiichiro/Desktop/ToDo/` は紛らわしい別フォルダなので、作業時は開かない。

---

## 3. 主要ディレクトリ

```text
app/          Expo Router の画面
components/   UIコンポーネント
constants/    広告ID切替などの定数
hooks/        タスク管理・日付リセット
legal/        法務文書・掲載文案
docs/         GitHub Pages公開用ドキュメント
user-site/    ユーザーサイト直下で公開する app-ads.txt
```

---

## 4. 開発コマンド

```bash
nvm use
npm install
npm run start:dev
npx expo run:ios
npm run screenshots
npm run icons:generate
```

Node.jsは `.nvmrc` のバージョンを使う。

---

## 5. 広告まわりの状態

- バナー広告は実装済み。
- Expo Goでは広告の代わりにプレースホルダーを表示する。
- ネイティブビルドでは `react-native-google-mobile-ads` を使う。
- 本番/テスト広告の切替は `constants/ads.ts` と `app.config.ts` の `extra.useTestAds` で管理する。
- production buildでは `eas.json` の環境変数で本番広告IDを注入する。

---

## 6. app-ads.txt

AdMobはユーザーサイトのドメイン直下を参照する。

```text
https://workatweekends.github.io/app-ads.txt
```

2026-06-27時点で、上記URLは `200 OK` で取得できることを確認済み。

残り作業:

- AdMob管理画面で app-ads.txt の「更新を確認」を実行する。
- App Store版でTest Mode表示が消えたか確認する。

---

## 7. 公開済みアプリの更新手順

詳細は `docs/app-store-release-playbook.md` を参照。

### 通常の更新リリース

1. 変更内容を実装する
2. `npx tsc --noEmit` を通す
3. `app.config.ts` の `version` と `ios.buildNumber` を上げる
4. 必要に応じてスクリーンショット、説明文、プライバシー申告を更新する
5. EASでproductionビルドを作る
6. App Store Connectへsubmitする
7. App Store Connectで新しいバージョンを作成し、ビルドを選んで審査へ送る

```bash
eas build --profile production --platform ios
eas submit --profile production --platform ios
```

設定変更後は必ず再ビルド・再提出する。

### 広告・アイコン・ネイティブ設定を変えた場合

- `app.config.ts`
- `eas.json`
- `assets/icon.png`
- `react-native-google-mobile-ads` 関連設定

上記を変更した場合は、Expoの再起動だけでは反映されない。必ず新しいEAS production buildを作り、App Store Connectに提出する。

### app-ads.txt の扱い

`app-ads.txt` はアプリ本体のバイナリではなく公開Webファイルなので、ファイル更新だけならApp Store再審査は不要。ただしAdMob側のクロール反映には時間がかかる。

---

## 8. コミット前チェック

```bash
npx tsc --noEmit
git status --short
```

公開リポジトリへpushする前に、以下を確認する。

- `docs/` 配下に非公開情報がない
- `.env` や秘密鍵が含まれていない
- アカウントIDや管理画面URLを公開ドキュメントに載せていない

---

## 9. 非公開メモ

詳細な運用メモ、アカウント識別子、管理画面リンク、担当者向けToDoはObsidianで管理する。

```text
04_プロジェクト/Codex/ToDo_HANDOVER_private.md
```
