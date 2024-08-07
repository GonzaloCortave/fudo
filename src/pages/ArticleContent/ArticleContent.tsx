import { Article } from "@/types/news";

import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import "./ArticleContent.css";
import { formatDate } from "../../utils/date";

const ArticleContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { author, content, description, publishedAt, source, url, title, urlToImage } =
        state as Article;

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="ArticleContent">
            <button className="ArticleContent__arrow" onClick={handleGoBack}>
                <IoArrowBackOutline />
            </button>
            {urlToImage && <img alt={title} src={urlToImage} />}
            <h1>{title}</h1>
            <p>Description: {description}</p>
            <p>Content: {content}</p>
            <div className="ArticleContent--info">
                <p>Authors: {author}</p>
                <p>Published at: {formatDate(publishedAt)}</p>
                <p>Source: {source.name}</p>
                <a href={url}>Read the original article</a>
            </div>
        </div>
    );
};

export default ArticleContent;
