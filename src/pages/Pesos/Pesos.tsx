import Button from "../../shared/components/common/Button";
import SimpleTable from "../../shared/components/table/SimpleTable";
import Modal from "../../shared/components/modal/Modal";
import ConfirmDialog from "../../shared/components/modal/ConfimDialog";
import { useState } from "react";

const columnKeys = ["categoria", "pesoMinimo", "pesoMaximo"];

export default function Pesos() {
    const [rows, setRows] = useState([
        ['Liviano', '1980', '2090'],
        ['Estandar', '2250', '2400'],
        ['Pesado', '2930', '3070'],
    ]);
    const [modalTable, setModalTable] = useState<string | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const initialData =
        editIndex !== null
            ? Object.fromEntries(columnKeys.map((key, i) => [key, rows[editIndex][i]]))
            : undefined;

    return (
        <div>
            <Modal
                isOpen={modalTable === "pesos"}
                title={editIndex !== null ? "Editar Peso" : "Agregar Peso"}
                initialData={initialData}
                fields={[
                    { name: "categoria", label: "Categoria", type: "select", options: [{ label: "Liviano", value: "Liviano" }, { label: "Estandar", value: "Estandar" }, { label: "Pesado", value: "Pesado" }] },
                    { name: "pesoMinimo", label: "Peso Minimo", type: "number" },
                    { name: "pesoMaximo", label: "Peso Maximo", type: "number" },
                ]}
                onClose={() => { setModalTable(null); setEditIndex(null); }}
                onSubmit={(data) => {
                    const newRow = columnKeys.map((key) => data[key]);
                    if (editIndex !== null) {
                        setRows((prev) => prev.map((r, i) => (i === editIndex ? newRow : r)));
                    } else {
                        setRows((prev) => [...prev, newRow]);
                    }
                    setModalTable(null);
                    setEditIndex(null);
                }}
            />

            <ConfirmDialog
                isOpen={deleteIndex !== null}
                onCancel={() => setDeleteIndex(null)}
                onConfirm={() => {
                    setRows((prev) => prev.filter((_, i) => i !== deleteIndex));
                    setDeleteIndex(null);
                }}
            />

            <SimpleTable
                title="Pesos"
                actions={<Button title="Agregar Peso" table="pesos" onClick={(table) => setModalTable(table)} />}
                columns={['Categoria', 'Peso Minimo', 'Peso Maximo']}
                rows={rows}
                onEdit={(rowIndex) => { setEditIndex(rowIndex); setModalTable("pesos"); }}
                onDelete={(rowIndex) => setDeleteIndex(rowIndex)}
            />
        </div>
    )
}