import { KanbanRole } from "../Enums/kanbanRole";
import { IPhase } from "./phase";
import { IUser } from "./user";

export interface IKanban{
    id: number,
    title: string,
    description: string,
    owner: IUser,
    phase: IPhase[],
    admins: IUser[],
    participants: IUser[]
};