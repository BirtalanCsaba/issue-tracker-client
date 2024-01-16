import { Icon, Stack } from "@fluentui/react";
import React from "react";
import { AddPhaseModal } from "../../Components/AddPhaseModal/addPhaseModal";
import { KanbanSettingsModal } from "../../Components/KanbanSettingsModal/kanbanSettingsModal";
import { PhaseComponent } from "../../Components/Phase/phase";
import { KanbanRole } from "../../Enums/kanbanRole";
import { IKanban } from "../../Models/kanban";
import { IPhase } from "../../Models/phase";
import { IUser } from "../../Models/user";
import { comparePhases, getFullNameUser } from "../../Utils/functions";
import { KanbanService, PhasesService, UserService } from "../../Utils/services";
import { buttonClassName, buttonsMenuContainerClassName, iconStyle, kanbanContainerClassName, phaseColors, phaseItemClassName, titleClassName } from "./kanbanPage.styles";
import { IAddExtremityPhaseDTO } from "../../DTO/addExtremetyPhaseDTO";
import { IInsertPhaseDTO } from "../../DTO/insertPhaseDTO";
import { useNavigate } from "react-router-dom";

export const KanbanPage = (): JSX.Element => {
    const [kanban, setKanban] = React.useState<IKanban>();
    const [phases, setPhases] = React.useState<IPhase[]>([]);
    const [isAddPhaseModalOpen, setIsAddPhaseModalOpen] = React.useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<IUser>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [draggingPhase, setDraggingPhase] = React.useState<IPhase | null>(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        KanbanService.ReadKanbanById(getKanbanIdFromURL())
            .then(function (response) {
                setKanban(response.data);
                let initialPhases: IPhase[] = [...response.data.phase];
                initialPhases = initialPhases.sort(comparePhases);
                setPhases(initialPhases);
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

    const onAddedPhase = (newPhase: IPhase): void => {
        let newPhases: IPhase[] = [...phases, newPhase];
        newPhases = newPhases.sort(comparePhases);
        setPhases(newPhases);
        window.location.reload();
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: IPhase) => {
        setDraggingPhase(item);
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingPhase(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: IPhase) => {
        if (!draggingPhase) return;

        let newPhases = [...phases];

        const currentIndex = newPhases.findIndex((phase: IPhase) => phase.id === draggingPhase.id);
        const targetIndex = newPhases.findIndex((phase: IPhase) => phase.id === targetItem.id);

        if (currentIndex === targetIndex)
            return;

        if (currentIndex === -1 || targetIndex === -1)
            return;

        if (targetIndex === 0) {
            const addPhaseDTO: IAddExtremityPhaseDTO = {
                toBeInserted: phases[currentIndex].id
            };

            PhasesService.AddFirstPhase(addPhaseDTO)
                .then(function (response) {
                    newPhases.splice(currentIndex, 1);
                    newPhases.splice(targetIndex, 0, draggingPhase);
                    setPhases(newPhases);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        else if (targetIndex === phases.length - 1) {
            const addPhaseDTO: IAddExtremityPhaseDTO = {
                toBeInserted: phases[currentIndex].id
            };

            PhasesService.AddLastPhase(addPhaseDTO)
                .then(function (response) {
                    newPhases.splice(currentIndex, 1);
                    newPhases.splice(targetIndex, 0, draggingPhase);
                    setPhases(newPhases);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        else {
            const insertPhaseDTO: IInsertPhaseDTO = {
                firstPhase: targetIndex < currentIndex ? phases[targetIndex - 1].id : phases[targetIndex].id,
                toBeInserted: phases[currentIndex].id,
                secondPhase: targetIndex < currentIndex ? phases[targetIndex].id : phases[targetIndex + 1].id
            };

            PhasesService.InsertPhase(insertPhaseDTO)
                .then(function (response) {
                    newPhases.splice(currentIndex, 1);
                    newPhases.splice(targetIndex, 0, draggingPhase);
                    setPhases(newPhases);
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        window.location.reload();
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
                    <button className={buttonClassName} onClick={() => { navigate("/issueTrackerApp") }}>
                        <Icon
                            iconName="AllApps"
                            style={iconStyle}
                        />
                        Your Kanbans
                    </button>
                    <AddPhaseModal
                        isOpen={isAddPhaseModalOpen}
                        kanbanId={getKanbanIdFromURL()}
                        onClose={() => setIsAddPhaseModalOpen(false)}
                        onAddedPhase={onAddedPhase}
                    />
                    <KanbanSettingsModal
                        kanban={kanban}
                        isOpen={isSettingsModalOpen}
                        onClose={() => setIsSettingsModalOpen(false)}
                        onUpdatedKanban={(newKanban: IKanban) => setKanban(newKanban)}
                        userRole={getUserRole()}
                    />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 20 }}>
                    {phases.map((phase: IPhase, index: number) => {
                        return (
                            <div
                                key={phase.id}
                                className={phaseItemClassName}
                                draggable={getUserRole() !== KanbanRole.PARTICIPANT}
                                onDragStart={(e) =>
                                    handleDragStart(e, phase)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, phase)}
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