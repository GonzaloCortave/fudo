import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import cx from "classnames";

import { useNews } from "@/appProviders/NewsProvider/NewsProvider";

import "./SearchBar.css";
import { useLocation, useNavigate } from "react-router-dom";

import { useOffline } from "@/appProviders/OfflineModeProvider/OfflineModeProvider";

const SEARCH_TERM = "searchTerm";

type SearchForm = {
    [SEARCH_TERM]: string;
};

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchNews } = useNews();
    const { isOffline } = useOffline();
    const { register, handleSubmit } = useForm<SearchForm>({
        defaultValues: {
            [SEARCH_TERM]: "",
        },
    });
    const onSubmit = (searchFormData: SearchForm) => {
        if (location.pathname !== "/") {
            navigate("/");
        }
        fetchNews(searchFormData[SEARCH_TERM]);
    };

    return (
        <form
            className={cx("SearchBar", {
                "SearchBar--offline": isOffline,
            })}
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                {...register(SEARCH_TERM, {
                    disabled: isOffline,
                })}
                placeholder="search"
            />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    );
};

export default SearchBar;
