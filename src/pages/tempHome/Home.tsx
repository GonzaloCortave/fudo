import React from "react";

import "./Home.css";
import { NewsList } from "@/components/NewsList/NewsList";
import { useNews } from "@/appProviders/NewsProvider/NewsProvider";
import Loader from "@/components/Loader/Loader";

const Home: React.FC = () => {
    const { news, isLoading } = useNews();

    return <main className="Home">{isLoading ? <Loader /> : <NewsList news={news} />} </main>;
};

export default Home;
