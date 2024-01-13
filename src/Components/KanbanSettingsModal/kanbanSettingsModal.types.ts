import { IKanban } from "../../Models/kanban"

export interface IKanbanSettingsModalProps {
    kanban: IKanban,
    isOpen: boolean,
    onClose: () => void,
    onUpdatedKanban: (newKanban: IKanban) => void
};