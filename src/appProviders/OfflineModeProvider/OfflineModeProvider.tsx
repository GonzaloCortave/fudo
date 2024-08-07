import React, { createContext, useContext, useState, useEffect } from "react";

import {
    getIsOfflineFromLocalStorage,
    saveIsOfflineToLocalStorage,
} from "@/localStorage/offlineMode";

type OfflineContextType = {
    isOffline: boolean;
    setIsOffline: (isOffline: boolean) => void;
};

type OfflineProviderProps = {
    children: React.ReactNode;
};

const OfflineContext = createContext({} as OfflineContextType);

export const OfflineProvider = ({ children }: OfflineProviderProps) => {
    const [isOffline, setIsOffline] = useState(getIsOfflineFromLocalStorage());

    useEffect(() => {
        saveIsOfflineToLocalStorage(isOffline);
    }, [isOffline]);

    return (
        <OfflineContext.Provider value={{ isOffline, setIsOffline }}>
            {children}
        </OfflineContext.Provider>
    );
};

export const useOffline = () => useContext(OfflineContext);
