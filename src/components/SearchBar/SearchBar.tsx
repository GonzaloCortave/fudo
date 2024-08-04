import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

import { useNews } from "@/appProviders/NewsProvider/NewsProvider";
import "./SearchBar.css";

const SEARCH_TERM = "searchTerm";

type SearchForm = {
    [SEARCH_TERM]: string;
};

const SearchBar = () => {
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
        <form className="SearchBar" onSubmit={handleSubmit(onSubmit)}>
            <input {...register(SEARCH_TERM)} placeholder="search" />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchBar;
