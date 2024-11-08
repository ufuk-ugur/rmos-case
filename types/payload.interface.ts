export interface FetchForecastPayload {
    db_Id: number;
    xRez_Sirket: number;
    xBas_Tar: string;
    xBit_Tar: string;
    xtip: number;
    kon1: string;
    kon2: string;
    xchkFis_Fazla_otel_10: number;
    bas_Yil: number;
    bit_Yil: number;
    fisrci_Kapalioda_10: number;
    xRez_C_W: string;
    xSistem_Tarihi: string;
    xAlis_Tarihi: string;
    sistem_Bas1: string;
    sistem_Bit1: string;
    pmdahil_10: number;
    tip_1: string;
    xFis_Bela_tutar_10: number;
    trace_Dus_10: number;
    cev_01: unknown; // TODO: It will change
}

export interface FetchBlacklistPayload {
    db_Id: number;
    Adi: string;
}

export interface PostBlacklistPayload {
    db_Id: number;
    Id: number;
    Adi: string;
    Soy: string;
    Aciklama: string;
    Kimlik_no?: string | null;
    Tcno?: string | null;
}

export interface PostBlacklistFormProps {
    Id: number;
    Adi?: string;
    Soy?: string;
    Aciklama?: string;
    Kimlik_no?: string;
    Tcno?: string;
}