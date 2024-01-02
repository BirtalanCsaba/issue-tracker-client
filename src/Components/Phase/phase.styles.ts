import { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles, mergeStyles } from "@fluentui/react";

export const phaseContainerClassName = (backgroundColor: string): string => mergeStyles({
    height: 400,
    width: 450,
    padding: 35,
    backgroundColor: backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'

});

export const topSectionClassName: string = mergeStyles({
    marginBottom: '50px'
});

export const listIssueContainerClassName = (backgroundColor: string): string => mergeStyles({
    height: '150px',
    overflow: 'auto',
    marginBottom: '50px',
    backgroundColor: backgroundColor,
    padding: '20px'
});

export const issueContainerClassName: string = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    marginBottom: '10px',
    borderRadius: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white'
});

export const issueTitleClassName: string = mergeStyles({
    fontSize: '16px',
    fontWeight: 500,
    color: '#333333',
    width: '90%'
});

export const primaryButtonClassName: string = mergeStyles({
    backgroundColor: '#0078d4',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'background-color 0.3s ease',
    selectors: {
        '&:hover': {
            backgroundColor: '#005ea2'
        }
    }
});

export const titleStyles: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
    fieldGroup: {
        height: '40px'
    },
    field: {
        width: '220px',
        fontSize: '24px',
        fontWeight: 400,
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
        selectors: {
            '&:hover': {
                borderColor: '#0078d4'
            },
            '&:focus': {
                outline: 'none',
                borderColor: '#0078d4',
                boxShadow: '0 0 0 2px rgba(0, 120, 212, 0.5)'
            }
        }
    }
};

export const deleteIconClassName: string = mergeStyles({
    color: '#FFFFFF',
    backgroundColor: 'inherit',
    selectors: {
        '&:hover': {
            color: '#E0E0E0',
            backgroundColor: 'inherit'
        }
    }
});

export const itemButtonButtonClassName: string = mergeStyles({
    marginLeft: '20px',
    backgroundColor: 'inherit',
    selectors: {
        '&:hover': {
            backgroundColor: 'inherit'
        }
    }
});