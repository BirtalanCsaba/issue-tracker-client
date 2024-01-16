import { DatePicker, Dropdown, IDropdownOption, ISelectableOption, Icon, Stack, TextField } from "@fluentui/react";
import React from "react";
import Avatar from "react-avatar";
import { IReadIssueDTO } from "../../DTO/readIssueDTO";
import { Priority } from "../../Enums/priority";
import { IIssue } from "../../Models/issue";
import { IUser } from "../../Models/user";
import { buttonClassName, iconStyle } from "../../Pages/Kanban/kanbanPage.styles";
import { getColorByFullName, getFullNameUser, getInitialsFromUser } from "../../Utils/functions";
import { IssuesService } from "../../Utils/services";
import { datePickerClassName, descriptionTextStyles, dropdownPriorityClassName, headerSectionClassName, modalContainerClassName, titleInputStyles } from "./issueItem.styles";
import { IIssueItemProps } from "./issueItem.types";
import { ICreateIssueDTO } from "../../DTO/createIssueDTO";
import { IUpdateIssueDTO } from "../../DTO/updateIssueDTO";

export const IssueItem = (props: IIssueItemProps): JSX.Element => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [priority, setPriority] = React.useState<Priority>(Priority.Priority3);
    const [allUsers, setAllUsers] = React.useState<IUser[]>(props.kanbanUsers);
    const [selectedContributor, setSelectedContributor] = React.useState<number>(-1);
    const [expectedDeadline, setExpectedDeadline] = React.useState<Date>(new Date());

    React.useEffect(() => {
        if (props.issueId === -1) {
            setTitle('');
            setDescription('');
            setPriority(Priority.Priority3);
            setSelectedContributor(-1);
            setExpectedDeadline(new Date());
        }

        if (props.issueId !== -1 && props.issue !== undefined) {
            setTitle(props.issue.title);
            setDescription(props.issue.description);
            setPriority(props.issue.priority);
            setSelectedContributor(props.issue.assignedUser);
            setExpectedDeadline(new Date(props.issue.expectedDeadline));
        }
    }, [props.issueId, props.issue]);

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

    const dropdownOptions: IDropdownOption[] = React.useMemo(() => {
        return allUsers.map((user) => ({
            key: user.id,
            text: getFullNameUser(user),
            data: getInitialsFromUser(user)
        }))
    }, [allUsers]);

    const renderSelectedTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
        if (options === undefined)
            return <div></div>

        const selectedPeople: IUser[] = options.map(option => allUsers.find(p => p.id === option.key) as IUser);
        return (
            <div>
                {selectedPeople.map((person, index) => (
                    <span key={person?.id} style={{ marginRight: index < selectedPeople.length - 1 ? '8px' : '0' }}>
                        <Avatar style={{ marginRight: '5px' }} name={getInitialsFromUser(person)} round={true} size="30px" color={getColorByFullName(getFullNameUser(person))} />
                        {getFullNameUser(person)}
                    </span>
                ))}
            </div>
        );
    };

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

    const handleAssignedUserChange = (item: IDropdownOption | any): void => {
        setSelectedContributor(item.key);
    };

    const handleOnEstimatedDeadlineChange = (date: Date | null | undefined): void => {
        if (date === null || date === undefined)
            return;
        setExpectedDeadline(date);
    };

    const handleCreateIssue = (): void => {
        const newIssue: ICreateIssueDTO = {
            title: title,
            description: description,
            priority: parseInt(priority),
            expectedDeadline: expectedDeadline,
            assignedUser: selectedContributor === -1 ? null : selectedContributor,
            phaseId: props.phaseId
        };

        IssuesService.CreateIssue(newIssue)
            .then((function (response) {
                props.onSavedIssue(response.data);
            }))
            .catch(function (error) {
                console.log(error)
            });
    };

    const handleUpdateIssue = (): void => {
        const updatedIssue: IUpdateIssueDTO = {
            issueId: props.issueId,
            title: title,
            description: description,
            priority: parseInt(priority),
            expectedDeadline: expectedDeadline,
            assignedUser: selectedContributor === -1 ? null : selectedContributor,
            phaseId: props.phaseId
        };

        IssuesService.UpdateIssue(updatedIssue)
            .then((function (response) {
                props.onSavedIssue({
                    id: props.issueId,
                    title: title,
                    description: description,
                    priority: priority,
                    expectedDeadline: expectedDeadline,
                    assignedUser: selectedContributor,
                });
            }))
            .catch(function (error) {
                console.log(error)
            });
    };

    const handleSaveIssue = (): void => {
        if (props.issueId === -1)
            handleCreateIssue();

        else
            handleUpdateIssue();
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
                <button className={buttonClassName} onClick={handleSaveIssue}>
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
                        onChange={(event, option) => handleAssignedUserChange(option)}
                        style={{ marginBottom: '25px' }}
                        selectedKey={selectedContributor === -1 ? undefined : selectedContributor}
                        styles={{ title: { height: '35px', width: '400px' } }}
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
                <Stack>
                    <Dropdown
                        placeholder="Select Priority"
                        label="Priority"
                        options={priorityOptions}
                        onChange={onChangedPriority}
                        multiSelect={false}
                        defaultSelectedKey={getDropdownOptionKey(priority)}
                        className={dropdownPriorityClassName}
                    />
                    <DatePicker
                        label="Expected Deadline"
                        className={datePickerClassName}
                        value={expectedDeadline}
                        onSelectDate={handleOnEstimatedDeadlineChange}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};