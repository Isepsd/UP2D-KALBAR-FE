import { IFasopWhatsappBot } from "./master-data/fasop-whatsapp-bot.interface";
import { IFasopWhatsappKontak } from "./master-data/fasop-whatsapp-kontak.interface";
interface IFasopWhatsappLog {

  nama: string;
  id_wa_bot: number,

  pesan_error: number;
  token: string;
  instance_id: string;

  bot?: IFasopWhatsappBot,
  kontak?: IFasopWhatsappKontak,
  msg: string,

}

export const FasopWhatsappLogField = {
  id_wa_bot: undefined,
  nama: '',
  pesan_error: '',
  msg: null,
  status_sent: 0,
};

export type { IFasopWhatsappLog };
