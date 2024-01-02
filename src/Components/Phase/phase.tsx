import { IconButton, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IPhaseProps } from "./phase.types";
import { IReadIssuePhaseDTO } from "../../DTO/readIssuePhase";
import { IIssueShallow } from "../../Models/issueShallow";
import { IssuePhasesService } from "../../Utils/services";
import { IPhase } from "../../Models/phase";
import { deleteIconButtonStyle, issueContainerClassName, issueTitleClassName, listIssueContainerClassName, phaseContainerClassName, primaryButtonClassName, titleStyles, topSectionClassName } from "./phase.styles";

export const PhaseComponent = (props: IPhaseProps): JSX.Element => {
    const [name, setName] = React.useState<string>(props.phase.name);
    const [issues, setIssues] = React.useState<IIssueShallow[]>(props.phase.issues);

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
                <button className={primaryButtonClassName}>Save</button>
                <IconButton
                    iconProps={{ iconName: 'Delete', style: {marginLeft: '15px', fontSize: '20px'} }}
                    title="Delete phase"
                    className={deleteIconButtonStyle}
                />
            </Stack>
            <div className={listIssueContainerClassName(props.backgroundColor)}>
                {issues.map((issue: IIssueShallow, index: number) => (
                    <div key={index} className={issueContainerClassName}>
                        <span className={issueTitleClassName}>{issue.title}</span>
                        <button className={primaryButtonClassName}>Edit</button>
                    </div>
                ))}
            </div>
            <button className={primaryButtonClassName}>Add new issue</button>
        </Stack>
    );
};