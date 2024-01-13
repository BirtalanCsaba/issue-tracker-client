import { Icon, IconButton, Stack, TextField } from "@fluentui/react";
import React from "react";
import { IKanban } from "../../Models/kanban";
import { KanbanService } from "../../Utils/services";
import { useNavigate } from "react-router-dom";
import { IPhase } from "../../Models/phase";
import { PhaseComponent } from "../../Components/Phase/phase";
import { buttonClassName, buttonsMenuContainerClassName, iconStyle, kanbanContainerClassName, phaseColors, phaseContainerClassName, phaseItemClassName, titleClassName } from "./kanbanPage.styles";
import { AddPhaseModal } from "../../Components/AddPhaseModal/addPhaseModal";
import { KanbanSettingsModal } from "../../Components/KanbanSettingsModal/kanbanSettingsModal";
import { KanbanRole } from "../../Enums/kanbanRole";

const examplePhases: IPhase[] = [
    {
        id: '1',
        title: 'Developing',
        issues: [
            {
                issueId: '1',
                title: 'Problem 1'
            },
            {
                issueId: '2',
                title: 'Problem 2'
            },
            {
                issueId: '3',
                title: 'Problem 3'
            }]

    },
    {
        id: '2',
        title: 'Testing',
        issues: [
            {
                issueId: '1',
                title: 'Problem 1'
            },
            {
                issueId: '2',
                title: 'Problem 2'
            }]

    },
    {
        id: '3',
        title: 'Consulting',
        issues: [
            {
                issueId: '1',
                title: 'Problem 1'
            },
            {
                issueId: '2',
                title: 'Problem 2'
            },
            {
                issueId: '3',
                title: 'Problem 3'
            }]

    },
    {
        id: '4',
        title: 'Implementing',
        issues: [
            {
                issueId: '1',
                title: 'Problem 1'
            },
            {
                issueId: '2',
                title: 'Problem 2'
            }]

    }
];


export const KanbanPage = (): JSX.Element => {
    const [kanban, setKanban] = React.useState<IKanban>();
    const [phases, setPhases] = React.useState<IPhase[]>([]);
    const [isAddPhaseModalOpen, setIsAddPhaseModalOpen] = React.useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const navigate = useNavigate();

    const getKanbanIdFromURL = (): number => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const idAsString: string | null = params.get("id");
        if (idAsString === null || idAsString === undefined)
            return -1;

        return parseInt(idAsString);
    };

    React.useEffect(() => {
        KanbanService.ReadKanbanById(getKanbanIdFromURL())
            .then(function (response) {
                setKanban(response.data);
                setPhases(examplePhases);
            })
            .catch(function (error) {
                console.log(error);
            })

        setIsLoading(false);
    }, []);

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
                        onAddedPhase={(newPhase: IPhase) => {setPhases([...phases, newPhase])}}
                        />
                    <KanbanSettingsModal
                        kanban={kanban}
                        isOpen={isSettingsModalOpen}
                        onClose={() => setIsSettingsModalOpen(false)}
                        onUpdatedKanban={(newKanban: IKanban) => setKanban(newKanban)}
                    />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 20 }} onDrop={e => console.log(e)}>
                    {phases.map((phase: IPhase, index: number) => {
                        return (
                            <div
                                key={index}
                                className={phaseItemClassName}
                                draggable={true}
                            >
                                <PhaseComponent phase={phase} backgroundColor={phaseColors[index % phaseColors.length]} />
                            </div>
                        )
                    })}
                </Stack>
            </Stack>
    )
};