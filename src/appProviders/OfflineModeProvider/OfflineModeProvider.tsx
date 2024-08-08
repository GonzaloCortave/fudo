import React, { createContext, useContext, useState, useEffect } from "react";

type OfflineContextType = {
    isOffline: boolean;
    setIsOffline: (isOffline: boolean) => void;
};

type OfflineProviderProps = {
    children: React.ReactNode;
};

const OfflineContext = createContext({} as OfflineContextType);

export const OfflineProvider = ({ children }: OfflineProviderProps) => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOffline(!navigator.onLine);
        };

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    return (
        <OfflineContext.Provider value={{ isOffline, setIsOffline }}>
            {children}
        </OfflineContext.Provider>
    );
};

export const useOffline = () => useContext(OfflineContext);
