import { Route, Routes } from "react-router-dom";

import { AppProviders } from "@/appProviders";
import Home from "@/pages/Home/Home";
import Header from "@/components/Header/Header";
import ArticleContent from "@/pages/ArticleContent/ArticleContent";
import Footer from "@/components/Footer/Footer";

export const AppRouter = () => {
    return (
        <AppProviders>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ArticleContent />} path="/article-content" />
            </Routes>
            <Footer />
        </AppProviders>
    );
};
