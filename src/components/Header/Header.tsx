import { useForm } from "react-hook-form";

import { useNews } from "@/appProviders/NewsProvider/NewsProvider";
import "./Header.css";

const SEARCH_TERM = "searchTerm";

type SearchForm = {
    [SEARCH_TERM]: string;
};

const Header = () => {
    const { fetchNews } = useNews();
    const { register, handleSubmit } = useForm<SearchForm>({
        defaultValues: {
            [SEARCH_TERM]: "",
        },
    });
    const onSubmit = (searchFormData: SearchForm) => {
        fetchNews(searchFormData[SEARCH_TERM]);
    };

    return (
        <header className="Header">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <input {...register(SEARCH_TERM)} placeholder="search" />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};

export default Header;
