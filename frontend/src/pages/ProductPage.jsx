import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaSearchPlus } from "react-icons/fa";
import { FaInstagram, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";

function ProductPage({ pageT, language }) {
    const [product, setProduct] = useState(null);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const zoomFrameRef = useRef(null);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({
        x: 0,
        y: 0,
        scrollLeft: 0,
        scrollTop: 0,
    });

    const id = window.location.pathname.split("/")[2];

    const showPhoneNumbers = () => {
        toast.info(
            <div className="phone-toast-content">
                <div>+998 97 702 64 94</div>
                <div>+998 94 661 23 03</div>
            </div>,
            {
                autoClose: 5500,
                className: "pink-toast",
            }
        );
    };

    useEffect(() => {
        fetch(`http://localhost:8080/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    const formatPrice = (price, currency) => {
        const formattedPrice = Number(price).toLocaleString("en-US");

        if (currency === "UZS") {
            return `${formattedPrice} UZS`;
        }

        return `$${formattedPrice}`;
    };

    if (!product) return <div className="loader"></div>;

    return (
        <div className={`page product-page page-${language}`}>

            <div className="product-page-card">

                <div className="product-image-section">

                    <div className="product-main-image-wrapper">

                        <img
                            src={
                                product.imageUrl
                                    ? `http://localhost:8080${product.imageUrl}`
                                    : "/no-image.png"
                            }
                            alt={product.name}
                            className="product-main-image"
                        />

                        <button
                            className="zoom-button"
                            onClick={() => {
                                setZoomOpen(true);
                                setZoomLevel(1);
                            }}
                        >
                            <FaSearchPlus />
                        </button>

                    </div>

                </div>

                <div className="product-header-row">

                    <h1 className="product-page-title">
                        {product.name}
                    </h1>

                    <span className="product-page-category">
                        {product.categoryName || pageT.productFallback}
                    </span>

                </div>

                <div className="product-description">
                    {product.description
                        ? product.description
                        : pageT.noDescription}
                </div>

                <div className="product-page-price">
                    {formatPrice(product.price, product.currency)}
                </div>

                <div className="product-social-buttons">

                    <button
                        className="product-social-button"
                        onClick={showPhoneNumbers}
                    >
                        <span className="phone-icon">
                            <FaPhoneAlt />
                        </span>
                        <span>{pageT.call}</span>
                    </button>

                    <a
                        href="https://instagram.com/mushukcha_style"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-social-button"
                    >
                        <FaInstagram />
                        <span>Instagram</span>
                    </a>

                    <a
                        href={`https://t.me/Fotima_07?text=${encodeURIComponent(
                            `${pageT.telegramOrderText} ${product.name} ${pageT.telegramForText} ${formatPrice(product.price, product.currency)}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-social-button"
                    >
                        <FaTelegramPlane />
                        <span>Telegram</span>
                    </a>

                </div>

                <button
                    className="product-back-button"
                    onClick={() => window.history.back()}
                >
                    {pageT.back}
                </button>

            </div>

            {zoomOpen && (
                <div className="zoom-modal">
                    <button
                        className="zoom-close"
                        onClick={() => setZoomOpen(false)}
                    >
                        ×
                    </button>

                    <div
                        className={`zoom-frame ${isPanning ? "panning" : ""}`}
                        ref={zoomFrameRef}
                        onMouseDown={(e) => {
                            const frame = zoomFrameRef.current;
                            if (!frame) return;

                            setIsPanning(true);
                            setPanStart({
                                x: e.clientX,
                                y: e.clientY,
                                scrollLeft: frame.scrollLeft,
                                scrollTop: frame.scrollTop,
                            });
                        }}
                        onMouseMove={(e) => {
                            if (!isPanning) return;

                            const frame = zoomFrameRef.current;
                            if (!frame) return;

                            const walkX = e.clientX - panStart.x;
                            const walkY = e.clientY - panStart.y;

                            frame.scrollLeft = panStart.scrollLeft - walkX;
                            frame.scrollTop = panStart.scrollTop - walkY;
                        }}
                        onMouseUp={() => setIsPanning(false)}
                        onMouseLeave={() => setIsPanning(false)}
                    >
                        <img
                            src={
                                product.imageUrl
                                    ? `http://localhost:8080${product.imageUrl}`
                                    : "/no-image.png"
                            }
                            alt={product.name}
                            className="zoom-image"
                            style={{
                                width: `${zoomLevel * 100}%`,
                            }}
                            draggable="false"
                        />
                    </div>

                    <div className="zoom-slider-panel">
                        <input
                            className="zoom-slider"
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={zoomLevel}
                            onChange={(e) => setZoomLevel(Number(e.target.value))}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProductPage;