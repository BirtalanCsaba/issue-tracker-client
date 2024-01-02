import { useState } from 'react';
import { Modal, TextField, PrimaryButton, Stack } from '@fluentui/react';
import { IAddPhaseModalProps } from './addPhaseModal.types';
import { modalContainerClassName } from './addPhaseModal.styles';

export const AddPhaseModal = (props: IAddPhaseModalProps): JSX.Element => {
    const [phaseTitle, setPhaseTitle] = useState<string>('');

    const handleAddPhase = () => {
        // Logic to add a new phase
        props.onClose();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onDismiss={props.onClose}
            titleAriaId="add-phase-title"
            subtitleAriaId="add-phase-subtitle"
        >
            <Stack tokens={{ childrenGap: 20 }} className={modalContainerClassName}>
                <TextField
                    label="Phase Title"
                    value={phaseTitle}
                    onChange={(event, newValue) => setPhaseTitle(newValue || '')}
                />
                <PrimaryButton onClick={handleAddPhase}>Add Phase</PrimaryButton>
            </Stack>
        </Modal>
    );
};