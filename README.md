## poc-telegram-bot

Small POC on running Telegram webhook bot on Firebase Functions

## Prerequisite

- Have `firebase-tools` installed via `npm install -g firebase-tools`
- Have Telegram API Token from BotFather
- Installing dependencies

```bash
cd functions
npm install
```

- Setup webhook to Telegram with `sethook`

```bash
# Set webhook (WEBHOOK_URL should be https either deployed or tunneled from localhost)
npx sethook ${TELEGRAM_BOT_TOKEN} ${WEBHOOK_URL}

# Detach webhook from bot
npx sethook ${TELEGRAM_BOT_TOKEN}
```

## Serving

```bash
cd functions
npm run serve
```