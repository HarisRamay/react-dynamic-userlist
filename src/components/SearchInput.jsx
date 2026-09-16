export default function SearchInput({ search, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}