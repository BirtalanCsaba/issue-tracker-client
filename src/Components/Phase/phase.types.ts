import { KanbanRole } from "../../Enums/kanbanRole";
import { IPhase } from "../../Models/phase";
import { IUser } from "../../Models/user";

export interface IPhaseProps {
    phase: IPhase,
    backgroundColor: string,
    userRole: KanbanRole,
    kanbanUsers: IUser[],
    onDeletePhase: (phaseId: number) => void
};