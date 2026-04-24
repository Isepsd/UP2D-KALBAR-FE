import { IFasopTelegramBot } from "./fasop-telegram-bot.interface";

interface IFasopTelegramGroup {
  id_telegram_group: number;
  id_telegram_bot: number;
  nama: string;
  id_chat: string;
  telegram_Bot?: IFasopTelegramBot,
  status: number;
  datum_created?: string;
}

export const FasopTelegramGroupField = {
  id_telegram_group: undefined,
  id_telegram_bot: null,
  telegram_Bot: null,
  nama: '',
  id_chat: 0,
  status: 0,
  datum_created: '',
};

export type { IFasopTelegramGroup };
