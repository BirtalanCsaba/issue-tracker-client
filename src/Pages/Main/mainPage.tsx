import { Stack, StackItem } from "@fluentui/react";
import React from "react";
import { IKanbanShallow } from "../../Models/kanbanShallow";
import { KanbanService } from "../../Utils/services";
import { KanbanShallow } from "../../Components/KanbanShallow/kanbanShallow";

export const MainPage = (): JSX.Element => {
    const [allKanbans, setAllKanbans] = React.useState<IKanbanShallow[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

    return (
        <Stack>
            <Stack horizontal horizontalAlign="end">
                <button>
                    button1
                </button>
                <button>
                    button1
                </button>
            </Stack>
            {!isLoading && allKanbans.map((kanban: IKanbanShallow) => {
                return (
                    <KanbanShallow
                        kanbanShallow={kanban}
                    />
                )
            })}
        </Stack>
    );
};