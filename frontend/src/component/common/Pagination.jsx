import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {
  if (totalPages <= 1) return null;

  const prevDisabled = currentPage === 1 || disabled;
  const nextDisabled = currentPage === totalPages || disabled;

  return (
    <div className="pagination">
      <button
        className={`pagination__btn ${prevDisabled ? "pagination__btn--disabled" : ""}`}
        disabled={prevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span className="pagination__info">
        Page <strong>{currentPage}</strong> of {totalPages}
      </span>

      <button
        className={`pagination__btn ${nextDisabled ? "pagination__btn--disabled" : ""}`}
        disabled={nextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
