export const SearchBar = ({ searchQuery, setSearchQuery }) => {

    return (
        <form className="form-group has-search w-50 mx-auto p-3">
            <label htmlFor="header-search">
                <h1 className="text-white">
                    Star War Character Search
                </h1>
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

