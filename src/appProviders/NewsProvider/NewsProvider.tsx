import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

import { useOffline } from "../OfflineModeProvider/OfflineModeProvider";

import { getNewsBySearchTerm, getTopHeadlinesNews } from "@/services/news";
import { News } from "@/types/news";
import { saveNewsToLocalStorage, getNewsFromLocalStorage } from "@/localStorage/news";

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
    const { isOffline } = useOffline();
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState<News>([]);

    const fetchFromLocalStorage = () => {
        const savedNews = getNewsFromLocalStorage();

        setNews(savedNews);
    };

    const fetchFromApi = async (searchTerm?: string) => {
        const newsRes = searchTerm
            ? await getNewsBySearchTerm(searchTerm)
            : await getTopHeadlinesNews();

        setNews(newsRes);
        saveNewsToLocalStorage(newsRes);
    };

    const fetchNews = async (searchTerm?: string) => {
        setIsLoading(true);
        try {
            if (isOffline) {
                fetchFromLocalStorage();
            } else {
                await fetchFromApi(searchTerm);
            }
        } catch (error) {
            setNews([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOffline) {
            const savedNews = getNewsFromLocalStorage();

            setNews(savedNews);
        } else {
            fetchNews();
        }
    }, [isOffline]);

    return (
        <NewsContext.Provider value={{ isLoading, news, fetchNews }}>
            {children}
        </NewsContext.Provider>
    );
};
