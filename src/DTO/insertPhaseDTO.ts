import { IAddExtremityPhaseDTO } from "./addExtremetyPhaseDTO";

export interface IInsertPhaseDTO extends IAddExtremityPhaseDTO{
    firstPhase: number,
    secondPhase: number
};