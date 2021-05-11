import React, { createContext, useState } from 'react';

export const SalesContext = createContext({});

export const SalesProvider = ({ children }) => {
    const [ salesInfo, setSalesInfo ] = useState({
        percentageDifference: 0
    });

    return (
        <SalesContext.Provider 
            value={{ salesInfo, setSalesInfo }}
        >
            {children}
        </SalesContext.Provider>
    )
};