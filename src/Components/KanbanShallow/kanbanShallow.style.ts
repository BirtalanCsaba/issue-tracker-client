import { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles, mergeStyles } from "@fluentui/react";
import React from "react";

export const containerStyle: React.CSSProperties = {
    border: '1px solid #d1d1d1',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginLeft: '40px',
    marginRight: '25px'
};

export const titleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#0077cc'
};

export const descriptionStyle: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> = {
    field: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.5',
        height: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        backgroundColor: '#f9f9f9',
    }
};

export const deleteKanbanIConButtonClassName: string = mergeStyles({
    marginLeft: '10px',
    backgroundColor: 'inherit',
    selectors: {
        '&:hover': {
            backgroundColor: 'inherit',
            color: '#B22222'
        }
    }
});