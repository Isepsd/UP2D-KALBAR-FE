import React from 'react';

declare module 'jqwidgets-scripts/jqwidgets-react-tsx/*' {
    export interface IButtonProps { children?: React.ReactNode; }
    export interface IWindowProps { children?: React.ReactNode; }
    export interface IGridProps { children?: React.ReactNode; }
    export interface IPanelProps { children?: React.ReactNode; }
    export interface IWindowProps {
        children?: React.ReactNode;
        // tambahkan properti lain jika perlu
    }
}
