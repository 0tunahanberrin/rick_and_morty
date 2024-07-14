import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the page numbers to be rendered
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className={styles.pagination}>
      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? styles.active : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired, // Prop types validation for current page number
  totalPages: PropTypes.number.isRequired, // Prop types validation for total number of pages
  onPageChange: PropTypes.func.isRequired // Prop types validation for onPageChange function
};

// Pagination component displays a set of page buttons and allows changing the current page.
export default Pagination;
