import React, { createContext, useState, useEffect } from 'react';

export const PreloadContext = createContext({});

export const PreloadProvider = ({children}) => {
    const [ preload, setPreload ] = useState({
        loadImage: false,
        fontsLoaded: false,
        refresh: true,
    });

    function refreshData(refresh = true) {
        setPreload({
            ...preload,
            refresh,
        })
    }

    return (
        <PreloadContext.Provider value={{ preload, setPreload, refreshData }}>
            {children}
        </PreloadContext.Provider>
    );
};