export const SearchBar = ({ searchQuery, setSearchQuery }) => {

    return (
        <form className="form-group has-search">
            <label htmlFor="header-search">
                <span className="">
                    Star War Character Search
                </span>
            </label>
            <input
                className="form-control"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="type name"
                name="s"
            />
        </form>
    );
};

