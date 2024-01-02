import { Dropdown, IDropdownOption, ISelectableOption, Icon, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IReadIssueDTO } from "../../DTO/readIssueDTO";
import { Priority } from "../../Enums/priority";
import { IIsue } from "../../Models/issue";
import { buttonClassName, iconStyle } from "../../Pages/Kanban/kanbanPage.styles";
import { IssuesService } from "../../Utils/services";
import { descriptionTextStyles, dropdownPriorityClassName, headerSectionClassName, modalContainerClassName, textFieldHoursWorkedStyles, titleInputStyles } from "./issueItem.styles";
import { IIssueItemProps } from "./issueItem.types";
import Avatar from "react-avatar";
import { getColorByFullName } from "../../Utils/functions";

export const IssueItem = (props: IIssueItemProps): JSX.Element => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [hoursWorked, setHoursWorked] = React.useState<number>(0);
    const [priority, setPriority] = React.useState<Priority>(Priority.Priority3);

    React.useEffect(() => {
        const readIssueDTO: IReadIssueDTO = {
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

        if (props.issueId !== '') {
            const issue: IIsue = IssuesService.ReadIssue(readIssueDTO);
            setTitle(issue.title);
            setDescription(issue.description);
            setHoursWorked(issue.hoursWorked);
            setPriority(issue.priority);
        }
    }, []);

    const getDropdownOptionKey = (priority: Priority): string => {
        return `key_priority_${priority}`;
    };

    const priorityOptions: IDropdownOption[] = Object.values(Priority).map((p: Priority) => ({
        key: getDropdownOptionKey(p),
        text: p
    }));

    const onChangedPriority = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        if (option) {
            setPriority(option.text as Priority);
        }
    };

    const peopleList: { id: number; firstName: string; lastName: string; color: string }[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', color: '#FF4500' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', color: '#0078d4' },
        { id: 3, firstName: 'Alex', lastName: 'Smith', color: '#FF4500' },
        { id: 4, firstName: 'June', lastName: 'Carter', color: '#0078d4' },
        { id: 5, firstName: 'Joe', lastName: 'Holder', color: '#FF4500' },
        { id: 6, firstName: 'Tom', lastName: 'Shelby', color: '#0078d4' },
    ];

    const getInitialsFromPerson = (person: any): string => {
        return `${person.firstName.charAt(0)} ${person.lastName.charAt(0)}`;
    };

    const getFullNamePerson = (person: any): string => {
        return `${person.firstName} ${person.lastName}`;
    };

    const dropdownOptions: IDropdownOption[] = peopleList.map((person) => ({
        key: person.id.toString(),
        text: getFullNamePerson(person),
        data: getInitialsFromPerson(person)
    }));

    const renderOption = (option: ISelectableOption | undefined): JSX.Element => {
        return (
            <Stack horizontal style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar name={option?.data} round={true} size="30px" color={getColorByFullName(option?.text || '')} />
                <div style={{ marginLeft: '10px' }}>
                    {option?.text}
                </div>
            </Stack>
        );
    };

    const renderSelectedTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
        if (options === undefined)
            return <div></div>

        const selectedPeople = options.map(option => peopleList.find(p => p.id.toString() === option.key));
        return (
            <div>
                {selectedPeople.slice(0, 3).map((person, index) => (
                    <span key={person?.id} style={{ marginRight: index < selectedPeople.length - 1 ? '8px' : '0' }}>
                        <Avatar style={{marginRight: '5px'}} name={getInitialsFromPerson(person)} round={true} size="30px" color={getColorByFullName(getFullNamePerson(person))} />
                        {getFullNamePerson(person)}
                    </span>
                ))}
                {selectedPeople.length > 3 && "..."}
            </div>
        );
    };

    return (
        <Stack className={modalContainerClassName}>
            <Stack horizontal horizontalAlign="space-between" className={headerSectionClassName}>
                <TextField
                    type="text"
                    multiline={false}
                    value={title}
                    onChange={(event, newValue?: string) => setTitle(newValue || '')}
                    styles={titleInputStyles}
                    placeholder="Title for new issue"
                />
                <button className={buttonClassName}>
                    <Icon
                        iconName="Save"
                        style={iconStyle}
                    />
                    Save
                </button>
            </Stack>
            <Stack horizontal horizontalAlign="space-between">
                <Stack>
                    <Dropdown
                        placeholder="Assign a person"
                        options={dropdownOptions}
                        onRenderOption={renderOption}
                        onRenderTitle={renderSelectedTitle}
                        style={{ marginBottom: '25px' }}
                        multiSelect={true}
                        styles={{title: {height: '35px', width: '400px'}}}
                    />
                    <TextField
                        type="text"
                        multiline={true}
                        value={description}
                        onChange={(event, newValue?: string) => setDescription(newValue || '')}
                        styles={descriptionTextStyles}
                        placeholder="Description"
                    />
                </Stack>
                <Stack horizontalAlign="end">
                    <Dropdown
                        placeholder="Select Priority"
                        label="Priority"
                        options={priorityOptions}
                        onChange={onChangedPriority}
                        multiSelect={false}
                        defaultSelectedKey={getDropdownOptionKey(priority)}
                        className={dropdownPriorityClassName}
                    />
                    <TextField
                        type="number"
                        multiline={false}
                        value={hoursWorked.toString()}
                        label="Hours Worked"
                        onChange={(event, newValue?: string) => newValue && setHoursWorked(parseInt(newValue))}
                        styles={textFieldHoursWorkedStyles}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};