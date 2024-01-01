import { IPhase } from "./phase";
import { IKanbanShallow } from "./kanbanShallow";

export interface IKanban extends IKanbanShallow{
    phases: IPhase[];
};