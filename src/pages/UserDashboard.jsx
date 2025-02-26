import { useState, useEffect } from "react";
import TicketList from "../components/ui/TicketList";
import TicketForm from "../components/layouts/TicketForm";
import useTickets from "../hooks/useTicket";

const UserDashboard = () => {
  const {
    tickets,
    totalItems,
    limit,
    getTicketListDispatch,
    getTicketListError,
    isLoading,
  } = useTickets();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getTicketListDispatch({ page: currentPage, limit });
    };
    fetchData();
  }, [getTicketListDispatch, currentPage, limit, refreshTrigger]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTicketCreated = () => {
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1); // ✅ Forces `useEffect` to run
  };


  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Ticket
          </button>
        </div>

        {/* Error Message */}
        {getTicketListError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{getTicketListError}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <TicketList
            tickets={tickets}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Modal form */}
        {showForm && (
          <TicketForm
            onClose={() => setShowForm(false)}
            onTicketCreated={handleTicketCreated}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
