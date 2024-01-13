import { KanbanRole } from "../Enums/kanbanRole";

export interface IKanbanShallow {
    id: number,
    title: string,
    description: string,
    admins: number[],
    participants: number[],
    ownerId: number,
    role: KanbanRole
};