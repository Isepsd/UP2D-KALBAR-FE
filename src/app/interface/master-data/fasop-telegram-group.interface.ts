import { IFasopTelegramBot } from "./fasop-telegram-bot.interface";

interface IFasopTelegramGroup {
    id_wa_group: number;
    id_wa_bot: number;

    nama: string;
    url: string;
    status: number;

    bot?: IFasopTelegramBot;



}

export const FasopTelegramGroupField = {
    id_wa_group: undefined,

    id_wa_bot: null,
    nama: '',

    status: 0,

    bot: null,

};

export type { IFasopTelegramGroup };
