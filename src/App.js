import React, { useState, useEffect } from 'react';
import fetchCharacters from './api/fetchCharacters';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import Pagination from './components/Pagination';
import styles from './styles/App.module.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [filterInput, setFilterInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [pageSize, setPageSize] = useState(10); // Default page size, can be adjusted
  const pageSizeOptions = [5, 10, 20, 50]; // Options for page size selection

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacters(page, pageSize);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [page, pageSize]);

  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(filterInput.toLowerCase())
    );

    if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'age') {
      filtered.sort((a, b) => a.age - b.age);
    }

    setFilteredCharacters(filtered);
  }, [characters, filterInput, sortOption]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset page to 1 when page size changes
  };

  return (
    <div className={styles.container}>
      <h1>Rick and Morty Characters</h1>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterInput}
          onChange={handleFilterInputChange}
          className={styles.formControl}
        />
        <select value={sortOption} onChange={handleSortOptionChange} className={styles.formControl}>
          <option value="">Sort by...</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
        <select value={pageSize} onChange={handlePageSizeChange} className={styles.formControl}>
          {pageSizeOptions.map(option => (
            <option key={option} value={option}>{option} per page</option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <>
          <CharacterTable characters={filteredCharacters} onCharacterSelect={setSelectedCharacter} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          <CharacterDetail character={selectedCharacter} />
        </>
      )}
    </div>
  );
}

export default App;
