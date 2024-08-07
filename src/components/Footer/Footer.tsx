import Logo from "../Logo/Logo";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="Footer">
            <Logo />
            <div className="Footer__contact">
                <p>Contact us</p>
                <a href="mailto:gonza.cortave@hotmail.com">gonza.cortave@hotmail.com</a>
            </div>
            <div className="Footer__info">
                <p>© 2024 News App</p>
                <p>All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
