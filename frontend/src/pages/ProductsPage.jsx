import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategorySelect from "../components/CategorySelect";
import PageHero from "../components/PageHero";
import "../styles/products.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";


function ProductsPage({ heroT, pageT, language }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    const [selectedCategoryId, setSelectedCategoryId] = useState(
        categoryFromUrl ? Number(categoryFromUrl) : null
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [searchOpen, setSearchOpen] = useState(false);
    const [categoryStartIndex, setCategoryStartIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setSelectedCategoryId(categoryFromUrl ? Number(categoryFromUrl) : null);
        setCurrentPage(0);
    }, [categoryFromUrl]);

    useEffect(() => {
        const params = new URLSearchParams();

        params.append("page", currentPage.toString());
        params.append("size", "9");
        params.append("sort", sortOption);

        if (selectedCategoryId !== null) {
            params.append("categoryId", selectedCategoryId);
        }

        if (debouncedSearchTerm.trim() !== "") {
            params.append("name", debouncedSearchTerm.trim());
        }

        setLoading(true);

        fetch(`http://localhost:8080/products?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.items || []);
                setCurrentPage(data.currentPage || 0);
                setTotalPages(data.totalPages || 0);
                setLoading(false);
            })
            .catch(() => {
                setProducts([]);
                setLoading(false);
            });
    }, [selectedCategoryId, debouncedSearchTerm, sortOption, currentPage]);

    const formatPrice = (price, currency) => {
        const formattedPrice = Number(price).toLocaleString("en-US");

        if (currency === "UZS") {
            return `${formattedPrice} UZS`;
        }

        return `$${formattedPrice}`;
    };

    const categoryItems = [
        { id: null, name: pageT.all },
        ...categories,
    ];

    const scrollCategories = (direction) => {
        const container = document.querySelector(".products-category-filter");

        if (!container) return;

        container.scrollBy({
            left: direction === "left" ? -180 : 180,
            behavior: "smooth",
        });
    };

    return (
        <div className={`page products-page page-${language}`}>
            <PageHero
                kicker={heroT.kicker}
                title={heroT.title}
                highlight={heroT.highlight}
                description={heroT.description}
            />

            <section className="products-controls-panel">

                <div className={`products-search-drawer ${searchOpen ? "open" : ""}`}>
                    <input
                        type="text"
                        className="products-search-input"
                        placeholder={pageT.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                    />
                </div>

                <div className="products-filter-row">

                    <div className="products-category-carousel">

                        <button
                            className="category-arrow"
                            onClick={() => scrollCategories("left")}
                        >
                            ←
                        </button>

                        <div className="products-category-filter">
                            {categoryItems.map((category) => (
                                <button
                                    key={category.id ?? "all"}
                                    className={selectedCategoryId === category.id ? "active" : ""}
                                    onClick={() => {
                                        setSelectedCategoryId(category.id);
                                        setCurrentPage(0);
                                    }}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <button
                            className="category-arrow"
                            onClick={() => scrollCategories("right")}
                        >
                            →
                        </button>

                    </div>

                    <div className="products-actions">

                        <button
                            className={`products-icon-button ${searchOpen ? "active" : ""}`}
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <FaSearch />
                        </button>

                        <div className="products-sort-compact">
                            <CategorySelect
                                value={sortOption}
                                icon={<FaSlidersH />}
                                onChange={(value) => {
                                    setSortOption(value);
                                    setCurrentPage(0);
                                }}
                                placeholder=""
                                options={[
                                    { value: "newest", label: pageT.sort.newest },
                                    { value: "priceAsc", label: pageT.sort.priceAsc },
                                    { value: "priceDesc", label: pageT.sort.priceDesc },
                                    { value: "nameAsc", label: pageT.sort.nameAsc },
                                ]}
                            />
                        </div>

                    </div>

                </div>

            </section>

            <section className="products-grid-section">
                {loading ? (
                    <div className="products-loading-grid">
                        {Array.from({ length: 8 }, (_, index) => (
                            <div className="products-skeleton-card" key={index}></div>
                        ))}
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <div
                                className="products-card"
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <img
                                    src={
                                        product.imageUrl
                                            ? `http://localhost:8080${product.imageUrl}`
                                            : "/no-image.png"
                                    }
                                    alt={product.name}
                                    className="products-card-image"
                                />

                                <div className="products-card-content">
                                    <span className="products-card-category">
                                        {product.categoryName || pageT.productFallback}
                                    </span>

                                    <h3>{product.name}</h3>

                                    <p className="products-card-description">
                                        {product.description
                                            ? product.description.length > 80
                                                ? product.description.slice(0, 80) + "..."
                                                : product.description
                                            : pageT.noDescription}
                                    </p>

                                    <div className="products-card-footer">
                                        <p>{formatPrice(product.price, product.currency)}</p>
                                        <button>{pageT.view}</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className="products-empty-state">
                                <h3>{pageT.emptyTitle}</h3>
                                <p>{pageT.emptyText}</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {totalPages > 1 && (
                <div className="products-pagination">
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
        </div>
    );
}

export default ProductsPage;