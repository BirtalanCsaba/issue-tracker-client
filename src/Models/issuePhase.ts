import { IIssueShallow } from "./issueShallow";

export interface IIssuePhase {
    issuePhaseId: string,
    name: string,
    issues: IIssueShallow[]
};