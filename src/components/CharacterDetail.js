import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CharacterDetail.module.css';

const CharacterDetail = ({ character }) => {
  if (!character) return null;  // Eğer karakter yoksa hiçbir şey gösterme

  return (
    <div className={styles.characterDetail}>
      <h2>{character.name}</h2>  {/* Karakterin adı */}
      <p><strong>Status:</strong> {character.status}</p>  {/* Durum */}
      <p><strong>Species:</strong> {character.species}</p>  {/* Tür */}
      <p><strong>Gender:</strong> {character.gender}</p>  {/* Cinsiyet */}
      <p><strong>Origin:</strong> {character.origin.name}</p>  {/* Köken */}
      <img src={character.image} alt={character.name} />  {/* Karakterin görseli */}
    </div>
  );
};

// PropTypes ile 'character' objesinin zorunlu ve bir obje olduğunu belirtiyoruz.
CharacterDetail.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterDetail;
