import { Stack } from "@fluentui/react";
import React from "react";
import { IKanban } from "../../Models/kanban";
import { KanbanService } from "../../Utils/services";
import { useNavigate } from "react-router-dom";
import { IPhase } from "../../Models/phase";
import { PhaseComponent } from "../../Components/Phase/phase";

export const KanbanPage = (): JSX.Element => {
    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [phases, setPhases] = React.useState<IPhase[]>([]);
    const navigate = useNavigate();

    const getKanbanIdFromURL = (): string => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);

        return params.get("id") || "";
    };

    React.useEffect(() => {
        KanbanService.ReadKanbanById(getKanbanIdFromURL())
            .then(function (response) {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPhases(response.data.phases);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <Stack>
            <div>
                {title}
            </div>
            <Stack horizontal horizontalAlign="end">
                <button>
                    button1
                </button>
                <button>
                    button2
                </button>
            </Stack>
            <div>
                {description}
            </div>
            {phases.map((phase: IPhase) => {
                return (
                    <PhaseComponent phase={phase} />
                )
            })}
        </Stack>
    )
};