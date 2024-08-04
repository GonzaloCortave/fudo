import { Article } from "../../types/news";
import "./Article.css";

type ArticleProps = Article;

const Article = ({ title, description, author, urlToImage, publishedAt }: ArticleProps) => (
    <div className="Article">
        <img alt={`Image: ${title}`} className="Article__img" src={urlToImage} />
        <div className="Article__content">
            <h2>{title}</h2>
            <p>{description}</p>
            {author && <p>Author: {author}</p>}
            <div className="Article__content__footer">
                <button>Read Note</button>
                <p>
                    {new Date(publishedAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
    </div>
);

export default Article;
