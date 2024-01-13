import { IKanbanShallow } from "../../Models/kanbanShallow";

export interface ICreateKanbanModalProps {
    isOpen: boolean,
    onClose: () => void,
    onCreatedKanban: (newKanban: IKanbanShallow) => void
};