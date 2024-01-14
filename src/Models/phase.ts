import { IIssue } from "./issue";

export interface IPhase {
    id: number,
    title: string,
    rank: string,
    issue: IIssue[]
};