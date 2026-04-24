import { IFasopTelegramKontakGroup } from "./fasop-telegram-kontak-group.interface";

interface IFasopTelegramKontak {
    id_wa_kontak: number;

    nama: string;
    no_kontak: string;
    status: number;

    id_wa_group: number;

    id_group: IFasopTelegramKontakGroup;


}

export const FasopTelegramKontakField = {
    id_wa_kontak: null,
    id_group: null,
    nama: '',
    no_kontak: '',

    status: 0,
    id_wa_group: null,

};

export type { IFasopTelegramKontak };
