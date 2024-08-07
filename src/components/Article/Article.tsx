import { useNavigate } from "react-router-dom";

import { Article as ArticleType } from "../../types/news";

import "./Article.css";
import { formatDate } from "@/utils/date";

type ArticleProps = { article: ArticleType };

const Article = ({ article }: ArticleProps) => {
    const { title, description, author, urlToImage, publishedAt } = article;
    const navigate = useNavigate();
    const handleArticleClick = () => {
        navigate("/article-content", {
            state: article,
        });
    };

    return (
        <div className="Article">
            <img alt={`Image: ${title}`} className="Article__img" src={urlToImage} />
            <div className="Article__content">
                <h2>{title}</h2>
                <p>{description}</p>
                {author && <p>Authors: {author}</p>}
                <div className="Article__content__footer">
                    <button onClick={handleArticleClick}> Read complete note</button>
                    <p>{formatDate(publishedAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default Article;
