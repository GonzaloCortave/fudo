import SearchBar from "../SearchBar/SearchBar";

import { useOffline } from "@/appProviders/OfflineModeProvider/OfflineModeProvider";

import "./Header.css";
import cx from "classnames";

import Logo from "../Logo/Logo";

const Header = () => {
    const { isOffline } = useOffline();

    return (
        <header className="Header">
            <Logo />
            <SearchBar />
            <p
                className={cx("Header__offlineText", {
                    "Header__offlineText--offline": isOffline,
                })}
            >
                {isOffline ? "Offline mode" : "Online mode"}
            </p>
        </header>
    );
};

export default Header;
