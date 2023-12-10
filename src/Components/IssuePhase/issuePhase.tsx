import { Stack, TextField } from "@fluentui/react";
import React from "react";
import { IIsuePhaseProps } from "./issuePhase.types";
import { IReadIssuePhaseDTO } from "../../DTO/readIssuePhase";
import { IIssueShallow } from "../../Models/issueShallow";
import { IssuePhasesService } from "../../Utils/services";
import { IIssuePhase } from "../../Models/issuePhase";
import { issueContainer, listIssueContainerStyle, phaseContainerStyle, topSectionStyle } from "./issuePhase.styles";

export const IssuePhaseComponent = (props: IIsuePhaseProps): JSX.Element => {
    const [name, setName] = React.useState<string>('');
    const [issues, setIssues] = React.useState<IIssueShallow[]>([]);

    React.useEffect(() => {
        const readIssuePhaseDTO: IReadIssuePhaseDTO = {
            jwt: 'some jwt',
            issuePhaseId: props.issuePhaseId
        };

        // IssuePhasesService.ReadIssuePhase(readIssuePhaseDTO)
        //     .then(function (response) {
        //         setName(response.data.name);
        //         setIssues(response.data.issues);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        const issuePhase: IIssuePhase = IssuePhasesService.ReadIssuePhase(readIssuePhaseDTO);
        setName(issuePhase.name);
        setIssues(issuePhase.issues);
    }, []);

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