import ExcelUploader from "../../shared/components/excel-upload/Excel-Upload";

export default function Sacrificio() {
    return (
        <ExcelUploader
            targetFields={[
                { field: "granja", label: "Granja", required: true },
                { field: "galpon", label: "Galpon", required: true },
                { field: "avesASacrificar", label: "Aves A Sacrificar", required: true },
                { field: "fecha", label: "Fecha" },
            ]}
            onConfirm={(rows) => {
                // POST /sacrificio/bulk con `rows` ya mapeados y limpios
                console.log(rows);
            }}
        />
    );
}