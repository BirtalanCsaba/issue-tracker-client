import { ICreateIssueDTO } from "./createIssueDTO";

export interface IUpdateIssueDTO extends ICreateIssueDTO {
    id: number
};