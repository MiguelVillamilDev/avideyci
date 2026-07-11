import Button from "../../shared/components/common/Button";
import SimpleTable from "../../shared/components/table/SimpleTable";
import Modal from "../../shared/components/modal/Modal";
import { useState } from "react";

export default function Pesos() {
    const [modalTable, setModalTable] = useState<string | null>(null);

    return (
        <div>
            <Modal
                isOpen={modalTable === "pesos"}
                title="Agregar Peso"
                fields={[
                    { name: "categoria", label: "Categoria", type: "select", options: [{ label: "Liviano", value: "Liviano" }, { label: "Estandar", value: "Estandar" }, { label: "Pesado", value: "Pesado" }] },
                    { name: "pesoMinimo", label: "Peso Minimo", type: "number" },
                    { name: "pesoMaximo", label: "Peso Maximo", type: "number" },
                ]}
                onClose={() => setModalTable(null)}
                onSubmit={(data) => {
                    console.log(data);
                    setModalTable(null);
                }}
            />

            <SimpleTable
                title="Pesos"
                actions={<Button title="Agregar Peso" table="pesos" onClick={(table) => setModalTable(table)} />}
                columns={['Categoria', 'Peso Minimo', 'Peso Maximo']}
                rows={[
                    ['Liviano', '1980', '2090'],
                    ['Estandar', '2250', '2400'],
                    ['Pesado', '2930', '3070'],
                ]}
            />
        </div>
    )
}