import { mergeStyles } from "@fluentui/react";

export const modalContainerClassName: string = mergeStyles({
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '20px',
    width: '600px',
    maxHeight: '80vh',
    overflowY: 'auto'
});