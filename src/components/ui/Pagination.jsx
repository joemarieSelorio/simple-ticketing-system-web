import { PropTypes } from "prop-types";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Calculate page range to display
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Start with the current page at the center if possible
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-1">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        &laquo;
      </button>
      
      {/* First page if not in view */}
      {generatePageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            1
          </button>
          {generatePageNumbers()[0] > 2 && (
            <span className="px-2 py-1">...</span>
          )}
        </>
      )}
      
      {/* Page numbers */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Last page if not in view */}
      {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages && (
        <>
          {generatePageNumbers()[generatePageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2 py-1">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        &raquo;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;