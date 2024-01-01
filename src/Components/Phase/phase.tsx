import { Stack, TextField } from "@fluentui/react";
import React from "react";
import { IPhaseProps } from "./phase.types";
import { IReadIssuePhaseDTO } from "../../DTO/readIssuePhase";
import { IIssueShallow } from "../../Models/issueShallow";
import { IssuePhasesService } from "../../Utils/services";
import { IPhase } from "../../Models/phase";
import { issueContainer, listIssueContainerStyle, phaseContainerStyle, topSectionStyle } from "./phase.styles";

export const PhaseComponent = (props: IPhaseProps): JSX.Element => {
    const [name, setName] = React.useState<string>(props.phase.name);
    const [issues, setIssues] = React.useState<IIssueShallow[]>(props.phase.issues);

    return (
        <Stack style={phaseContainerStyle}>
            <Stack horizontal horizontalAlign="space-between" style={topSectionStyle}>
                <TextField
                    type="text"
                    multiline={false}
                    value={name}
                    onChange={(event, newValue?: string) => newValue && setName(newValue)}
                />
                <button>Save</button>
            </Stack>
            <div style={listIssueContainerStyle}>
                {issues.map((issue: IIssueShallow) => (
                    <div style={issueContainer}>
                        <span>{issue.title}</span>
                        <button>Edit</button>
                    </div>
                ))}
            </div>
            <button>Add new issue</button>
        </Stack>
    );
};