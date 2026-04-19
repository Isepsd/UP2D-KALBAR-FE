import { IFasopWhatsappGroup } from "./fasop-whatsapp-group.interface";

interface IFasopWhatsappKontakGroup {
    id_wa_kontak: number;
    id_wa_group: number;
    nama: string;
    no_kontak: string;
    kontak: string;
    group?: IFasopWhatsappGroup;

}

export const FasopWhatsappKontakGroupField = {
    // kontak:null,
    // group:null,
    id_wa_kontak: null,
    id_wa_group: null,



};

export type { IFasopWhatsappKontakGroup };
