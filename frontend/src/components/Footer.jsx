import { Link } from "react-router-dom";
import logo from "../assets/mushukcha_styleLOGO.png";
import { FaInstagram, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function Footer({ t }) {
    const showPhoneNumber = () => {
        toast.info(
            <div>
                <p>+998 97 702 64 94</p>
                <p>+998 94 661 23 03</p>
            </div>,
            {
                className: "pink-toast",
            }
        );
    };

    return (
        <footer className="site-footer">
            <div className="footer-bg-text">Mushukcha Style</div>

            <div className="footer-content">
                <div className="footer-left">
                    <Link to="/" className="footer-logo">
                        <img src={logo} alt="Mushukcha Style" />
                    </Link>
                </div>

                <nav className="footer-nav">
                    <Link to="/products">{t.products}</Link>
                    <Link to="/categories">{t.categories}</Link>
                    <Link to="/news">{t.news}</Link>
                    <Link to="/about">{t.about}</Link>
                </nav>
            </div>

            <div className="footer-email-block">
                <p className="footer-label">{t.contactEmail}</p>
                <h3>khusniddin2303@gmail.com</h3>
            </div>

            <div className="footer-bottom">
                <p>{t.copyright}</p>
            </div>

            <div className="footer-floating-buttons">
                <button onClick={showPhoneNumber}>
                    <FaPhoneAlt />
                </button>

                <a
                    href="https://instagram.com/mushukcha_style"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://t.me/Fotima_07"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaTelegramPlane />
                </a>
            </div>
        </footer>
    );
}

export default Footer;