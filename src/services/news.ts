import { apiService } from "./api";

import { News } from "@/types/news";

type GetNewsResponse = {
    articles: News;
    status: string;
    totalResults: number;
};

const NEWS_URL = import.meta.env.VITE_NEWS_API_URL;

const filterValidNews = (news: News) => {
    return news.filter((article) => {
        //I decide not to use entries/values object methods because,
        //I think is more readable to use destructuring and also I don't know if in the future
        //I have a dif response from the api
        const { source, ...resValues } = article;

        const isValueValid = (value: string | null) => {
            if (value === null) return false;
            if (typeof value === "string")
                return value && value !== "" && !value.includes("[Removed]");

            return true;
        };

        const isSourceValid = (source: { name: string } | null) => {
            if (source && typeof source === "object" && "name" in source) {
                const { name } = source;

                return name && name !== "" && !name.includes("[Removed]");
            }

            return true;
        };

        return Object.values(resValues).every(isValueValid) && isSourceValid(source);
    });
};

export const getNewsBySearchTerm = async (searchTerm: string) => {
    const res = await apiService<GetNewsResponse>({
        hostname: NEWS_URL,
        pathname: "everything",
        query: {
            q: searchTerm,
            sortBy: "relevancy",
            apiKey: "8ab9f6a80b5241b4ba7f0b3938ea683e",
        },
    });

    return filterValidNews(res.articles);
};

export const getTopHeadlinesNews = async () => {
    const res = await apiService<GetNewsResponse>({
        hostname: NEWS_URL,
        pathname: "top-headlines",
        query: {
            country: "us",
            sortBy: "publishedAt",
            pageSize: 100,
            apiKey: "8ab9f6a80b5241b4ba7f0b3938ea683e",
        },
    });

    return filterValidNews(res.articles);
};

// const getCountryCode = async () => {
//   const response = await fetch("https://ipapi.co/json/");
//   const data = await response.json();
//   return data.country.toLowerCase();
// };
