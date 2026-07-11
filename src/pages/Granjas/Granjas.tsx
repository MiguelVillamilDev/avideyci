import Button from "../../shared/components/common/Button";
import SimpleTable from "../../shared/components/table/SimpleTable";
import Modal from "../../shared/components/modal/Modal";
import { useState } from "react";

export default function Granjas() {
    const [modalTable, setModalTable] = useState<string | null>(null);

    return (
        <div>
            <Modal
                isOpen={modalTable === "granjas"}
                title="Agregar Granja"
                columns={2}
                fields={[
                    { name: "nombreGranja", label: "Nombre Granja", type: "text", required: true },
                    { name: "fechaEncasetamiento", label: "Fecha Encasetamiento", type: "date", required: true },
                    { name: "nroGalpon", label: "Nro Galpon", type: "text" },
                    { name: "avesXGalpon", label: "Aves X Galpon", type: "number" },
                    {
                        name: "sexo",
                        label: "Sexo",
                        type: "select",
                        options: [
                            { label: "Macho", value: "Macho" },
                            { label: "Hembra", value: "Hembra" },
                            { label: "Mixto", value: "Mixto" },
                        ],
                    },
                    { name: "peso", label: "Peso", type: "number" },
                    { name: "edad", label: "Edad", type: "number" },
                    { name: "ubicacion", label: "Ubicacion", type: "text" },
                    { name: "horasTrayecto", label: "Horas Trayecto", type: "number" },
                    { name: "tipoGalpon", label: "Tipo Galpon", type: "text" },
                    { name: "mortalidad", label: "Mortalidad", type: "number" },
                ]}
                onClose={() => setModalTable(null)}
                onSubmit={(data) => {
                    console.log(data);
                    setModalTable(null);
                }}
            />

            <SimpleTable
                title="Granjas"
                actions={<Button title="Agregar Granja" table="granjas" onClick={(table) => setModalTable(table)} />}
                columns={['Nombre Granja', 'Fecha Encasetamiento', 'Nro Galpon', 'AvesXGalpon', 'Sexo', 'Peso', 'Edad', 'Ubicacion', 'Horas Trayecto', 'Tipo Galpon', 'Mortalidad']}
                rows={[
                    ['Granja 1', '2023-06-12', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                    ['Granja 2', '2023-06-12', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                    ['Granja 3', '2023-06-12', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                ]}
            />
        </div>
    )
}