import { IPhase } from "../../Models/phase";

export interface IAddPhaseModalProps {
    kanbanId: number,
    isOpen: boolean,
    onClose: () => void,
    onAddedPhase: (phase: IPhase) => void
};