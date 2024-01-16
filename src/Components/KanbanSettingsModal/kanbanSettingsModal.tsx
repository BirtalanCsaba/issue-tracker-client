import React from "react";
import { IKanbanSettingsModalProps } from "./kanbanSettingsModal.types";
import { DefaultButton, Dropdown, IDropdownOption, ISelectableOption, Label, Modal, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { modalContainerClassName } from "./kanbanSettingsModal.styles";
import { IUser } from "../../Models/user";
import { KanbanService, UserService } from "../../Utils/services";
import { ErrorMessageStyle, createButtonClassName, dropdownStyles } from "../CreateKanbanModal/createKanbanModal.styles";
import Avatar from "react-avatar";
import { getColorByFullName, getFullNameUser, getInitialsFromUser } from "../../Utils/functions";
import { KanbanRole } from "../../Enums/kanbanRole";
import { IUpdateKanbanDTO } from "../../DTO/updateKanbanDTO";

export const KanbanSettingsModal = (props: IKanbanSettingsModalProps): JSX.Element => {
  const [title, setTitle] = React.useState<string>(props.kanban.title);
  const [description, setDescription] = React.useState<string>(props.kanban.description);
  const [allUsers, setAllUsers] = React.useState<IUser[]>([]);
  const [selectedAdmins, setSelectedAdmins] = React.useState<IUser[]>(props.kanban.admins);
  const [selectedParticipants, setSelectedParticipants] = React.useState<IUser[]>(props.kanban.participants);
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
    setTitle(props.kanban.title);
  }, [props.kanban.title]);

  React.useEffect(() => {
    setDescription(props.kanban.description);
  }, [props.kanban.description]);

  React.useEffect(() => {
    setSelectedAdmins(props.kanban.admins);
  }, [props.kanban.admins]);

  React.useEffect(() => {
    setSelectedParticipants(props.kanban.participants);
  }, [props.kanban.participants]);

  React.useEffect(() => {
    setErrorMessage('');
  }, [title, description, selectedAdmins, selectedParticipants]);

  const handleSaveKanban = (): void => {
    let newErrorMessage: string = "";

    if (title.trim() === "")
      newErrorMessage += "The title can't be empty. "

    if (selectedAdmins.some((admin: IUser) => selectedParticipants.findIndex((participant: IUser) => admin.id === participant.id) !== -1))
      newErrorMessage += "A user can't be selected as admin and as participant.";

    if (newErrorMessage !== "") {
      setErrorMessage(newErrorMessage);
      return;
    }

    const kanban: IUpdateKanbanDTO = {
      id: props.kanban.id,
      title: title.trim(),
      description: description.trim(),
      admins: selectedAdmins.map((admin) => admin.id),
      participants: selectedParticipants.map((participant) => participant.id)
    };

    KanbanService.UpdateKanban(kanban)
      .then(function (response) {
        props.onUpdatedKanban({
          id: props.kanban.id,
          title: title.trim(),
          description: description.trim(),
          owner: props.kanban.owner,
          admins: selectedAdmins,
          participants: selectedParticipants,
          phase: props.kanban.phase
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    props.onClose();
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

  const getOwner = () => {
    const fullName: string = getFullNameUser(props.kanban.owner);
    return (
      <Stack horizontal style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
        <Label>
          Owner :
        </Label>
        <Avatar style={{ marginLeft: '10px' }} name={getInitialsFromUser(props.kanban.owner)} round={true} size="30px" color={getColorByFullName(fullName)} />
        <div style={{ marginLeft: '10px' }}>
          {fullName}
        </div>
      </Stack>
    )
  }

  const handleDropdownAdminsChange = (item: IDropdownOption | any): void => {
    const indexOption: number = selectedAdmins.findIndex((admin) => admin.id === item.key);
    const newSelectedAdmins: IUser[] = [...selectedAdmins];
    if (indexOption !== -1) {
      newSelectedAdmins.splice(indexOption, 1);
    }
    else {
      newSelectedAdmins.push(allUsers.find((user: IUser) => user.id === item.key) as IUser);
    }
    setSelectedAdmins(newSelectedAdmins);
  };

  const handleDropdownParticipantsChange = (item: IDropdownOption | any): void => {
    const indexOption: number = selectedParticipants.findIndex((participant) => participant.id === item.key);
    const newSelectedParticipants: IUser[] = [...selectedParticipants];
    if (indexOption !== -1) {
      newSelectedParticipants.splice(indexOption, 1);
    }
    else {
      newSelectedParticipants.push(allUsers.find((user: IUser) => user.id === item.key) as IUser);
    }
    setSelectedParticipants(newSelectedParticipants);
  };

  const onModalClose = (): void => {
    setTitle(props.kanban.title);
    setDescription(props.kanban.description);
    setSelectedAdmins(props.kanban.admins);
    setSelectedParticipants(props.kanban.participants);
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
            readOnly={props.userRole === KanbanRole.PARTICIPANT}
          />
          <Label style={{ marginTop: '20px' }}>
            Your Role: {props.userRole}
          </Label>
          {props.userRole !== KanbanRole.OWNER &&
            getOwner()
          }
          <Dropdown
            placeholder="Select users"
            label="Admins"
            options={dropdownOptions}
            onRenderOption={renderOption}
            onRenderTitle={renderSelectedTitle}
            defaultSelectedKeys={selectedAdmins.map((admin: IUser) => admin.id)}
            multiSelect={true}
            styles={dropdownStyles}
            onChange={(event, option) => handleDropdownAdminsChange(option)}
            disabled={props.userRole !== KanbanRole.OWNER}
          />
          <Dropdown
            placeholder="Select users"
            label="Participants"
            options={dropdownOptions}
            onRenderOption={renderOption}
            onRenderTitle={renderSelectedTitle}
            defaultSelectedKeys={props.kanban.participants.map((participant: IUser) => participant.id)}
            style={{ marginBottom: '25px' }}
            multiSelect={true}
            styles={dropdownStyles}
            onChange={(event, option) => handleDropdownParticipantsChange(option)}
            disabled={props.userRole === KanbanRole.PARTICIPANT}
          />
          <TextField
            label="Description"
            multiline
            value={description}
            onChange={(event, newValue) => setDescription(newValue || '')}
            styles={{ field: { height: '150px' } }}
            readOnly={props.userRole === KanbanRole.PARTICIPANT}
          />
          {props.userRole !== KanbanRole.PARTICIPANT &&
            <DefaultButton className={createButtonClassName} onClick={handleSaveKanban} text="Save" />
          }
        </Stack>
      }
    </Modal>
  );
};