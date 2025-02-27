import PropTypes from "prop-types";

const TicketList = ({ tickets, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Submitted Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {ticket.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{ticket.description}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    ticket.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : ticket.status === "priority"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                <div className="flex flex-col gap-1">
                  <span>
                    Assigned To:{" "}
                    <span className="font-medium text-gray-900">
                      {ticket.assignedTo.email}
                    </span>
                  </span>
                  <span>
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TicketList;
