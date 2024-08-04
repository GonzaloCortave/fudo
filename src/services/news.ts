import { apiService } from "./api";

import { News } from "@/types/news";

type GetNewsResponse = {
    articles: News;
    status: string;
    totalResults: number;
};

//TODO: hacer una respuesta generica, para que no tenga que hacer try catch en cada llamada
export const getNewsBySearchTerm = async (searchTerm: string) => {
    const res = await apiService<GetNewsResponse>({
        hostname: "https://newsapi.org/v2/everything",
        query: {
            q: searchTerm,
            sortBy: "relevancy",
            apiKey: "8ab9f6a80b5241b4ba7f0b3938ea683e",
        },
    });

    return res.articles;
};
//TODO: ver como ver el pais.
export const getTopHeadlinesNews = async () => {
    const res = await apiService<GetNewsResponse>({
        hostname: "https://newsapi.org/v2/top-headlines",
        query: {
            country: "us",
            sortBy: "publishedAt",
            apiKey: "8ab9f6a80b5241b4ba7f0b3938ea683e",
        },
    });

    return res.articles;
};
