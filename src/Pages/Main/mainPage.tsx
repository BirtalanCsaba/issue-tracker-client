import { DefaultButton, IconButton, Modal, Stack, StackItem, TextField } from "@fluentui/react";
import React from "react";
import { IKanbanShallow } from "../../Models/kanbanShallow";
import { KanbanService } from "../../Utils/services";
import { KanbanShallow } from "../../Components/KanbanShallow/kanbanShallow";
import { containerStyle, createButtonClassName, menuContainerStyle, modalContainerClassName, titleStyle } from "./mainPage.styles";

export const MainPage = (): JSX.Element => {
    const [allKanbans, setAllKanbans] = React.useState<IKanbanShallow[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [newKanbanTitle, setNewKanbanTitle] = React.useState<string>('');
    const [newKanbanDescription, setNewKanbanDescription] = React.useState<string>('');

    React.useEffect(() => {
        // KanbanService.ReadAllKanbansByCurrentUser()
        //     .then(function (response) {
        //         setAllKanbans(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        //     .finally(function () {
        //         setIsLoading(false);
        //     })

        setAllKanbans(KanbanService.ReadAllKanbansByCurrentUser());
        setIsLoading(false);
    }, []);

    const handleModalClose = (): void => {
        setIsModalOpen(false);
        setNewKanbanTitle('');
        setNewKanbanDescription('');
    };

    const handleCreateKanban = (): void => {
        console.log('Creating new Kanban with title:', newKanbanTitle);
        setIsModalOpen(false);
    };

    return (
        <Stack style={containerStyle}>
            <div style={titleStyle}>
                Kanbans that you are part of
            </div>
            <Stack style={menuContainerStyle} horizontal horizontalAlign="end">
                <IconButton
                    iconProps={{ iconName: 'Add' }}
                    title="Create Kanban"
                    onClick={() => setIsModalOpen(true)}
                />
                <span>Create</span>
            </Stack>
            <Modal
                isOpen={isModalOpen}
                onDismiss={handleModalClose}
                isBlocking={false}
                containerClassName={modalContainerClassName}
            >
                <Stack>
                    <TextField
                        label="Title"
                        value={newKanbanTitle}
                        onChange={(event, newValue) => setNewKanbanTitle(newValue || '')}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={5}
                        value={newKanbanDescription}
                        onChange={(event, newValue) => setNewKanbanDescription(newValue || '')}
                    />
                    <DefaultButton className={createButtonClassName} onClick={handleCreateKanban} text="Create" />
                </Stack>
            </Modal>
            <Stack>
                {!isLoading && allKanbans.map((kanban: IKanbanShallow) => {
                    return (
                        <KanbanShallow
                            kanbanShallow={kanban}
                        />
                    )
                })}
            </Stack>
        </Stack>
    );
};