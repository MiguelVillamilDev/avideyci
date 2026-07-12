import { useState } from "react";
import type { Granja, Galpon } from "../../types/granja.types";

const initialGranjas: Granja[] = [
    {
        id: "granja-1",
        nombreGranja: "Granja 1",
        fechaEncasetamiento: "2023-06-12",
        ubicacion: "G",
        galpones: [
            { nroGalpon: "A", avesXGalpon: 0 , sexo: "C", peso: 0, edad: 0, horasTrayecto: 0, tipoGalpon: "I", mortalidad: 0 },
        ],
    },
];

export function useGranjas() {
    const [granjas, setGranjas] = useState<Granja[]>(initialGranjas);

    // ----- Queries -----
    const getGranja = (id: string) => granjas.find((g) => g.id === id);
    const getGalpon = (granjaId: string, index: number) => getGranja(granjaId)?.galpones[index];

    // ----- Commands -----
    const createGranja = (data: Omit<Granja, "id" | "galpones">) => {
        setGranjas((prev) => [...prev, { ...data, id: `granja-${Date.now()}`, galpones: [] }]);
    };

    const updateGranja = (id: string, data: Omit<Granja, "id" | "galpones">) => {
        setGranjas((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
    };

    const deleteGranja = (id: string) => {
        setGranjas((prev) => prev.filter((g) => g.id !== id));
    };

    const addGalpon = (granjaId: string, galpon: Galpon) => {
        setGranjas((prev) =>
            prev.map((g) => (g.id === granjaId ? { ...g, galpones: [...g.galpones, galpon] } : g))
        );
    };

    const updateGalpon = (granjaId: string, index: number, galpon: Galpon) => {
        setGranjas((prev) =>
            prev.map((g) =>
                g.id === granjaId
                    ? { ...g, galpones: g.galpones.map((gp, i) => (i === index ? galpon : gp)) }
                    : g
            )
        );
    };

    const deleteGalpon = (granjaId: string, index: number) => {
        setGranjas((prev) =>
            prev.map((g) =>
                g.id === granjaId ? { ...g, galpones: g.galpones.filter((_, i) => i !== index) } : g
            )
        );
    };

    return {
        granjas,
        getGranja,
        getGalpon,
        createGranja,
        updateGranja,
        deleteGranja,
        addGalpon,
        updateGalpon,
        deleteGalpon,
    };
}