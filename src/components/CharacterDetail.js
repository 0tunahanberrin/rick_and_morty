import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/CharacterDetail.module.css';

const CharacterDetail = ({ character }) => {
  if (!character) return null;

  return (
    <div className={styles.characterDetail}>
      <h2>{character.name}</h2>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Origin:</strong> {character.origin.name}</p>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

CharacterDetail.propTypes = {
  character: PropTypes.object.isRequired, // Prop types validation for character object
};

// CharacterDetail component displays detailed information about a character.
export default CharacterDetail;
