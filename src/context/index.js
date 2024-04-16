// Importing NPM Dependencies
import React, { createContext, useState, useContext } from "react";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [feed, setFeed] = useState(null);

    return (
        <FeedContext.Provider
            value={{
                feed,
                setFeed,
            }}
        >
            {children}
        </FeedContext.Provider>
    );
};

export const useFeed = () => useContext(FeedContext);
