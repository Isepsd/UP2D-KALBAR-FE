import { IFasopTelegramGroup } from "./fasop-telegram-group.interface";
import { IFasopTelegramKontak } from "./fasop-telegram-kontak.interface";

interface IFasopTelegramKontakGroup {
    id_tel_kontak: number;
    id_tel_group: number;
    id: number;
    number: number;
    nama: string;
    no_kontak: string;
    kontak: IFasopTelegramKontak;
    group?: IFasopTelegramGroup;

}

export const FasopTelegramKontakGroupField = {
    kontak:null,
    group:null,
    id_tel_kontak: null,
    id_tel_group: null,



};

export type { IFasopTelegramKontakGroup };
