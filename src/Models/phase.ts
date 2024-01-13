import { IIssueShallow } from "./issueShallow";

export interface IPhase {
    id: string,
    title: string,
    rank?: string,
    issues: IIssueShallow[]
};