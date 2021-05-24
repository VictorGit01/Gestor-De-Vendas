import React, { createContext, useState } from 'react';

export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
    const [ message, setMessage ] = useState({
        visibility: false,
        title: '',
        type: 'message',
        // container_color: colors.blue_light,
        // title_color: colors.white,
    });

    function updateMessage(
        title, 
        visibility = true, 
        type = 'message'
        // container_color = colors.blue_light,
        // title_color = colors.white,
    ) {
        setMessage({
            visibility,
            title,
            type,
        })
    }

    return (
        <MessageContext.Provider value={{ message, updateMessage }}>
            { children }
        </MessageContext.Provider>
    );
}