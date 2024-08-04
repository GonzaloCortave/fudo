import { Route, Routes } from "react-router-dom";

import { AppProviders } from "@/appProviders";
import Home from "@/pages/home/Home";
import Header from "@/components/Header/Header";

export const AppRouter = () => {
    return (
        <AppProviders>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
            </Routes>
            <footer>this is the footer</footer>
        </AppProviders>
    );
};
