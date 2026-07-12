export interface Galpon{
    nroGalpon: string;
    avesXGalpon: number;
    sexo: string;
    peso: number;
    edad: number;
    horasTrayecto: number;
    tipoGalpon: string;
    mortalidad: number;
}

export interface Granja{
    id : string;
    nombreGranja: string;
    fechaEncasetamiento: string;
    ubicacion: string;
    galpones: Galpon[];
}