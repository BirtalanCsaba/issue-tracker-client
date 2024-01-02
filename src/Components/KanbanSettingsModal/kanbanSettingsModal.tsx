import React from "react";
import { IKanbanSettingsModalProps } from "./kanbanSettingsModal.types";
import { Modal, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { modalContainerClassName } from "./kanbanSettingsModal.styles";

export const KanbanSettingsModal = (props: IKanbanSettingsModalProps): JSX.Element => {
    const [title, setTitle] = React.useState<string>(props.title);
    const [description, setDescription] = React.useState<string>(props.description);
  
    const handleSaveSettings = () => {
      // Logic to save Kanban settings
      props.onClose();
    };
  
    return (
      <Modal isOpen={props.isOpen} onDismiss={props.onClose} titleAriaId="kanban-settings-title">
        <Stack tokens={{ childrenGap: 20 }} className={modalContainerClassName}>
          <TextField
            label="Title"
            value={title}
            onChange={(event, newValue) => setTitle(newValue || '')}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(event, newValue) => setDescription(newValue || '')}
          />
          <PrimaryButton onClick={handleSaveSettings}>Save</PrimaryButton>
        </Stack>
      </Modal>
    );
  };