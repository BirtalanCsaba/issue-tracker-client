import { mergeStyles } from "@fluentui/react";
import React from "react";

export const phaseColors = [
    '#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D',
    '#99B898', '#FECEAB', '#FF847C', '#E84A5F', '#2A363B'
];

export const kanbanContainerClassName: string = mergeStyles({
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'inline-block'
});

export const titleClassName: string = mergeStyles({
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333333',
    borderBottom: '2px solid #0078d4',
    paddingBottom: '8px'
});

export const descriptionStyle: string = mergeStyles({
    fontSize: '16px',
    marginBottom: '24px',
    color: '#666666'
});

export const addButtonStyle: string = mergeStyles({
    backgroundColor: '#0078d4',
    color: '#ffffff',
    padding: '10px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease',
    selectors: {
        '&:hover': {
            backgroundColor: '#005a9e'
        }
    }
});

export const phaseContainerClassName: string = mergeStyles({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
});

export const phaseItemClassName: string = mergeStyles({
    flex: '0 0 auto',
    marginBottom: '20px'
});

export const buttonClassName: string = mergeStyles({
    color: 'white',
    fontSize: '16px',
    backgroundColor: '#0078d4',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '10px',
    selectors: {
      '&:hover': {
        backgroundColor: '#c4c4c4',
        color: '#0078d4'
      },
    },
  });
  
  export const iconStyle: React.CSSProperties = {
    marginRight: 5,
    color: 'inherit'
  };

  export const buttonsMenuContainerClassName: string = mergeStyles({
    marginBottom: '50px'
  });