import Button from "../../shared/components/common/Button";
import Modal from "../../shared/components/modal/Modal";
import ConfirmDialog from "../../shared/components/modal/ConfimDialog";
import GroupedTable from "../../shared/components/table/GroupedTable";
import { useCrudModal } from "../../shared/hooks/modal/UseCrudModal";
import { useGranjas } from "../../shared/hooks/granja/UseGranjas";
import type { Granja } from "../../shared/types/granja.types";
import { ParentFields, childFields } from "../../shared/types/granjas.fields";
import { useState } from "react";

export default function Granjas() {
    const { granjas, getGranja, getGalpon, createGranja, updateGranja, deleteGranja, addGalpon, updateGalpon, deleteGalpon } = useGranjas();

    const granjaModal = useCrudModal<Granja>();
    const [galponContext, setGalponContext] = useState<{ granjaId: string; index: number | null } | null>(null);
    const [deleteGranjaId, setDeleteGranjaId] = useState<string | null>(null);
    const [deleteGalponCtx, setDeleteGalponCtx] = useState<{ granjaId: string; index: number } | null>(null);

    const groups = granjas.map((g) => ({
        id: g.id,
        parentLabel: g.nombreGranja,
        parentColumns: [g.fechaEncasetamiento, g.ubicacion, String(g.galpones.length)],
        children: g.galpones.map((gp) => Object.values(gp)),
    }));

    return (
        <div>
            <Modal
                isOpen={granjaModal.isOpen}
                title={granjaModal.isEditing ? "Editar Granja" : "Agregar Granja"}
                initialData={granjaModal.editingItem as any}
                fields={ParentFields}
                onClose={granjaModal.close}
                onSubmit={(data) => {
                    granjaModal.isEditing
                        ? updateGranja(granjaModal.editingItem!.id, data as any)
                        : createGranja(data as any);
                    granjaModal.close();
                }}
            />

            <Modal
                isOpen={galponContext !== null}
                title={galponContext?.index !== null ? "Editar Galpon" : "Agregar Galpon"}
                initialData={
                    galponContext?.index != null
                        ? (getGalpon(galponContext.granjaId, galponContext.index) as any)
                        : undefined
                }
                fields={childFields}
                columns={2}
                onClose={() => setGalponContext(null)}
                onSubmit={(data) => {
                    if (!galponContext) return;
                    galponContext.index !== null
                        ? updateGalpon(galponContext.granjaId, galponContext.index, data as any)
                        : addGalpon(galponContext.granjaId, data as any);
                    setGalponContext(null);
                }}
            />

            <ConfirmDialog
                isOpen={deleteGranjaId !== null}
                title="¿Eliminar granja?"
                message="Se eliminará junto con todos sus galpones."
                onCancel={() => setDeleteGranjaId(null)}
                onConfirm={() => { deleteGranja(deleteGranjaId!); setDeleteGranjaId(null); }}
            />

            <ConfirmDialog
                isOpen={deleteGalponCtx !== null}
                title="¿Eliminar galpon?"
                onCancel={() => setDeleteGalponCtx(null)}
                onConfirm={() => { deleteGalpon(deleteGalponCtx!.granjaId, deleteGalponCtx!.index); setDeleteGalponCtx(null); }}
            />

            <GroupedTable
                title="Granjas"
                actions={<Button title="Agregar Granja" table="granjas" onClick={granjaModal.openCreate} />}
                parentLabel="Granja"
                parentColumnLabels={['Encasetamiento', 'Ubicacion', 'Galpones']}
                columns={['Galpon', 'AvesXGalpon', 'Sexo', 'Peso', 'Edad', 'Horas Trayecto', 'Tipo Galpon', 'Mortalidad']}
                groups={groups}
                onEditParent={(id) => granjaModal.openEdit(getGranja(id)!)}
                onDeleteParent={setDeleteGranjaId}
                onAddChild={(id) => setGalponContext({ granjaId: id, index: null })}
                onEditChild={(id, index) => setGalponContext({ granjaId: id, index })}
                onDeleteChild={(id, index) => setDeleteGalponCtx({ granjaId: id, index })}
            />
        </div>
    );
}