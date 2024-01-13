import { mergeStyles } from "@fluentui/react";
import React from "react";

export const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  color: '#333',
  textAlign: 'left',
  padding: '20px',
  paddingLeft: '50px',
  borderBottom: '2px solid #ddd'
};

export const menuContainerStyle: React.CSSProperties = {
  margin: '10px 25px 25px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

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
  selectors: {
    '&:hover': {
      backgroundColor: '#c4c4c4',
      color: '#0078d4'
    },
  },
});