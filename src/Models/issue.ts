import { Priority } from "../Enums/priority";

export interface IIssue {
    id: number,
    title: string,
    description: string,
    priority: Priority,
    assignedUser: number,
    expectedDeadline: Date
};