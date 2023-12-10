import { Priority } from "../Enums/priority";

export interface IIsue {
    issueId: string,
    title: string,
    description: string,
    priority: Priority,
    hoursWorked: number,
    notes: string
};