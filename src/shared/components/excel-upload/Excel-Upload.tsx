import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import SimpleTable from "../table/SimpleTable";

export interface ExcelColumnMapping {
    excelColumn: string
    targetField: string
    targetLabel: string
}

export interface ExcelUploaderProps {
    onConfirm: (rows: Record<string, string | number>[]) => void
    targetFields: { field: string; label: string; required?: boolean }[]
}

export default function ExcelUploader({ onConfirm, targetFields }: ExcelUploaderProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [rawData, setRawData] = useState<Record<string, string | number>[]>([]);
    const [excelColumns, setExcelColumns] = useState<string[]>([]);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [step, setStep] = useState<"upload" | "mapping" | "preview">("upload");
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        setError(null);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const buffer = e.target?.result;
                const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const json = XLSX.utils.sheet_to_json<Record<string, string | number>>(sheet, {
                    defval: "",
                    raw: false,
                    dateNF: "dd/mm/yyyy",
                });

                if (json.length === 0) {
                    setError("El archivo no contiene datos.");
                    return;
                }

                const allColumns = Object.keys(json[0]);
                const realColumns = allColumns.filter((col) =>
                    json.some((row) => String(row[col]).trim() !== "")
                );

                const cleanedData = json.map((row) => {
                    const cleaned: Record<string, string | number> = {};
                    realColumns.forEach((col) => (cleaned[col] = row[col]));
                    return cleaned;
                });

                setExcelColumns(realColumns);
                setRawData(cleanedData);
                setFileName(file.name);

                const autoMapping: Record<string, string> = {};
                targetFields.forEach((tf) => {
                    const match = realColumns.find(
                        (col) => col.trim().toLowerCase() === tf.label.trim().toLowerCase()
                    );
                    if (match) autoMapping[tf.field] = match;
                });
                setMapping(autoMapping);
                setStep("mapping");
            } catch {
                setError("No se pudo leer el archivo. Verifica el formato.");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const reset = () => {
        setRawData([]);
        setExcelColumns([]);
        setMapping({});
        setFileName(null);
        setError(null);
        setStep("upload");
        if (inputRef.current) inputRef.current.value = "";
    };

    const mappedRows = () =>
        rawData.map((row) => {
            const mapped: Record<string, string | number> = {};
            targetFields.forEach((tf) => {
                const excelCol = mapping[tf.field];
                mapped[tf.field] = excelCol ? row[excelCol] : "";
            });
            return mapped;
        });

    const missingRequired = targetFields.filter((tf) => tf.required && !mapping[tf.field]);

    return (
        <div className="w-[80%] mx-auto flex flex-col gap-6">
            {step === "upload" && (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className="
                        border-2 border-dashed border-[var(--accent-border)]
                        rounded-2xl bg-[var(--accent-bg)]
                        py-14 px-6
                        flex flex-col items-center justify-center gap-3
                        cursor-pointer transition-colors
                        hover:bg-[var(--accent-bg)]/70
                    "
                >
                    <i className="fa-solid fa-file-excel text-4xl text-[var(--accent)]"></i>
                    <p className="text-sm font-medium text-gray-700">
                        Arrastra tu archivo aquí o haz clic para seleccionarlo
                    </p>
                    <p className="text-xs text-gray-400">Formatos soportados: .xlsx, .xls, .csv</p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                        }}
                    />
                </div>
            )}

            {step !== "upload" && (
                <div className="flex items-center justify-between bg-[whitesmoke] border border-slate-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <i className="fa-solid fa-file-excel text-[var(--accent)]"></i>
                        <span className="font-medium">{fileName}</span>
                        <span className="text-gray-400">· {rawData.length} registros</span>
                    </div>
                    <button
                        onClick={reset}
                        className="text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Cambiar archivo
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    {error}
                </div>
            )}

            {step === "mapping" && (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500">
                        Indica qué columna del Excel corresponde a cada campo del sistema.
                    </p>

                    <div className="grid grid-cols-2 gap-4 bg-[whitesmoke] border border-slate-200 rounded-xl p-5">
                        {targetFields.map((tf) => (
                            <div key={tf.field} className="flex flex-col gap-1.5 text-left">
                                <label className="text-xs font-medium text-gray-600">
                                    {tf.label}
                                    {tf.required && <span className="text-red-500 ml-0.5">*</span>}
                                </label>
                                <select
                                    value={mapping[tf.field] || ""}
                                    onChange={(e) =>
                                        setMapping((prev) => ({ ...prev, [tf.field]: e.target.value }))
                                    }
                                    className="
                                        border border-gray-200 rounded-lg
                                        px-3 py-2 text-sm text-gray-800 bg-white
                                        focus:outline-none focus:ring-2 focus:ring-[var(--accent-border)]
                                        transition-shadow
                                    "
                                >
                                    <option value="">Sin asignar</option>
                                    {excelColumns.map((col) => (
                                        <option key={col} value={col}>
                                            {col}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {missingRequired.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            Faltan por asignar: {missingRequired.map((f) => f.label).join(", ")}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={reset}
                            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={missingRequired.length > 0}
                            onClick={() => setStep("preview")}
                            className="
                                px-4 py-2 text-sm font-semibold text-white
                                bg-[var(--accent)] rounded-lg
                                hover:brightness-110 active:scale-95
                                transition-all
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100
                            "
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            )}

            {step === "preview" && (
                <>
                    <SimpleTable
                        title="Vista previa"
                        columns={targetFields.map((tf) => tf.label)}
                        rows={mappedRows().map((row) => targetFields.map((tf) => String(row[tf.field])))}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setStep("mapping")}
                            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Volver a mapeo
                        </button>
                        <button
                            onClick={() => onConfirm(mappedRows())}
                            className="
                                px-4 py-2 text-sm font-semibold text-white
                                bg-[var(--accent)] rounded-lg
                                hover:brightness-110 active:scale-95
                                transition-all
                            "
                        >
                            Confirmar y cargar {rawData.length} registros
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}