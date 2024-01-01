import { IIssueShallow } from "./issueShallow";

export interface IPhase {
    phaseId: string,
    name: string,
    issues: IIssueShallow[]
};