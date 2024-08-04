export type Source = {
    id: string | null;
    name: string;
};

export type Article = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type News = Article[];
