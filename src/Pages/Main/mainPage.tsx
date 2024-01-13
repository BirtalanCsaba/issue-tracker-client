import { Icon, Stack } from "@fluentui/react";
import React from "react";
import { CreateKanbanModal } from "../../Components/CreateKanbanModal/createKanbanModal";
import { KanbanShallow } from "../../Components/KanbanShallow/kanbanShallow";
import { IKanbanShallow } from "../../Models/kanbanShallow";
import { KanbanService } from "../../Utils/services";
import { iconStyle } from "../Kanban/kanbanPage.styles";
import { buttonClassName, menuContainerStyle, titleStyle } from "./mainPage.styles";

export const MainPage = (): JSX.Element => {
    const [allKanbans, setAllKanbans] = React.useState<IKanbanShallow[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        KanbanService.ReadAllKanbansByCurrentUser()
            .then(function (response) {
                setAllKanbans(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
            })

    }, []);

    const onDeleteKanban = (kanbanId: number): void => {
        const kanbanIndex: number = allKanbans.findIndex((kanban: IKanbanShallow) => kanban.id === kanbanId);
        const newKanbans = [...allKanbans];
        newKanbans.splice(kanbanIndex, 1);
        setAllKanbans(newKanbans);
    };

    return (
        <Stack>
            <div style={titleStyle}>
                Kanbans that you are part of
            </div>
            <Stack style={menuContainerStyle} horizontal horizontalAlign="end">
                <button className={buttonClassName} onClick={() => { setIsModalOpen(true) }}>
                    <Icon
                        iconName="Add"
                        style={iconStyle}
                    />
                    Create Kanban
                </button>
            </Stack>
            <CreateKanbanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreatedKanban={(newKanbanCreated: IKanbanShallow) => setAllKanbans([...allKanbans, newKanbanCreated])}
            />
            <Stack>
                {!isLoading && allKanbans.map((kanban: IKanbanShallow) => {
                    return (
                        <KanbanShallow
                            key={`Kanban_${kanban.id}`}
                            kanbanShallow={kanban}
                            onDeleteKanban={onDeleteKanban}
                        />
                    )
                })}
            </Stack>
        </Stack>
    );
};