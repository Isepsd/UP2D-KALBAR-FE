interface IFasopWhatsappBot {
    id_wa_bot: number,
    datum_created?: string;
    nama: string;
    url: string;
    status: number;
    token: string;
    instance_id: string;
}

export const FasopWhatsappField = {
    id_wa_bot: undefined,
    nama: '',
    datum_created: '',
    url: '',
    status: 0,
    token: '',
    instance_id: '',
};

export type { IFasopWhatsappBot };
