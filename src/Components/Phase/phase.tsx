import { Icon, IconButton, Modal, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IPhaseProps } from "./phase.types";
import { IReadIssuePhaseDTO } from "../../DTO/readIssuePhase";
import { IIssueShallow } from "../../Models/issueShallow";
import { IssuePhasesService } from "../../Utils/services";
import { IPhase } from "../../Models/phase";
import { deleteIconClassName, issueContainerClassName, issueTitleClassName, itemButtonButtonClassName, listIssueContainerClassName, phaseContainerClassName, primaryButtonClassName, titleStyles, topSectionClassName } from "./phase.styles";
import { IssueItem } from "../IssueItem/issueItem";
import { buttonClassName, iconStyle } from "../../Pages/Kanban/kanbanPage.styles";

export const PhaseComponent = (props: IPhaseProps): JSX.Element => {
    const [name, setName] = React.useState<string>(props.phase.name);
    const [issues, setIssues] = React.useState<IIssueShallow[]>(props.phase.issues);
    const [isEditIssueModalOpen, setIsEditIssueModalOpen] = React.useState<boolean>(false);
    const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = React.useState<boolean>(false);

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
                <IconButton
                    iconProps={{ iconName: 'Delete', style: { marginLeft: '15px', fontSize: '20px' } }}
                    title="Delete phase"
                    className={deleteIconClassName}
                />
            </Stack>
            <div className={listIssueContainerClassName(props.backgroundColor)}>
                {issues.map((issue: IIssueShallow, index: number) => (
                    <div>
                        <div key={index} className={issueContainerClassName}>
                            <span className={issueTitleClassName}>{issue.title}</span>
                            <IconButton
                                iconProps={{ iconName: 'Edit'}}
                                title="Edit item"
                                onClick={() => setIsEditIssueModalOpen(true)}
                                className={itemButtonButtonClassName}
                            />
                            <IconButton
                                iconProps={{ iconName: 'Delete', style: { marginLeft: '-20px', fontSize: '20px' } }}
                                title="Delete item"
                                className={itemButtonButtonClassName}
                            />
                        </div>
                        <Modal isOpen={isEditIssueModalOpen} onDismiss={() => setIsEditIssueModalOpen(false)}>
                            <IssueItem issueId={issue.issueId} />
                        </Modal>
                    </div>
                ))}
            </div>
            <button className={primaryButtonClassName} onClick={() => setIsCreateIssueModalOpen(true)}>Add new issue</button>
            <Modal isOpen={isCreateIssueModalOpen} onDismiss={() => setIsCreateIssueModalOpen(false)}>
                <IssueItem issueId={''} />
            </Modal>
        </Stack>
    );
};