import { IFasopWhatsappBot } from "./fasop-whatsapp-bot.interface";

interface IFasopWhatsappGroup {
    id_wa_group: number;
    id_wa_bot: number;

    nama: string;
    url: string;
    status: number;

    bot?: IFasopWhatsappBot;



}

export const FasopWhatsappGroupField = {
    id_wa_group: undefined,

    id_wa_bot: null,
    nama: '',

    status: 0,

    bot: null,

};

export type { IFasopWhatsappGroup };
