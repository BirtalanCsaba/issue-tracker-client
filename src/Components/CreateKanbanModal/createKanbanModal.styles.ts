import { IDropdownStyleProps, IDropdownStyles, IStyleFunctionOrObject, mergeStyles } from "@fluentui/react";

export const modalContainerClassName: string = mergeStyles({
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '20px',
    width: '600px',
    maxHeight: '80vh',
    overflowY: 'auto'
});

export const createButtonClassName: string = mergeStyles({
    marginTop: '20px',
    backgroundColor: '#0078d4',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
        backgroundColor: '#005499',
        color: '#a0a0a0'
    },
});

export const dropdownStyles: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> = {
    root: {
        marginTop: '20px',
        width: '400px'
    },
    title: {
        height: '35px',
        width: '400px'
    }
};

export const ErrorMessageStyle: React.CSSProperties = {
    fontSize: 17,
    color: "red",
    marginBottom: "15px"
};