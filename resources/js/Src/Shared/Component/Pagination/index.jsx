import React, { useState, useEffect } from 'react';
import style from "./index.module.css";

const PaginationComponent = ({ total, current, onChange }) => {
  const itemsPerPage = 5;

  const totalPages = Math.ceil(total / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(+current || 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onChange(page);
    }
  };

  return (
    <div className={style['pagination-component--wrap']}>
      <button className={style['pagination-component--button']} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button className={style['pagination-component--button']} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next
      </button>
      <span className='self-center'> {itemsPerPage} / page </span>
    </div>
  );
};

export default PaginationComponent;