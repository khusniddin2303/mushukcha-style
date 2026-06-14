import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/categories.css";
import PageHero from "../components/PageHero";

function CategoriesPage({ heroT, pageT, language }) {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortType, setSortType] = useState("newest");
    const categoriesPerPage = 6;

    useEffect(() => {
        fetch("https://mushukcha-style-backend.onrender.com/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    const sortedCategories = [...categories].sort((a, b) => {

        switch (sortType) {

            case "oldest":
                return a.id - b.id;

            case "most-products":
                return b.productCount - a.productCount;

            case "less-products":
                return a.productCount - b.productCount;

            case "newest":
            default:
                return b.id - a.id;
        }
    });

    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const visibleCategories = sortedCategories.slice(
        currentPage * categoriesPerPage,
        currentPage * categoriesPerPage + categoriesPerPage
    );

    return (
        <div className={`page categories-page page-${language}`}>
            <PageHero
                kicker={heroT.kicker}
                title={heroT.title}
                highlight={heroT.highlight}
                description={heroT.description}
            />

            <div className="categories-sort-row">

                <button
                    className={sortType === "newest" ? "active" : ""}
                    onClick={() => setSortType("newest")}
                >
                    {pageT.sort.newest}
                </button>

                <button
                    className={sortType === "oldest" ? "active" : ""}
                    onClick={() => setSortType("oldest")}
                >
                    {pageT.sort.oldest}
                </button>

                <button
                    className={sortType === "most-products" ? "active" : ""}
                    onClick={() => setSortType("most-products")}
                >
                    {pageT.sort.mostProducts}
                </button>

                <button
                    className={sortType === "less-products" ? "active" : ""}
                    onClick={() => setSortType("less-products")}
                >
                    {pageT.sort.lessProducts}
                </button>

            </div>

            <section className="categories-grid-section">
                {categories.length === 0 ? (
                    <div className="categories-empty-state">
                        <h3>{pageT.emptyTitle}</h3>
                        <p>{pageT.emptyText}</p>
                    </div>
                ) : (
                    <div className="categories-grid">
                        {visibleCategories.map((category, index) => (
                            <Link
                                key={category.id}
                                to={`/products?category=${category.id}`}
                                className={`category-page-card category-page-card-${(index % 4) + 1}`}
                            >

                                <img src="/about/bow.png" alt="" className="category-card-bow"/>

                                <img src="/about/cat-bg.png" alt="" className="category-card-cat"/>

                                <img src="/about/sparkle.png" alt="" className="category-card-sparkle sparkle-1"/>

                                <img src="/about/sparkle.png" alt="" className="category-card-sparkle sparkle-2"/>

                                <img src="/about/sparkle.png" alt="" className="category-card-sparkle sparkle-3"/>

                                <div className="category-page-content">
                                    <p>{pageT.categoryLabel}</p>
                                    <h3>{category.name}</h3>
                                    <span>{pageT.explore}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="categories-pagination">
                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            ←
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={currentPage === index ? "active" : ""}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        ))}

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

export default CategoriesPage;