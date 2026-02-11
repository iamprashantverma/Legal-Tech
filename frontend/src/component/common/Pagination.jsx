import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {

  if (totalPages <= 1) return null;
  
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page <strong>{currentPage}</strong> of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
