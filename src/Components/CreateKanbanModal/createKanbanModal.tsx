import { DefaultButton, Dropdown, IDropdownOption, ISelectableOption, Label, Modal, Stack, TextField } from "@fluentui/react";
import React from "react";
import Avatar from "react-avatar";
import { ICreateKanbanDTO } from "../../DTO/createKanbanDTO";
import { KanbanRole } from "../../Enums/kanbanRole";
import { IKanbanShallow } from "../../Models/kanbanShallow";
import { IUser } from "../../Models/user";
import { getColorByFullName, getFullNameUser, getInitialsFromUser } from "../../Utils/functions";
import { KanbanService, UserService } from "../../Utils/services";
import { ErrorMessageStyle, createButtonClassName, dropdownStyles, modalContainerClassName } from "./createKanbanModal.styles";
import { ICreateKanbanModalProps } from "./createKanbanModal.types";

export const CreateKanbanModal = (props: ICreateKanbanModalProps): JSX.Element => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [allUsers, setAllUsers] = React.useState<IUser[]>([]);
    const [selectedAdmins, setSelectedAdmins] = React.useState<IDropdownOption[]>([]);
    const [selectedParticipants, setSelectedParticipants] = React.useState<IDropdownOption[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
        UserService.ReadAllUsers()
            .then(function (response) {
                setAllUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        setErrorMessage('');
    }, [title, description, selectedAdmins, selectedParticipants]);

    const handleCreateKanban = (): void => {
        let newErrorMessage: string = "";

        if (title.trim() === "")
            newErrorMessage += "The title can't be empty. "

        if (selectedAdmins.some((admin: IDropdownOption) => selectedParticipants.findIndex((participant: IDropdownOption) => admin.key === participant.key) !== -1))
            newErrorMessage += "A user can't be selected as admin and as participant.";

        if (newErrorMessage !== "") {
            setErrorMessage(newErrorMessage);
            return;
        }

        const kanban: ICreateKanbanDTO = {
            title: title.trim(),
            description: description.trim(),
            admins: selectedAdmins.map((option) => option.key as number),
            participants: selectedParticipants.map((option) => option.key as number)
        };

        KanbanService.CreateKanban(kanban)
            .then(function (response) {
                const newKanban: IKanbanShallow = response.data;
                newKanban.role = KanbanRole.OWNER;
                props.onCreatedKanban(newKanban);
            })
            .catch(function (error) {
                console.log(error);
            });

        onModalClose();
    };

    const getDropdownOptions = (): IDropdownOption[] => {
        return allUsers.map((user) => ({
            key: user.id,
            text: getFullNameUser(user),
            data: getInitialsFromUser(user)
        }))
    };

    const renderSelectedTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
        if (options === undefined)
            return <div></div>

        const selectedPeople: IUser[] = options.map(option => allUsers.find(p => p.id === option.key) as IUser);
        return (
            <div>
                {selectedPeople.slice(0, 3).map((person, index) => (
                    <span key={person?.id} style={{ marginRight: index < selectedPeople.length - 1 ? '8px' : '0' }}>
                        <Avatar style={{ marginRight: '5px' }} name={getInitialsFromUser(person)} round={true} size="30px" color={getColorByFullName(getFullNameUser(person))} />
                        {getFullNameUser(person)}
                    </span>
                ))}
                {selectedPeople.length > 3 && "..."}
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

    const handleDropdownAdminsChange = (item: IDropdownOption | any): void => {
        const indexOption: number = selectedAdmins.findIndex((option) => option.key === item.key);
        const newSelectedAdmins: IDropdownOption[] = [...selectedAdmins];
        if (indexOption !== -1) {
            newSelectedAdmins.splice(indexOption, 1);
        }
        else {
            newSelectedAdmins.push(item);
        }
        setSelectedAdmins(newSelectedAdmins);
    };

    const handleDropdownParticipantsChange = (item: IDropdownOption | any): void => {
        const indexOption: number = selectedParticipants.findIndex((option) => option.key === item.key);
        const newSelectedParticipants: IDropdownOption[] = [...selectedParticipants];
        if (indexOption !== -1) {
            newSelectedParticipants.splice(indexOption, 1);
        }
        else {
            newSelectedParticipants.push(item);
        }
        setSelectedParticipants(newSelectedParticipants);
    };

    const onModalClose = (): void => {
        setTitle('');
        setDescription('');
        setSelectedAdmins([]);
        setSelectedParticipants([]);
        setErrorMessage('');
        props.onClose();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onDismiss={onModalClose}
            isBlocking={false}
            containerClassName={modalContainerClassName}
        >
            {isLoading
                ? <div></div>
                :
                <Stack>
                    {errorMessage !== '' &&
                        <Label style={ErrorMessageStyle}>
                            {errorMessage}
                        </Label>
                    }
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(event, newValue) => setTitle(newValue || '')}
                    />
                    <Dropdown
                        placeholder="Select users"
                        label="Admins"
                        options={getDropdownOptions()}
                        onRenderOption={renderOption}
                        onRenderTitle={renderSelectedTitle}
                        multiSelect={true}
                        styles={dropdownStyles}
                        onChange={(event, option) => handleDropdownAdminsChange(option)}
                    />
                    <Dropdown
                        placeholder="Select users"
                        label="Participants"
                        options={getDropdownOptions()}
                        onRenderOption={renderOption}
                        onRenderTitle={renderSelectedTitle}
                        style={{ marginBottom: '25px' }}
                        multiSelect={true}
                        styles={dropdownStyles}
                        onChange={(event, option) => handleDropdownParticipantsChange(option)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        value={description}
                        onChange={(event, newValue) => setDescription(newValue || '')}
                        styles={{ field: { height: '150px' } }}
                    />
                    <DefaultButton className={createButtonClassName} onClick={handleCreateKanban} text="Create" />
                </Stack>
            }
        </Modal>
    );
};