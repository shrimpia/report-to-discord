# Misskey通報転送ワーカー

Cloudflare Workersで動作する、Misskeyの通報をDiscordに通知するワーカーです。

## 利用方法

1. 通報用のDiscord WebHook URLを作成する
2. `npx wrangler secret put WEBHOOK_URL` コマンドを実行し、1. で作成したURLを入力する
3. `npx wrangler secret put MISSKEY_URL` コマンドを実行し、お使いのサーバー名を入力する（例: https://mk.shrimpia.network）
4. `pnpm run deploy` し、デプロイする
5. Workers Routesにルートを追加する
  - `あなたのドメイン/api/users/report-abuse`

## ライセンス

CC0
