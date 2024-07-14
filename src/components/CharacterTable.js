import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CharacterTable.module.css';

const CharacterTable = ({ characters, onCharacterSelect }) => {
  return (
    <table className={styles.characterTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Origin</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(character => (
          <tr key={character.id} onClick={() => onCharacterSelect(character)}>
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
            <td>{character.gender}</td>
            <td>{character.origin.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CharacterTable.propTypes = {
  characters: PropTypes.array.isRequired, // Prop types validation for characters array
  onCharacterSelect: PropTypes.func.isRequired, // Prop types validation for onCharacterSelect function
};

// CharacterTable component displays a table of characters with clickable rows to select a character.
export default CharacterTable;
