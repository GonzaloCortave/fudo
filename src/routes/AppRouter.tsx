import { Route, Routes } from "react-router-dom";

import { AppProviders } from "@/appProviders";
import Home from "@/pages/Home/Home";
import Header from "@/components/Header/Header";
import ArticleContent from "@/pages/ArticleContent/ArticleContent";

export const AppRouter = () => {
    return (
        <AppProviders>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ArticleContent />} path="/article-content" />
            </Routes>
            <footer>this is the footer</footer>
        </AppProviders>
    );
};
