import React from "react";

import { NewsList } from "@/components/NewsList/NewsList";
import { useNews } from "@/appProviders/NewsProvider/NewsProvider";

const Home: React.FC = () => {
    const { news, isLoading } = useNews();

    return isLoading ? <div>Loading...</div> : <NewsList news={news} />;
};

export default Home;
