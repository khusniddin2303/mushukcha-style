import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import { translations } from "./i18n/translations";

function App() {
    const location = useLocation();

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("mushukcha_language") || "en";
    });

    useEffect(() => {
        localStorage.setItem("mushukcha_language", language);
    }, [language]);

    const t = translations[language] || translations.en;

    return (
        <>
            <Toaster position="top-right" />

            <ScrollToTop />

            {!location.pathname.startsWith("/admin") && (
                <Navbar
                    language={language}
                    setLanguage={setLanguage}
                    t={t.navbar}
                />
            )}

            <Routes>
                <Route
                    path="/"
                    element={<HomePage t={t.home} language={language} />}
                />

                <Route
                    path="/products"
                    element={
                        <ProductsPage
                            heroT={t.pageHero.products}
                            pageT={t.productsPage}
                            language={language}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <ProductPage
                            pageT={t.productPage}
                            language={language}
                        />
                    }
                />

                <Route
                    path="/categories"
                    element={
                        <CategoriesPage
                            heroT={t.pageHero.categories}
                            pageT={t.categoriesPage}
                            language={language}
                        />
                    }
                />

                <Route
                    path="/news"
                    element={
                        <NewsPage
                            heroT={t.pageHero.news}
                            pageT={t.newsPage}
                            language={language}
                        />
                    }
                />

                <Route
                    path="/about"
                    element={
                        <AboutPage
                            heroT={t.pageHero.about}
                            pageT={t.aboutPage}
                            language={language}
                        />
                    }
                />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>

            {!location.pathname.startsWith("/admin") && (
                <Footer t={t.footer} />
            )}

            <ToastContainer position="top-right" autoClose={5500} />
        </>
    );
}

export default App;