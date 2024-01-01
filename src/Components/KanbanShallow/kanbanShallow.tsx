import { Stack } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IKanbanShallowProps } from "./kanbanShallow.types";

export const KanbanShallow = (props: IKanbanShallowProps): JSX.Element => {
    const navigate = useNavigate();

    const onClick = (): void => {
        navigate(`/kanban?id=${props.kanbanShallow.kanbanId}`);
    };

    return (
        <Stack onClick={onClick}>
            <div>
                {props.kanbanShallow.title}
            </div>
            <div>
                {props.kanbanShallow.description}
            </div>
        </Stack>
    );
};