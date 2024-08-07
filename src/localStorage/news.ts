import { News } from "@/types/news";

const NEWS = "news";

export const saveNewsToLocalStorage = (news: News) => {
    localStorage.setItem(NEWS, JSON.stringify(news));
};

export const getNewsFromLocalStorage = (): News => {
    const news = localStorage.getItem(NEWS);

    return news ? JSON.parse(news) : [];
};
