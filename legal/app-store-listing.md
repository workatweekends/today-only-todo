# App Store 掲載情報 — 今日だけToDo

App Store Connect にそのままコピペできる文案です。

---

## 基本情報

| 項目 | 内容 |
|------|------|
| アプリ名 | 今日だけToDo |
| サブタイトル（30文字以内） | 今日だけ、ゼロから始めるToDo |
| カテゴリ | 仕事効率化（プライマリ）/ ライフスタイル（セカンダリ） |
| 年齢制限 | 4+ |
| 価格 | 無料 |
| 連絡先 | workatweekends.m@gmail.com |

---

## プロモーション用テキスト（170文字以内）

```
翌日になるとタスクはすべて消える。持ち越しなし、プレッシャーなし。今日やることだけに集中できる、シンプルなToDoアプリです。
```

---

## 説明文（4000文字以内）

```
今日だけToDo — 毎日ゼロから、軽く始める。

■ コンセプト
翌日になると、タスクはすべて消えます。
昨日の未完了を引きずらない。明日の自分にプレッシャーを残さない。
「今日やること」だけに集中できる、ミニマルなToDoアプリです。

■ 主な機能
・タスクの追加・完了・削除
・進捗表示（2 / 5 完了）
・今日の残り時間カウントダウン
・翌日リセット（時刻を自分で設定可能）
・ダークモード対応
・全タスク完了時のお祝いアニメーション

■ こんな人におすすめ
・ToDoリストがどんどん溜まってしまう
・完璧主義で手が止まってしまう
・毎日を気軽にリセットしたい
・シンプルで余白のあるアプリが好き

■ データについて
タスクはお使いの端末内にのみ保存されます。アカウント登録は不要です。

■ お問い合わせ
workatweekends.m@gmail.com
```

---

## キーワード（100文字以内・カンマ区切り）

```
ToDo,タスク,今日,シンプル,習慣,生産性,毎日,リセット,ミニマル,仕事
```

---

## バージョン 1.0 の「このバージョンの最新情報」

```
初回リリース。今日だけのToDoを、シンプルに。
```

---

## スクリーンショット撮影ガイド

### 必要なサイズ（iPhone）

App Store Connect は **6.7インチ**（iPhone 15 Pro Max 等）のスクリーンショットが必須です。
シミュレータで **iPhone 17 Pro Max** を使えば OK です。

| # | 画面 | 撮る内容 |
|---|------|---------|
| 1 | メイン（タスクあり） | タスク3〜5件、進捗バー表示 |
| 2 | メイン（空状態） | 「今日やることを追加しよう」 |
| 3 | タスク完了 | 1件完了＋取り消し線の状態 |
| 4 | 全完了 | 紙吹雪アニメーションの瞬間 |
| 5 | 設定画面 | リセット時刻・ダークモード |

### 撮影コマンド（シミュレータ起動中）

```bash
# 保存先フォルダを作成
mkdir -p ~/Desktop/ToDo-screenshots

# スクリーンショット撮影（番号を変えて5枚）
xcrun simctl io booted screenshot ~/Desktop/ToDo-screenshots/01-main.png
xcrun simctl io booted screenshot ~/Desktop/ToDo-screenshots/02-empty.png
xcrun simctl io booted screenshot ~/Desktop/ToDo-screenshots/03-complete.png
xcrun simctl io booted screenshot ~/Desktop/ToDo-screenshots/04-confetti.png
xcrun simctl io booted screenshot ~/Desktop/ToDo-screenshots/05-settings.png
```

Mac のショートカット **⌘ + S**（シミュレータがアクティブ時）でも撮影できます。

### キャプション案（App Store の画像ごと）

1. **今日やることだけ、ここに。**
2. **毎日ゼロから。プレッシャーなし。**
3. **タップで完了。気持ちいい。**
4. **全部終わったら、お祝い。**
5. **リセット時刻も、自分で決められる。**

---

## App Store Connect チェックリスト

- [ ] プライバシーポリシー URL を公開・入力
- [ ] スクリーンショット 3〜5枚アップロード
- [ ] 説明文・キーワード・サブタイトルを入力
- [ ] App Privacy で「データを収集」→ 広告（Device ID 等）を申告
- [ ] 年齢制限・カテゴリを設定
- [ ] 連絡先メールを入力
- [ ] Apple Developer Program 登録済み
- [ ] `eas build --profile production --platform ios` でビルド
- [ ] `eas submit` で申請

---

## プライバシーポリシー URL（設定後にここに記入）

```
（GitHub Pages 等で公開後の URL を貼る）
例: https://workatweekends.github.io/today-only-todo/privacy-policy.html
```
