import { Dropdown, IDropdownOption, Stack, StackItem, TextField } from "@fluentui/react";
import { IIssueItemProps } from "./issueItem.types";
import React from "react";
import { IssuesService } from "../../Utils/services";
import { IReadIssueDTO } from "../../DTO/readIssueDTO";
import { Priority } from "../../Enums/priority";
import { containerStyle, descriptionStyle, selectedTabStyle, unselectedTabStyle } from "./issueItem.styles";
import { IIsue } from "../../Models/issue";

export const IssueItem = (props: IIssueItemProps): JSX.Element => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [hoursWorked, setHoursWorked] = React.useState<number>(0);
    const [priority, setPriority] = React.useState<Priority>(Priority.Priority1);
    const [notes, setNotes] = React.useState<string>('');
    const [isDescriptionTabSelected, setIsDescriptionTabSelected] = React.useState<boolean>(true);

    React.useEffect(() => {
        const readIssueDTO: IReadIssueDTO = {
            jwt: 'some jwt',
            issueId: props.issueId
        };

        // IssuesService.ReadIssue(readIssueDTO)
        //     .then(function (response) {
        //         setTitle(response.data.title);
        //         setDescription(response.data.description);
        //         setHoursWorked(response.data.hoursWorked);
        //         setPriority(response.data.priority);
        //         setNotes(response.data.notes);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        const issue: IIsue = IssuesService.ReadIssue(readIssueDTO);
        setTitle(issue.title);
        setDescription(issue.description);
        setHoursWorked(issue.hoursWorked);
        setPriority(issue.priority);
        setNotes(issue.notes);
    }, []);

    const getDropdownOptionKey = (priority: Priority): string => {
        return `key_priority_${priority}`;
    };

    const priorityOptions: IDropdownOption[] = Object.values(Priority).map((p: Priority) => ({
        key: getDropdownOptionKey(p),
        text: p
    }));

    const handleDescriptionTabButtonClicked = (): void => {
        if (!isDescriptionTabSelected)
            setIsDescriptionTabSelected(true);
    };

    const handleNotesTabButtonClicked = (): void => {
        if (isDescriptionTabSelected)
            setIsDescriptionTabSelected(false);
    };

    const onChangedPriority = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        if (option) {
            setPriority(option.text as Priority);
        }
    };

    return (
        <Stack style={containerStyle}>
            <Stack horizontal horizontalAlign="space-between">
                    <TextField
                        type="text"
                        multiline={false}
                        value={title}
                        onChange={(event, newValue?: string) => newValue && setTitle(newValue)}
                    />
                    <button>Save</button>
            </Stack>
            <StackItem align="end">
                <button onClick={handleDescriptionTabButtonClicked} style={isDescriptionTabSelected ? selectedTabStyle : unselectedTabStyle}>Description</button>
                <button onClick={handleNotesTabButtonClicked} style={isDescriptionTabSelected ? unselectedTabStyle : selectedTabStyle}>Notes</button>
            </StackItem>
            {isDescriptionTabSelected
                ? <Stack horizontal horizontalAlign="space-between">
                    <TextField
                        type="text"
                        multiline={true}
                        style={descriptionStyle}
                        value={description}
                        onChange={(event, newValue?: string) => newValue && setDescription(newValue)}
                    />
                    <StackItem style={{ float: "right" }}>
                        <Dropdown
                            placeholder="Select Priority"
                            label="Priority"
                            options={priorityOptions}
                            onChange={onChangedPriority}
                            multiSelect={false}
                            defaultSelectedKey={getDropdownOptionKey(priority)}
                        />
                        <TextField
                            type="number"
                            multiline={false}
                            value={hoursWorked.toString()}
                            label="Hours Worked"
                            onChange={(event, newValue?: string) => newValue && setHoursWorked(parseInt(newValue))}
                        />
                    </StackItem>
                </Stack>
                : <Stack>
                    <TextField
                        type="text"
                        multiline={true}
                        value={notes}
                        label="Notes"
                        onChange={(event, newValue?: string) => newValue && setNotes(newValue)}
                    />
                </Stack>
            }
        </Stack>
    );
};