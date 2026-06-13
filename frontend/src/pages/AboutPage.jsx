import "../styles/about.css";
import PageHero from "../components/PageHero";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaShoppingBag,
    FaCode,
    FaInstagram,
    FaTelegramPlane,
    FaLaptopCode,
    FaTerminal,
    FaReact,
    FaJava,
    FaDatabase,
    FaHtml5,
    FaCss3Alt,
    FaGithub,
    FaServer,
    FaBug,
    FaRocket,
    FaKeyboard,
    FaMouse,
    FaCloud,
} from "react-icons/fa";

function AboutPage({ heroT, pageT, language }) {
    return (
        <div className={`page about-page page-${language}`}>
            <PageHero
                kicker={heroT.kicker}
                title={heroT.title}
                highlight={heroT.highlight}
                description={heroT.description}
            />

            <section className="about-location">
                <div className="about-map-card">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.8099845303227!2d69.30813307739996!3d41.35648367130374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef30010a424cb%3A0x35c3558902506466!2sHigh%20Town%20Mall!5e0!3m2!1sru!2shk!4v1778856517804!5m2!1sru!2shk"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </div>

                <div className="about-location-info">
                    <p className="about-location-kicker">{pageT.storeKicker}</p>
                    <h2>{pageT.visitTitle}</h2>

                    <div className="about-title-line"></div>

                    <div className="about-info-item">
                        <FaShoppingBag />
                        <div>
                            <h3>High Town Mall</h3>
                            <span>{pageT.floor}</span>
                        </div>
                    </div>

                    <div className="about-info-item">
                        <FaMapMarkerAlt />
                        <div>
                            <h3>Tashkent, Uzbekistan</h3>
                            <span>Yangi Shahar ko'chasi 67, 100194</span>
                        </div>
                    </div>

                    <div className="about-info-item">
                        <FaPhoneAlt />
                        <div>
                            <h3>+998 97 702 64 94</h3>
                            <span>{pageT.workTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-person about-owner">
                <img src="/about/heart.png" alt="" className="owner-bg-heart" />

                <div className="owner-photo-side">
                    <img src="/about/sparkle.png" alt="" className="owner-sparkle owner-sparkle-1" />
                    <img src="/about/sparkle.png" alt="" className="owner-sparkle owner-sparkle-2" />
                    <img src="/about/sparkle.png" alt="" className="owner-sparkle owner-sparkle-3" />
                    <img src="/about/sparkle.png" alt="" className="owner-sparkle owner-sparkle-4" />

                    <div className="owner-blob-frame">
                        <img src="/about/blob-owner.png" alt="" className="owner-blob-bg" />
                        <img src="/about/owner.JPG" alt="Owner" className="owner-photo" />
                    </div>
                </div>

                <div className="owner-text">
                    <p className="owner-kicker">{pageT.ownerKicker}</p>

                    <h2 className="owner-title">
                        Fotimakhon<br />
                        Nabieva
                    </h2>

                    <div className="about-divider small owner-divider">
                        <span></span>
                        <img src="/about/bow.png" alt="" />
                        <span></span>
                    </div>

                    <p>{pageT.ownerText}</p>

                    <div className="owner-socials">
                        <a href="https://instagram.com/mushukcha_style" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                            Instagram
                        </a>

                        <a href="https://t.me/Fotima_07" target="_blank" rel="noopener noreferrer">
                            <FaTelegramPlane />
                            Telegram
                        </a>
                    </div>
                </div>
            </section>

            <section className="about-developer-section">
                <div className="tech-icon tech-icon-1"><FaLaptopCode /></div>
                <div className="tech-icon tech-icon-2"><FaCode /></div>
                <div className="tech-icon tech-icon-3"><FaTerminal /></div>
                <div className="tech-icon tech-icon-4"><FaReact /></div>
                <div className="tech-icon tech-icon-5"><FaJava /></div>
                <div className="tech-icon tech-icon-6"><FaDatabase /></div>
                <div className="tech-icon tech-icon-7"><FaHtml5 /></div>
                <div className="tech-icon tech-icon-8"><FaCss3Alt /></div>
                <div className="tech-icon tech-icon-9"><FaGithub /></div>
                <div className="tech-icon tech-icon-10"><FaServer /></div>
                <div className="tech-icon tech-icon-11"><FaBug /></div>
                <div className="tech-icon tech-icon-12"><FaRocket /></div>
                <div className="tech-icon tech-icon-13"><FaKeyboard /></div>
                <div className="tech-icon tech-icon-14"><FaMouse /></div>
                <div className="tech-icon tech-icon-15"><FaCloud /></div>

                <div className="developer-info">
                    <p className="developer-kicker">
                        <FaCode /> {pageT.developerKicker}
                    </p>

                    <h2>Khusniddin Nabiev</h2>

                    <p>{pageT.developerText}</p>

                    <div className="developer-socials">
                        <a href="https://instagram.com/mushukcha_style" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>

                        <a href="https://t.me/kh_2303" target="_blank" rel="noopener noreferrer">
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>

                <div className="developer-photo-area">
                    <div className="developer-photo-frame">
                        <img src="/about/developer.JPG" alt="Developer" />
                    </div>
                </div>
            </section>

            <section className="about-thank-you">
                {Array.from({ length: 10 }, (_, index) => (
                    <img
                        key={index}
                        src="/about/sparkle.png"
                        alt=""
                        className={`thank-sparkle thank-sparkle-${index + 1}`}
                    />
                ))}

                <img src="/about/heart.png" alt="" className="thank-heart thank-heart-1" />
                <img src="/about/heart.png" alt="" className="thank-heart thank-heart-2" />

                <p>{pageT.thankYou}</p>
                <span>{pageT.thankSubtitle}</span>
                <h2>Mushukcha Style</h2>

                <div className="about-divider small">
                    <span></span>
                    <img src="/about/bow.png" alt="" />
                    <span></span>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;