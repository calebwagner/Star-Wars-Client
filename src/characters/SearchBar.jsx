export const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">character search</span>
        </label>
        <input
            type="text"
            id="character-search"
            placeholder="character search"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);