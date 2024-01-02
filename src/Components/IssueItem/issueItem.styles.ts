import { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles, mergeStyles } from "@fluentui/react";

export const modalContainerClassName: string = mergeStyles({
    backgroundColor: '#f4f4f4',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    width: '700px',
    height: '420px',
    maxHeight: '80vh',
    overflowY: 'auto'
});

export const headerSectionClassName: string = mergeStyles({
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '3px solid #e0e0e0'
});

export const titleInputStyles: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
    field: {
        flex: '1',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        width: '400px'
    }
};

export const saveButtonClassName: string = mergeStyles({
    padding: '10px 20px',
    backgroundColor: '#0078d4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    selectors: {
        '&:hover': {
            backgroundColor: '#005a9e'
        }
    }
});

export const descriptionTextStyles: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
    field: {
        flex: '1',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        width: '400px',
        height: '200px'
    }
};

export const dropdownPriorityClassName: string = mergeStyles({
    width: '200px',
    marginBottom: '20px'
});

export const textFieldHoursWorkedStyles:  IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
    field: {
        width: '200px'
    }
};