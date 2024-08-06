import React from "react";

import "./Home.css";
import { NewsList } from "@/components/NewsList/NewsList";
import { useNews } from "@/appProviders/NewsProvider/NewsProvider";

const Home: React.FC = () => {
    const { news, isLoading } = useNews();

    return (
        <main className="Home">
            {isLoading ? <div>Loading...</div> : <NewsList news={news} />}{" "}
        </main>
    );
};

export default Home;
