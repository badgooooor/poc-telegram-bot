import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { Telegraf } from "telegraf";


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
const CHAT_ID = parseInt(process.env.CHAT_ID as string);

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Handling command
bot.command('start', ctx => 
  ctx.reply('Hello! Send any message and I will copy it.')
);

bot.command('test', ctx => {
  ctx.reply('Test');
});

// Send handling messages.
bot.on('message', (ctx) => ctx.reply('Got message'));

export const telegramBot = onRequest(async (request, response) => {
  logger.log('message sent with body', request.body, request.headers);

  await bot.handleUpdate(request.body, response).then(() => {
		// if it's not a request from the telegram, rv will be undefined, but we should respond with 200
		return response.sendStatus(200);
	});
});

export const sendMessage = onRequest(async (request, response) => {
  await bot.telegram?.sendMessage(CHAT_ID, 'Hello there from send!').then((value) => {
    logger.log('send message');
    return response.sendStatus(200);
  }).catch((err) => {
    logger.error('error on message', err);
    return;
  });
});

export const scheduledBotSending = onSchedule('5/60 * * * *', async () => {
  await bot.telegram?.sendMessage(CHAT_ID, 'Hello there!')
});
