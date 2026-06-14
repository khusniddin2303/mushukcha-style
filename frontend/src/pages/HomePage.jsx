import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaLayerGroup } from "react-icons/fa";

import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";

function HomePage({ t, language }) {

    const slides = [
        hero1,
        hero2,
        hero3,
        hero4,
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [newProducts, setNewProducts] = useState([]);
    const [newArrivalIndex, setNewArrivalIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [animatedProducts, setAnimatedProducts] = useState(0);
    const [animatedCategories, setAnimatedCategories] = useState(0);
    const popularRef = useRef(null);
    const [popularVisible, setPopularVisible] = useState(false);

    const statsRef = useRef(null);
    const hasAnimated = useRef(false);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        fetch("https://mushukcha-style-backend.onrender.com/products/new-arrivals")
            .then((res) => res.json())
            .then((data) => setNewProducts(data || []))
            .catch(() => setNewProducts([]));
    }, []);

    useEffect(() => {
        fetch("https://mushukcha-style-backend.onrender.com/categories/featured")
            .then((res) => res.json())
            .then((data) => setCategories(data || []))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        fetch("https://mushukcha-style-backend.onrender.com/categories")
            .then((res) => res.json())
            .then((data) => setAllCategories(data || []))
            .catch(() => setAllCategories([]));
    }, []);

    useEffect(() => {
        if (
            newProducts.length === 0 ||
            allCategories.length === 0
        ) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    let productStart = 0;
                    let categoryStart = 0;

                    const productTarget = newProducts.length;
                    const categoryTarget = allCategories.length;

                    const productInterval = setInterval(() => {
                        productStart++;

                        setAnimatedProducts(productStart);

                        if (productStart >= productTarget) {
                            clearInterval(productInterval);
                        }
                    }, 80);

                    const categoryInterval = setInterval(() => {
                        categoryStart++;

                        setAnimatedCategories(categoryStart);

                        if (categoryStart >= categoryTarget) {
                            clearInterval(categoryInterval);
                        }
                    }, 80);
                }
            },
            {
                threshold: 0.45,
            }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [newProducts.length, allCategories.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPopularVisible(true);
                }
            },
            {
                threshold: 0.35,
            }
        );

        if (popularRef.current) {
            observer.observe(popularRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getArrivalStep = () => {
        if (window.innerWidth <= 480) return 100;

        if (window.innerWidth <= 539) {
            return 122;
        }

        if (window.innerWidth <= 579) {
            return 90;
        }

        if (window.innerWidth <= 615) {
            return 122;
        }

        if (window.innerWidth <= 768) {
            return 168;
        }

        return 216;
    };

    const arrivalStep = getArrivalStep();

    return (
        <div className={`page home-page page-${language}`}>

            <section className="hero-slider">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={
                            currentSlide === index
                                ? "hero-slide active"
                                : "hero-slide"
                        }
                    >
                        <img src={slide} alt="" />

                        <div className="hero-overlay" />

                        <div className="hero-content">

                            <h1 className="hero-brand-title">
                                Mushukcha
                                <span className="hero-style-line">
                                    Style
                                    <div className="hero-mini-sparkles">
                                        <span>✦</span>
                                        <span>✦</span>
                                        <span>✦</span>
                                    </div>
                                </span>
                            </h1>

                            <Link
                                to="/products"
                                className="hero-button"
                            >
                                {t.heroButton}
                            </Link>

                        </div>
                    </div>
                ))}

                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={
                                currentSlide === index
                                    ? "hero-dot active"
                                    : "hero-dot"
                            }
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>

            </section>

            <section className="home-stats-section" ref={statsRef}>
                <img src="/about/bow.png" alt="" className="home-stats-bow" />
                <img src="/about/cat-bg.png" alt="" className="home-stats-cat" />

                <h2>{t.statsTitle}</h2>

                <div className="home-stats-grid">
                    <div className="home-stat-item">
                        <div className="home-stat-icon">
                            <FaBoxOpen />
                        </div>

                        <h3>{animatedProducts}</h3>
                        <p>{t.products}</p>
                    </div>

                    <div className="home-stat-item">
                        <div className="home-stat-icon">
                            <FaLayerGroup />
                        </div>

                        <h3>{animatedCategories}</h3>
                        <p>{t.categories}</p>
                    </div>
                </div>
            </section>


            <section className="home-arrivals-section">
                <div className="home-arrivals-left">
                    <p className="home-section-label">{t.freshPicks}</p>
                    <h2>{t.newArrivals}</h2>

                    <Link to="/news" className="home-section-link">
                        {t.viewAll}
                    </Link>

                    {newProducts.length > 3 && (
                        <div className="home-arrivals-controls">
                            <button
                                onClick={() =>
                                    setNewArrivalIndex((prev) => Math.max(prev - 1, 0))
                                }
                                disabled={newArrivalIndex === 0}
                            >
                                ←
                            </button>

                            <button
                                onClick={() =>
                                    setNewArrivalIndex((prev) =>
                                        Math.min(prev + 1, Math.min(newProducts.length, 6) - 3)
                                    )
                                }
                                disabled={newArrivalIndex >= Math.min(newProducts.length, 6) - 3}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>

                <div className="home-arrivals-slider">
                    {newProducts.length === 0 ? (
                        <div className="home-empty-state">
                            <h3>{t.noNewArrivalsTitle}</h3>
                            <p>{t.noNewArrivalsText}</p>
                        </div>
                    ) : (
                        <div
                            className="home-arrivals-track"
                            style={{
                                transform: `translateX(-${newArrivalIndex * arrivalStep}px)`,
                            }}
                        >
                            {newProducts.slice(0, 6).map((product) => (
                                <Link
                                    to={`/product/${product.id}`}
                                    className="home-arrival-card"
                                    key={product.id}
                                >
                                    <img
                                        src={
                                            product.imageUrl
                                                ? `https://mushukcha-style-backend.onrender.com${product.imageUrl}`
                                                : "/no-image.png"
                                        }
                                        alt={product.name}
                                    />

                                    <div>
                                        <span>{product.categoryName || t.productFallback}</span>
                                        <h3>{product.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section
                className={`home-section ${popularVisible ? "popular-visible" : ""}`}
                ref={popularRef}
            >

                <div className="home-section-header">
                    <div>
                        <p className="home-section-label">
                            {t.explore}
                        </p>

                        <h2>
                            {t.popularCategories}
                        </h2>
                    </div>
                </div>

                <div className="category-showcase-grid">
                    {categories.length === 0 ? (
                        <div className="home-empty-state categories-empty">
                            <h3>{t.noFeaturedTitle}</h3>
                            <p>{t.noFeaturedText}</p>
                        </div>
                    ) : (
                        categories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.id}`}
                                className={`category-showcase-card category-card-${index + 1}`}
                            >
                                <img src="/about/bow.png" alt="" className="home-category-bow" />
                                <img src="/about/cat-bg.png" alt="" className="home-category-cat" />
                                <img src="/about/sparkle.png" alt="" className="home-category-sparkle home-sparkle-1" />
                                <img src="/about/sparkle.png" alt="" className="home-category-sparkle home-sparkle-2" />
                                <img src="/about/sparkle.png" alt="" className="home-category-sparkle home-sparkle-3" />

                                <div className="category-showcase-content">

                                    <div className="featured-category-content">
                                        <p>{t.popularCategory}</p>
                                        <h3>{category.name}</h3>
                                        <button>{t.exploreButton}</button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

            </section>

        </div>
    );
}

export default HomePage;