import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Sayfa numaralarını oluşturmak için totalPages kadar bir dizi oluşturuyoruz
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className={styles.pagination}>
      {/* Sayfa numaralarını döngü ile oluşturuyoruz */}
      {pages.map(page => (
        <button
          key={page}  /* Her bir sayfa numarasına benzersiz bir 'key' ekliyoruz */
          className={page === currentPage ? styles.active : ''}  /* Eğer sayfa numarası aktif sayfa ise 'active' sınıfını ekliyoruz */
          onClick={() => onPageChange(page)} /* Sayfa numarasına tıklanırsa, onPageChange fonksiyonunu çağırıyoruz */
        >
          {page}  {/* Sayfa numarasını buton içinde görüntülüyoruz */}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,  // 'currentPage' bir sayı olmalı ve gereklidir
  totalPages: PropTypes.number.isRequired,  // 'totalPages' bir sayı olmalı ve gereklidir
  onPageChange: PropTypes.func.isRequired,  // 'onPageChange' bir fonksiyon olmalı ve gereklidir
};

export default Pagination;
