import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CharacterTable.module.css';

const CharacterTable = ({ characters, onCharacterSelect }) => {
  return (
    <table className={styles.characterTable}>
      <thead>
        <tr>
          <th>Name</th>  {/* Karakterin adının başlık hücresi */}
          <th>Status</th>  {/* Karakterin durumunun başlık hücresi */}
          <th>Species</th>  {/* Karakterin türünün başlık hücresi */}
          <th>Gender</th>  {/* Karakterin cinsiyetinin başlık hücresi */}
          <th>Origin</th>  {/* Karakterin kökeninin başlık hücresi */}
        </tr>
      </thead>
      <tbody>
        {characters.map(character => (
          <tr key={character.id} onClick={() => onCharacterSelect(character)}>
            {/* Her bir 'tr', karakter verisi için bir satırdır ve tıklandığında 'onCharacterSelect' fonksiyonunu tetikler */}
            <td>{character.name}</td>  {/* Karakterin adını içeren hücre */}
            <td>{character.status}</td>  {/* Karakterin durumunu içeren hücre */}
            <td>{character.species}</td>  {/* Karakterin türünü içeren hücre */}
            <td>{character.gender}</td>  {/* Karakterin cinsiyetini içeren hücre */}
            <td>{character.origin.name}</td>  {/* Karakterin kökeninin adını içeren hücre */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CharacterTable.propTypes = {
  characters: PropTypes.array.isRequired,  // 'characters' bir dizi olmalı ve gereklidir
  onCharacterSelect: PropTypes.func.isRequired,  // 'onCharacterSelect' bir fonksiyon olmalı ve gereklidir
};

export default CharacterTable;
