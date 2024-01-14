import { Icon, IconButton, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IKanban } from "../../Models/kanban";
import { KanbanService, UserService } from "../../Utils/services";
import { useNavigate } from "react-router-dom";
import { IPhase } from "../../Models/phase";
import { PhaseComponent } from "../../Components/Phase/phase";
import { buttonClassName, buttonsMenuContainerClassName, iconStyle, kanbanContainerClassName, phaseColors, phaseContainerClassName, phaseItemClassName, titleClassName } from "./kanbanPage.styles";
import { AddPhaseModal } from "../../Components/AddPhaseModal/addPhaseModal";
import { KanbanSettingsModal } from "../../Components/KanbanSettingsModal/kanbanSettingsModal";
import { KanbanRole } from "../../Enums/kanbanRole";
import { IUser } from "../../Models/user";
import { getFullNameUser } from "../../Utils/functions";

export const KanbanPage = (): JSX.Element => {
    const [kanban, setKanban] = React.useState<IKanban>();
    const [phases, setPhases] = React.useState<IPhase[]>([]);
    const [isAddPhaseModalOpen, setIsAddPhaseModalOpen] = React.useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<IUser>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        KanbanService.ReadKanbanById(getKanbanIdFromURL())
            .then(function (response) {
                setKanban(response.data);
                setPhases(response.data.phase);
                UserService.GetUserInfo()
                    .then(function (response) {
                        setCurrentUser(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                console.log(error);
            })

        setIsLoading(false);
    }, []);

    const getKanbanIdFromURL = (): number => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const idAsString: string | null = params.get("id");
        if (idAsString === null || idAsString === undefined)
            return -1;

        return parseInt(idAsString);
    };

    const getUserRole = (): KanbanRole => {
        if (kanban?.admins.findIndex((admin: IUser) => admin.id === currentUser?.id) !== -1)
            return KanbanRole.ADMIN;

        if (kanban?.participants.findIndex((participant: IUser) => participant.id === currentUser?.id) !== -1)
            return KanbanRole.PARTICIPANT;

        return KanbanRole.OWNER;
    };

    const handleDeletePhase = (phaseId: number): void => {
        const phaseIndex: number = phases.findIndex((phase: IPhase) => phase.id === phaseId);
        if (phaseId === -1)
            return;

        const newPhases = [...phases];
        newPhases.splice(phaseIndex, 1);
        setPhases(newPhases);
        if (kanban !== undefined)
            setKanban({ ...kanban, phase: newPhases });
    };

    const getPhaseBackgroundColor = (title: string): string => {
        const colorIndex: number = (title.length + title.charCodeAt(0) + title.charCodeAt(title.length - 1)) % phaseColors.length;
        return phaseColors[colorIndex];
    };

    const getAllKanbanUsers = (): IUser[] => {
        if (kanban === undefined || currentUser === undefined)
            return [];
        return [...kanban.admins, ...kanban.participants, currentUser].sort((user1: IUser, user2: IUser) => getFullNameUser(user1).localeCompare(getFullNameUser(user2)));
    };

    return (
        isLoading || kanban === undefined
            ? <div></div>
            : <Stack className={kanbanContainerClassName}>
                <div className={titleClassName}>{kanban.title} Dashboard</div>
                <Stack horizontal horizontalAlign="start" className={buttonsMenuContainerClassName}>
                    <button className={buttonClassName} onClick={() => { setIsAddPhaseModalOpen(true) }}>
                        <Icon
                            iconName="Add"
                            style={iconStyle}
                        />
                        Add New Phase
                    </button>
                    <button className={buttonClassName} onClick={() => { setIsSettingsModalOpen(true) }}>
                        <Icon
                            iconName="Settings"
                            style={iconStyle}
                        />
                        Settings
                    </button>
                    <AddPhaseModal
                        isOpen={isAddPhaseModalOpen}
                        kanbanId={getKanbanIdFromURL()}
                        onClose={() => setIsAddPhaseModalOpen(false)}
                        onAddedPhase={(newPhase: IPhase) => { setPhases([...phases, newPhase]) }}
                    />
                    <KanbanSettingsModal
                        kanban={kanban}
                        isOpen={isSettingsModalOpen}
                        onClose={() => setIsSettingsModalOpen(false)}
                        onUpdatedKanban={(newKanban: IKanban) => setKanban(newKanban)}
                        userRole={getUserRole()}
                    />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 20 }} onDrop={e => console.log(e)}>
                    {phases.map((phase: IPhase, index: number) => {
                        return (
                            <div
                                key={phase.id}
                                className={phaseItemClassName}
                                draggable={true}
                            >
                                <PhaseComponent
                                    phase={phase}
                                    onDeletePhase={handleDeletePhase}
                                    userRole={getUserRole()}
                                    backgroundColor={getPhaseBackgroundColor(phase.title)}
                                    kanbanUsers={getAllKanbanUsers()}
                                    />
                            </div>
                        )
                    })}
                </Stack>
            </Stack>
    )
};