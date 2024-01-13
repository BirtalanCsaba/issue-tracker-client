import { IKanbanShallow } from "../../Models/kanbanShallow";

export interface IKanbanShallowProps {
    kanbanShallow: IKanbanShallow,
    onDeleteKanban: (kanbanId: number) => void
};