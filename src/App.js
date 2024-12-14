import React, { useState, useEffect } from 'react';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import Pagination from './components/Pagination';
import './styles/App.module.css';  

function App() {
  // State initialization
  const [characters, setCharacters] = useState([]);  // Tüm karakterleri tutar
  const [filteredCharacters, setFilteredCharacters] = useState([]);  // Filtrelenmiş karakterleri tutar
  const [selectedCharacter, setSelectedCharacter] = useState(null);  // Seçilen karakteri tutar
  const [loading, setLoading] = useState(true);  // Yükleniyor durumu
  const [page, setPage] = useState(1);  // Şu anki sayfa numarasını tutar
  const [totalPages, setTotalPages] = useState(1);  // Toplam sayfa sayısını tutar
  const [error, setError] = useState(null);  // Hata mesajı tutar
  const [filterInput, setFilterInput] = useState('');  // İsimle filtreleme için input
  const [sortOption, setSortOption] = useState('');  // Sıralama seçeneği
  const [statusFilter, setStatusFilter] = useState('');  // Durumla filtreleme
  const [speciesFilter, setSpeciesFilter] = useState('');  // Türle filtreleme
  const [genderFilter, setGenderFilter] = useState('');  // Cinsiyetle filtreleme
  const [pageSize, setPageSize] = useState(10);  // Sayfa başına karakter sayısı
  const pageSizeOptions = [5, 10, 20];  // Sayfa başına seçenekler

  // Sayfa yüklendiğinde tüm karakterleri çekmek için useEffect
  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        let allCharacters = [];
        let nextUrl = 'https://rickandmortyapi.com/api/character';  // API'nin başlangıç URL'si

        // Sayfalı veri çekme işlemi
        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data = await response.json();
          allCharacters = allCharacters.concat(data.results);  // Sonuçları birleştir
          nextUrl = data.info.next;  // Sonraki sayfanın URL'sini al
        }

        setCharacters(allCharacters);  // Tüm karakterleri state'e kaydet
      } catch (error) {
        setError('Error fetching data. Please try again later.');  // Hata mesajını göster
      } finally {
        setLoading(false);
      }
    };

    getAllCharacters();  // Karakterleri çek
  }, []);  // Bu effect yalnızca bileşen ilk yüklendiğinde çalışacak

  // Filtreleme ve sıralama işlemleri için useEffect
  useEffect(() => {
    let filtered = [...characters];  // Başlangıçta tüm karakterleri kopyala

    // İsimle filtreleme
    if (filterInput) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    // Durumla filtreleme
    if (statusFilter) {
      filtered = filtered.filter((character) =>
        character.status.toLowerCase() === statusFilter
      );
    }

    // Türle filtreleme
    if (speciesFilter) {
      filtered = filtered.filter((character) =>
        character.species.toLowerCase() === speciesFilter.toLowerCase()
      );
    }

    // Cinsiyetle filtreleme
    if (genderFilter) {
      filtered = filtered.filter((character) =>
        character.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Sıralama işlemi
    if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));  // İsim sırasına göre sıralama
    }

    setFilteredCharacters(filtered);  // Filtrelenmiş karakterleri state'e kaydet
    setTotalPages(Math.ceil(filtered.length / pageSize));  // Toplam sayfa sayısını hesapla
  }, [characters, filterInput, statusFilter, speciesFilter, genderFilter, sortOption, pageSize]);

  // Sayfalandırma için filtrelenmiş karakterlerden yalnızca mevcut sayfaya ait karakterleri seç
  const paginatedCharacters = filteredCharacters.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Sonuç bulunamadı durumunu kontrol et
  const noResults = filteredCharacters.length === 0;  

  // Filtre input değiştiğinde state'i güncelle
  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value);
    setPage(1);  // Filtreleme yapıldığında sayfayı başa al
  };

  // Sıralama seçeneği değiştiğinde state'i güncelle
  const handleSortOptionChange = (value) => {
    setSortOption(value);
    setPage(1);  // Sıralama değiştiğinde sayfayı başa al
  };

  // Durum filtresi değiştiğinde state'i güncelle
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);  // Durum değiştiğinde sayfayı başa al
  };

  // Tür filtresi değiştiğinde state'i güncelle
  const handleSpeciesFilterChange = (event) => {
    setSpeciesFilter(event.target.value);
    setPage(1);  // Tür değiştiğinde sayfayı başa al
  };

  // Cinsiyet filtresi değiştiğinde state'i güncelle
  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
    setPage(1);  // Cinsiyet değiştiğinde sayfayı başa al
  };

  // Sayfa boyutu değiştiğinde state'i güncelle
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);  // Sayfa boyutu değiştiğinde sayfayı başa al
  };

  // Filtreleri sıfırlama işlemi
  const clearFilters = () => {
    setFilterInput('');
    setSortOption('');
    setStatusFilter('');
    setSpeciesFilter('');
    setGenderFilter('');
    setPage(1);  // Filtreler sıfırlandığında sayfayı başa al
  };

  return (
    <div>
      <h1 className="text">Rick and Morty Characters</h1>

      <div>
        {/* İsimle filtreleme input */}
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterInput}
          onChange={handleFilterInputChange}
        />
        <button onClick={() => setFilterInput(filterInput)}>Search</button>

        {/* Sayfa başına karakter sayısı seçimi */}
        <select value={pageSize} onChange={handlePageSizeChange}>
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>

        {/* Durum filtresi */}
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Tür filtresi */}
        <select value={speciesFilter} onChange={handleSpeciesFilterChange}>
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
        </select>

        {/* Cinsiyet filtresi */}
        <select value={genderFilter} onChange={handleGenderFilterChange}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </select>

        {/* Filtreleri sıfırlama butonu */}
        <button onClick={clearFilters}>Clear Filters</button>

        {/* İsim sırasına göre sıralama butonu */}
        <button onClick={() => handleSortOptionChange('name')}>Sort by Name</button>
      </div>

      {/* Yükleniyor veya hata durumu */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Tabloyu ve detayları göstermek */}
      {!loading && !error && (
        <div className="centered-container">
          <div className="table-container">
            {/* Sonuç bulunamadığında mesaj */}
            {noResults ? (
              <h2 className="no-results-message">
                No characters match your filters. Please try different criteria.
              </h2>
            ) : (
              <CharacterTable
                characters={paginatedCharacters}
                onCharacterSelect={setSelectedCharacter}
              />
            )}
          </div>
        </div>
      )}

      {/* Sayfalama bileşeni */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Seçilen karakterin detayları */}
      <CharacterDetail character={selectedCharacter} />
    </div>
  );
}

export default App;
