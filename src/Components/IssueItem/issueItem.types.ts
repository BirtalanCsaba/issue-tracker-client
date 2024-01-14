import { IIssue } from "../../Models/issue";
import { IUser } from "../../Models/user";

export interface IIssueItemProps {
    phaseId: number,
    issueId: number,
    kanbanUsers: IUser[],
    issue?: IIssue,
    onSavedIssue: (newIssue: IIssue) => void
};