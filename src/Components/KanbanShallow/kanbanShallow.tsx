import { IconButton, Stack, StackItem, TextField } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import React, { MouseEventHandler } from "react";
import { IKanbanShallowProps } from "./kanbanShallow.types";
import { containerStyle, descriptionStyle, deleteKanbanIConButtonClassName, titleStyle } from "./kanbanShallow.style";
import { KanbanService } from "../../Utils/services";
import { KanbanRole } from "../../Enums/kanbanRole";

export const KanbanShallow = (props: IKanbanShallowProps): JSX.Element => {
    const navigate = useNavigate();

    const redirectToKanbanPage = (): void => {
        navigate(`/kanban?id=${props.kanbanShallow.id}`);
    };

    const handleTextFieldClick = (event: any): void => {
        redirectToKanbanPage();
        event.stopPropagation();
    };

    const onClickDeleteKanban = (): void => {
        const userConfirmed: boolean = window.confirm('Are you sure you want to delete this kanban?');

        if (userConfirmed) {
            KanbanService.DeleteKanban(props.kanbanShallow.id)
                .then(function (response) {
                    props.onDeleteKanban(props.kanbanShallow.id);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };

    return (
        <Stack style={containerStyle} horizontal>
            <Stack style={{ width: '95%' }} onClick={redirectToKanbanPage}>
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
            {props.kanbanShallow.role === KanbanRole.OWNER &&
                <Stack horizontalAlign="end">
                    <IconButton
                        iconProps={{ iconName: 'Cancel', style: { fontSize: '20px' } }}
                        title="Delete kanban"
                        className={deleteKanbanIConButtonClassName}
                        onClick={() => onClickDeleteKanban()}
                    />
                </Stack>
            }
        </Stack >
    );
};