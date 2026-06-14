import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/news.css";
import PageHero from "../components/PageHero";

function NewsPage({ heroT, pageT, language }) {
    const [newsProducts, setNewsProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const productsPerPage = 6;

    useEffect(() => {
        fetch("https://mushukcha-style-backend.onrender.com/products/new-arrivals")
            .then((res) => res.json())
            .then((data) => setNewsProducts(data || []))
            .catch(() => setNewsProducts([]));
    }, []);

    const totalPages = Math.ceil(
        newsProducts.length / productsPerPage
    );

    const visibleProducts = newsProducts.slice(
        currentPage * productsPerPage,
        currentPage * productsPerPage + productsPerPage
    );

    return (
        <div className={`page news-page page-${language}`}>
            <PageHero
                kicker={heroT.kicker}
                title={heroT.title}
                highlight={heroT.highlight}
                description={heroT.description}
            />

            <section className="news-grid-section">
                {newsProducts.length === 0 ? (
                    <div className="news-empty-state">
                        <h3>{pageT.emptyTitle}</h3>
                        <p>{pageT.emptyText}</p>
                    </div>
                ) : (
                    <div className="news-grid">
                        {visibleProducts.map((product) => (
                            <Link
                                to={`/product/${product.id}`}
                                className="news-card"
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

                                <div className="news-card-content">
                                    <p>{product.categoryName || pageT.productFallback}</p>
                                    <h3>{product.name}</h3>
                                    <span>{pageT.justArrived}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="news-pagination">

                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ←
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => (
                                <button
                                    key={index}
                                    className={
                                        currentPage === index
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => setCurrentPage(index)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            →
                        </button>

                    </div>
                )}

            </section>
        </div>
    );
}

export default NewsPage;