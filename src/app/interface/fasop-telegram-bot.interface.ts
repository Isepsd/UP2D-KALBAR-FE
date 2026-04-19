interface IFasopTelegramBot {
  id_telegram_bot: number,
  nama: string;
  chat_code: string;
  status: number;
  datum_created?: string;
  url: string;
  token: string;
  instance_id: string;
}

export const FasopTelegramBotField = {
  id_telegram_bot: undefined,
  nama: '',
  chat_code: '',
  status: 0,
  datum_created: '',
  url: '',
  token: '',
  instance_id: '',

};

export type { IFasopTelegramBot };
