import { mergeStyles } from "@fluentui/react";
import React from "react";

export const containerStyle: React.CSSProperties = {
    // marginTop: '50px'
};

export const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    color: '#333',
    textAlign: 'left',
    padding: '20px',
    paddingLeft: '50px',
    borderBottom: '2px solid #ddd'
};

export const menuContainerStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

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