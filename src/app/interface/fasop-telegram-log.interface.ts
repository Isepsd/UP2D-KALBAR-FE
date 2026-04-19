import { IFasopTelegramBot } from './fasop-telegram-bot.interface';

interface IFasopTelegramLog {
  id: number;
  id_chat: number;
  id_telegram_bot: string;
  telegram_bot: IFasopTelegramBot;
  msg: string;
  status_sent: number;
  status: number;
  kirim_ulang: number;
  pesan_error: string;
}

export const FasopTelegramLogField = {
  id: undefined,
  id_chat: 0,
  id_telegram_bot: null,
  msg: '',
  status_sent: 0,
  status: 0,
  kirim_ulang: 0,
  pesan_error: '',
};

export type { IFasopTelegramLog };
