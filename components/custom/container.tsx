import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<Readonly<ContainerProps>> = ({children}) => {
    return (
        <div className="p-4 pt-0">
            {children}
        </div>
    );
};
