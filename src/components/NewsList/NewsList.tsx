import Article from "../Article/Article";

import { News } from "@/types/news";
import "./NewsList.css";

type NewsListProps = {
    news: News;
};

export const NewsList = ({ news }: NewsListProps) => (
    <main className="NewsList">
        {news.map((article, index) => (
            <Article key={article.title + index} {...article} />
        ))}
    </main>
);
