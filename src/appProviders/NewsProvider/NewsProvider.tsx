// const [news, setNews] = useState<News>([]);

//   const fetchNews = async (searchTerm?: string) => {
//     try {
//       const newsRes = searchTerm
//         ? await getNewsBySearchTerm(searchTerm)
//         : await getTopHeadlinesNews();
//       setNews(newsRes);
//     } catch (error) {
//       console.error("error here", error);
//     }
//   };

//   useEffect(() => {
//     console.log("fetching news");
//     fetchNews();
//   }, []);
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

import { getNewsBySearchTerm, getTopHeadlinesNews } from "@/services/news";
import { News } from "@/types/news";

type NewsContextType = {
    news: News;
    isLoading: boolean;
    fetchNews: (searchTerm?: string) => void;
};

type NewsProviderProps = {
    children: React.ReactNode;
};

export const NewsContext = createContext({} as NewsContextType);

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }: NewsProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState<News>([]);

    const fetchNews = async (searchTerm?: string) => {
        setIsLoading(true);
        try {
            const newsRes = searchTerm
                ? await getNewsBySearchTerm(searchTerm)
                : await getTopHeadlinesNews();

            setNews(newsRes);
        } catch (error) {
            setNews([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ isLoading, news, fetchNews }}>
            {children}
        </NewsContext.Provider>
    );
};
