# workatweekends.github.io 用（AdMob app-ads.txt）

AdMob は App Store の「マーケティング URL」の**ドメイン直下**から app-ads.txt を取得します。

マーケティング URL が `https://workatweekends.github.io/today-only-todo/` の場合、
取得先は **`https://workatweekends.github.io/app-ads.txt`** です（`/today-only-todo/` 配下ではありません）。

## 初回セットアップ（1回だけ）

1. GitHub で **新規リポジトリ** `workatweekends.github.io` を作成（Public）
2. このフォルダの `app-ads.txt` をリポジトリ直下に追加して push
3. Settings → Pages → Branch: `main` / `/ (root)` で公開
4. ブラウザで https://workatweekends.github.io/app-ads.txt が表示されることを確認
5. AdMob → アプリ → app-ads.txt → **「更新を確認」**
