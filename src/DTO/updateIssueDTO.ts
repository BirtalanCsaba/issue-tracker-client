import { ICreateIssueDTO } from "./createIssueDTO";

export interface IUpdateIssueDTO extends ICreateIssueDTO {
    issueId: number
};