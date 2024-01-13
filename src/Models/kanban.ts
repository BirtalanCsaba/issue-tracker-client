import { KanbanRole } from "../Enums/kanbanRole";
import { IPhase } from "./phase";
import { IUser } from "./user";

export interface IKanban{
    id: number,
    title: string,
    description: string,
    ownerId: number,
    role: KanbanRole
    phases: IPhase[],
    admins: IUser[],
    participants: IUser[]
};