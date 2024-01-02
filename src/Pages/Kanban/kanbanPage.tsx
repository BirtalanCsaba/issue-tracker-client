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

export const KanbanPage = (): JSX.Element => {
    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [phases, setPhases] = React.useState<IPhase[]>([]);
    const [isAddPhaseModalOpen, setIsAddPhaseModalOpen] = React.useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState<boolean>(false);

    const navigate = useNavigate();

    const getKanbanIdFromURL = (): string => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);

        return params.get("id") || "";
    };

    React.useEffect(() => {
        // KanbanService.ReadKanbanById(getKanbanIdFromURL())
        //     .then(function (response) {
        //         setTitle(response.data.title);
        //         setDescription(response.data.description);
        //         setPhases(response.data.phases);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        const kanban: IKanban = KanbanService.ReadKanbanById(getKanbanIdFromURL());
        setTitle(kanban.title);
        setDescription(kanban.description);
        setPhases(kanban.phases);
    }, []);

    return (
        <Stack className={kanbanContainerClassName}>
            <div className={titleClassName}>{title} Dashboard</div>
            <Stack horizontal horizontalAlign="end" className={buttonsMenuContainerClassName}>
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
                <AddPhaseModal isOpen={isAddPhaseModalOpen} onClose={() => setIsAddPhaseModalOpen(false)} />
                <KanbanSettingsModal title={title} description={description} isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />

            </Stack>
            <div className={phaseContainerClassName}>
                {phases.map((phase: IPhase, index: number) => {
                    return (
                        <div key={index} className={phaseItemClassName}>
                            <PhaseComponent phase={phase} backgroundColor={phaseColors[index % phaseColors.length]} />
                        </div>
                    )
                })}
            </div>
        </Stack>
    )
};