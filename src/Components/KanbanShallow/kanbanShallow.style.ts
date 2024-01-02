import { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from "@fluentui/react";
import React from "react";

export const containerStyle: React.CSSProperties = {
    border: '1px solid #d1d1d1',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginLeft: '40px',
    marginRight: '50px'
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
        maxHeight: '4.5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        backgroundColor: '#f9f9f9'
    }
};