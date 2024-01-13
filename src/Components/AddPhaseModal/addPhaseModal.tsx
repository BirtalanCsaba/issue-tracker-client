import { useState } from 'react';
import { Modal, TextField, PrimaryButton, Stack } from '@fluentui/react';
import { IAddPhaseModalProps } from './addPhaseModal.types';
import { modalContainerClassName } from './addPhaseModal.styles';
import { PhasesService } from '../../Utils/services';
import { IAddPhaseDTO } from '../../DTO/addPhaseDTO';

export const AddPhaseModal = (props: IAddPhaseModalProps): JSX.Element => {
    const [phaseTitle, setPhaseTitle] = useState<string>('');

    const handleAddPhase = () => {
        const phaseDTO: IAddPhaseDTO = {
            title: phaseTitle
        };

        PhasesService.AddPhase(phaseDTO, props.kanbanId)
        .then(function (response) {
            props.onAddedPhase(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        onModalClose();
    };


    const onModalClose = (): void => {
        setPhaseTitle('');
        props.onClose();
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onDismiss={onModalClose}
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