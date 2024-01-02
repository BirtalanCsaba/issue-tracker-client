import { Stack, TextField } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import React, { MouseEventHandler } from "react";
import { IKanbanShallowProps } from "./kanbanShallow.types";
import { containerStyle, descriptionStyle, titleStyle } from "./kanbanShallow.style";

export const KanbanShallow = (props: IKanbanShallowProps): JSX.Element => {
    const navigate = useNavigate();

    const onClick = (): void => {
        navigate(`/kanban?id=${props.kanbanShallow.kanbanId}`);
    };

    const handleTextFieldClick = (event: any): void => {
        onClick();
        event.stopPropagation();
    };

    return (
        <Stack style={containerStyle} onClick={onClick}>
            <div style={titleStyle}>
                {props.kanbanShallow.title}
            </div>
            <div onClick={handleTextFieldClick}>
                <TextField
                    styles={descriptionStyle}
                    value={props.kanbanShallow.description}
                    borderless={true}
                    multiline={true}
                    resizable={false}
                    readOnly={true}
                />
            </div>
        </Stack>
    );
};