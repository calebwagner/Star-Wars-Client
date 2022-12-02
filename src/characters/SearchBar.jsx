export const SearchBar = ({ searchQuery, setSearchQuery }) => {

    return (
        <form>
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Star War Character Search
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Darth Vader"
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    );
};

