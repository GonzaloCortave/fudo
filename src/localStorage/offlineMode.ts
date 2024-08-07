const IS_OFFLINE = "isOffline";

export const saveIsOfflineToLocalStorage = (isOffline: boolean) => {
    localStorage.setItem(IS_OFFLINE, JSON.stringify(isOffline));
};

export const getIsOfflineFromLocalStorage = (): boolean => {
    const isOffline = localStorage.getItem(IS_OFFLINE);

    return isOffline ? JSON.parse(isOffline) : false;
};
