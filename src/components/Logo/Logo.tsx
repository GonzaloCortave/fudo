import FudoImg from "@/../public/imgs/logo.svg";

import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => (
    <div className="Logo">
        <Link to="/">
            <img alt="logo" src={FudoImg} />
            <p>news</p>
        </Link>
    </div>
);

export default Logo;
