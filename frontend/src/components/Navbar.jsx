import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mushukcha_styleLOGO.png";

function Navbar({ language, setLanguage, t }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <header className={`navbar navbar-${language}`}>
            <div className="navbar-left">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <img src={logo} alt="Mushukcha Style" />
                </Link>
            </div>

            <nav className={menuOpen ? "navbar-center active" : "navbar-center"}>
                <Link to="/" onClick={closeMenu}>{t.home}</Link>
                <Link to="/products" onClick={closeMenu}>{t.products}</Link>
                <Link to="/categories" onClick={closeMenu}>{t.categories}</Link>
                <Link to="/news" onClick={closeMenu}>{t.news}</Link>
                <Link to="/about" onClick={closeMenu}>{t.about}</Link>

                <div className="navbar-mobile-languages">
                    <button
                        className={language === "ru" ? "language-button active-language" : "language-button"}
                        onClick={() => changeLanguage("ru")}
                    >
                        RU
                    </button>

                    <button
                        className={language === "en" ? "language-button active-language" : "language-button"}
                        onClick={() => changeLanguage("en")}
                    >
                        EN
                    </button>

                    <button
                        className={language === "uz" ? "language-button active-language" : "language-button"}
                        onClick={() => changeLanguage("uz")}
                    >
                        UZ
                    </button>
                </div>
            </nav>

            <div className="navbar-right">
                <button
                    className={language === "ru" ? "language-button active-language" : "language-button"}
                    onClick={() => changeLanguage("ru")}
                >
                    RU
                </button>

                <button
                    className={language === "en" ? "language-button active-language" : "language-button"}
                    onClick={() => changeLanguage("en")}
                >
                    EN
                </button>

                <button
                    className={language === "uz" ? "language-button active-language" : "language-button"}
                    onClick={() => changeLanguage("uz")}
                >
                    UZ
                </button>
            </div>

            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
}

export default Navbar;