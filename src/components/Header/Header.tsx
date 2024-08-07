import SearchBar from "../SearchBar/SearchBar";

import { useOffline } from "@/appProviders/OfflineModeProvider/OfflineModeProvider";

import "./Header.css";
import cx from "classnames";

const Header = () => {
    const { isOffline, setIsOffline } = useOffline();

    return (
        <header className="Header">
            <SearchBar />
            <button
                className={cx("Header__offlineButton", {
                    "Header__offlineButton--offline": isOffline,
                })}
                onClick={() => setIsOffline(!isOffline)}
            >
                {isOffline ? "Go Online" : "Go Offline"}
            </button>
        </header>
    );
};

export default Header;
