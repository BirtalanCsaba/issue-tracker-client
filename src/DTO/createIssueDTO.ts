export interface ICreateIssueDTO {
    title: string;
    description: string;
    priority: number;
    expectedDeadline: Date;
    phaseId: number;
    assignedUser: number | null
};