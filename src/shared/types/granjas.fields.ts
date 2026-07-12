export const ParentFields = [
    { field: "nombreGranja", label: "Nombre Granja", required: true },
    { field: "fechaEncasetamiento", label: "Fecha Encasetamiento", required: true },
    { field: "ubicacion", label: "Ubicación" },
]

export const childFields = [
    { name: "nroGalpon", label: "Nro Galpon", type: "text" as const, required: true },
    { name: "avesXGalpon", label: "Aves X Galpon", type: "number" as const },
    {
        name: "sexo", label: "Sexo", type: "select" as const,
        options: [
            { label: "Macho", value: "Macho" },
            { label: "Hembra", value: "Hembra" },
            { label: "Mixto", value: "Mixto" },
        ],
    },
    { name: "peso", label: "Peso", type: "number" as const },
    { name: "edad", label: "Edad", type: "number" as const },
    { name: "horasTrayecto", label: "Horas Trayecto", type: "number" as const },
    { name: "tipoGalpon", label: "Tipo Galpon", type: "text" as const },
    { name: "mortalidad", label: "Mortalidad", type: "number" as const },
];