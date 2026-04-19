import { IFasopWhatsappKontakGroup } from "./fasop-whatsapp-kontak-group.interface";

interface IFasopWhatsappKontak {
    id_wa_kontak: number;

    nama: string;
    no_kontak: string;
    status: number;

    id_wa_group: number;

    id_group: IFasopWhatsappKontakGroup;


}

export const FasopWhatsappKontakField = {
    id_wa_kontak: null,
    id_group: null,
    nama: '',
    no_kontak: '',

    status: 0,
    id_wa_group: null,

};

export type { IFasopWhatsappKontak };
