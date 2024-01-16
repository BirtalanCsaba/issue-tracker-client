import { Icon, IconButton, Modal, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IPhaseProps } from "./phase.types";
import { IReadIssuePhaseDTO } from "../../DTO/readIssuePhase";
import { IIssueShallow } from "../../Models/issueShallow";
import { IssuesService, PhasesService } from "../../Utils/services";
import { IPhase } from "../../Models/phase";
import { deleteIconClassName, issueContainerClassName, issueTitleClassName, itemButtonClassName, listIssueContainerClassName, phaseContainerClassName, primaryButtonClassName, titleStyles, topSectionClassName } from "./phase.styles";
import { IssueItem } from "../IssueItem/issueItem";
import { buttonClassName, iconStyle } from "../../Pages/Kanban/kanbanPage.styles";
import { KanbanRole } from "../../Enums/kanbanRole";
import { IIssue } from "../../Models/issue";

export const PhaseComponent = (props: IPhaseProps): JSX.Element => {
    const [name, setName] = React.useState<string>(props.phase.title);
    const [issues, setIssues] = React.useState<IIssue[]>(props.phase.issue.sort(
        (issue1: IIssue, issue2: IIssue) => parseInt(issue1.priority) - parseInt(issue2.priority)));
    const [isIssueModalOpen, setIsIssueModalOpen] = React.useState<boolean>(false);
    const [currentIssueId, setCurrentIssueId] = React.useState<number>(-1);

    const handleDeletePhase = (): void => {
        const userConfirmed: boolean = window.confirm('Are you sure you want to delete this phase?');

        if (userConfirmed) {
            PhasesService.DeletePhase(props.phase.id)
                .then(function (response) {
                    props.onDeletePhase(props.phase.id)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    };

    const onCreatedIssue = (newIssue: IIssue) => {
        setIssues([...issues, newIssue].sort(
            (issue1: IIssue, issue2: IIssue) => parseInt(issue1.priority) - parseInt(issue2.priority)));
        setIsIssueModalOpen(false);
    };

    const onUpdatedIssue = (updatedIssue: IIssue) => {
        const issueIndex: number = issues.findIndex((issue: IIssue) => issue.id === updatedIssue.id);
        if (issueIndex === -1)
            return;

        let newIssues: IIssue[] = [...issues];
        newIssues[issueIndex] = { ...updatedIssue };
        newIssues = newIssues.sort(
            (issue1: IIssue, issue2: IIssue) => parseInt(issue1.priority) - parseInt(issue2.priority));
        setIssues(newIssues);

        setIsIssueModalOpen(false);
    };

    const onDeleteIssue = (issueId: number): void => {
        IssuesService.DeleteIssue(issueId)
            .then(function (response) {
                handleDeleteIssue(issueId);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDeleteIssue = (issueId: number): void => {
        const issueIndex: number = issues.findIndex((issue: IIssue) => issue.id === issueId);
        if (issueIndex === -1)
            return;

        const newIssues: IIssue[] = [...issues];
        newIssues.splice(issueIndex, 1);
        setIssues(newIssues);
    };

    return (
        <Stack className={phaseContainerClassName(props.backgroundColor)}>
            <Stack horizontal horizontalAlign="space-between" className={topSectionClassName}>
                <TextField
                    type="text"
                    multiline={false}
                    value={name}
                    onChange={(event, newValue?: string) => newValue && setName(newValue)}
                    styles={titleStyles}
                />
                <button className={primaryButtonClassName}>
                    <Icon
                        iconName="Save"
                        style={iconStyle}
                    />
                    Save
                </button>
                {props.userRole !== KanbanRole.PARTICIPANT &&
                    <IconButton
                        iconProps={{ iconName: 'Delete', style: { marginLeft: '15px', fontSize: '20px' } }}
                        title="Delete phase"
                        className={deleteIconClassName}
                        onClick={handleDeletePhase}
                    />
                }
            </Stack>
            <div className={listIssueContainerClassName(props.backgroundColor)}>
                {issues.map((issue: IIssue, index: number) => (
                    <div key={issue.id}>
                        <div className={issueContainerClassName}>
                            <span className={issueTitleClassName}>{issue.title}</span>
                            <IconButton
                                iconProps={{ iconName: 'Edit' }}
                                title="Edit item"
                                onClick={() => { setCurrentIssueId(issue.id); setIsIssueModalOpen(true) }}
                                className={itemButtonClassName}
                            />
                            {props.userRole !== KanbanRole.PARTICIPANT &&
                                <IconButton
                                    iconProps={{ iconName: 'Delete', style: { marginLeft: '-20px', fontSize: '20px' } }}
                                    title="Delete item"
                                    onClick={() => onDeleteIssue(issue.id)}
                                    className={itemButtonClassName}
                                />
                            }
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isIssueModalOpen} onDismiss={() => setIsIssueModalOpen(false)}>
                <IssueItem
                    issueId={currentIssueId}
                    phaseId={props.phase.id}
                    kanbanUsers={props.kanbanUsers}
                    onSavedIssue={currentIssueId === -1 ? onCreatedIssue : onUpdatedIssue}
                    issue={currentIssueId === -1 ? undefined : issues.find((issue: IIssue) => issue.id === currentIssueId)}
                />
            </Modal>
            <button className={primaryButtonClassName} onClick={() => { setCurrentIssueId(-1); setIsIssueModalOpen(true) }}>Add new issue</button>
        </Stack>
    );
};