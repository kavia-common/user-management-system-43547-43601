import React from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * Pagination
 * @param {{page:number, pageSize:number, total:number, onPageChange:(n:number)=>void}} props
 */
export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / (pageSize || 10)));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="op-pagination" role="navigation" aria-label="Pagination">
      <Button variant="neutral" size="sm" onClick={() => canPrev && onPageChange(page - 1)} aria-disabled={!canPrev}>
        Previous
      </Button>
      <span className="op-pagination-info" aria-live="polite">
        Page {page} of {totalPages}
      </span>
      <Button variant="neutral" size="sm" onClick={() => canNext && onPageChange(page + 1)} aria-disabled={!canNext}>
        Next
      </Button>
    </div>
  );
}
