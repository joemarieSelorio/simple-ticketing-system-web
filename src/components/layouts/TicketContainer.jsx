import { useEffect, useState, useRef } from 'react';
import TicketList from '../ui/TicketList'; // Import your existing TicketList component
import Pagination from '../ui/Pagination'; // Import the Pagination component
import useTickets from '../../hooks/useTicket'; // Import your updated hook

const TicketListContainer = () => {
  const { 
    tickets, 
    pagination, 
    isLoading, 
    error, 
    getUserSubmittedTicketsDispatch, 
    handlePageChange, 
    handleLimitChange 
  } = useTickets();

  const [itemsPerPage, setItemsPerPage] = useState(pagination.limit);
  const prevTotalPagesRef = useRef(pagination.totalPages);

  useEffect(() => {
    // Fetch tickets on component mount
    getUserSubmittedTicketsDispatch();
  }, [getUserSubmittedTicketsDispatch]);

  useEffect(() => {
    // If total pages changed and current page is now greater than total pages,
    // adjust to the last page
    if (
      prevTotalPagesRef.current !== pagination.totalPages && 
      pagination.currentPage > pagination.totalPages && 
      pagination.totalPages > 0
    ) {
      handlePageChange(pagination.totalPages);
    }
    
    // Update the ref
    prevTotalPagesRef.current = pagination.totalPages;
  }, [pagination.totalPages, pagination.currentPage, handlePageChange]);

  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setItemsPerPage(newLimit);
    handleLimitChange(newLimit);
  };



  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700 mb-4">
        <p className="font-medium">Failed to load tickets</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Tickets</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {tickets.length > 0 ? (
        <>
          <TicketList tickets={tickets} />
          
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          <div className="mt-6 border-t pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500 gap-4">
              <p>
                Showing {tickets.length} of {pagination.totalItems} tickets
              </p>
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
          <p>No tickets found. Create your first ticket to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TicketListContainer;