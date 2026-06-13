

function PageHero({ kicker, title, highlight, description }) {
    return (
        <section className="page-hero">
            <img src="/about/bow.png" alt="" className="page-hero-bow" />
            <img src="/about/cat-bg.png" alt="" className="page-hero-cat" />

            {Array.from({ length: 12 }, (_, index) => (
                <img
                    key={index}
                    src="/about/sparkle.png"
                    alt=""
                    className={`page-hero-sparkle page-hero-sparkle-${index + 1}`}
                />
            ))}

            <img src="/about/heart.png" alt="" className="page-hero-heart page-hero-heart-1" />
            <img src="/about/heart.png" alt="" className="page-hero-heart page-hero-heart-2" />
            <img src="/about/heart.png" alt="" className="page-hero-heart page-hero-heart-3" />

            <p className="page-hero-kicker">
                <img src="/about/heart.png" alt="" />
                {kicker}
            </p>

            <h1>
                {title} {highlight && <span>{highlight}</span>}
                <img src="/about/heart.png" alt="" className="page-hero-title-heart" />
            </h1>

            <div className="page-hero-divider">
                <span></span>
                <img src="/about/bow.png" alt="" />
                <span></span>
            </div>

            <p className="page-hero-text">{description}</p>
        </section>
    );
}

export default PageHero;