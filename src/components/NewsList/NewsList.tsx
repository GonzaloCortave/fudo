import Article from "../Article/Article";

import { News } from "@/types/news";
import "./NewsList.css";

type NewsListProps = {
    news: News;
};

export const NewsList = ({ news }: NewsListProps) => (
    <div className="NewsList">
        {news.map((article, index) => (
            <Article key={article.title + index} article={article} />
        ))}
    </div>
);
