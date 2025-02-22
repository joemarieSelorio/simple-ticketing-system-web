const UserDashboard = () => {
  // Sample ticket data
  const tickets = [
    {
      id: "TICKET-1234",
      title: "Unable to access cloud storage",
      priority: "High",
      status: "Open",
      created: "2024-02-22",
      description: "Users reporting intermittent access issues with cloud storage system",
      assignee: "John Doe"
    },
    {
      id: "TICKET-1235",
      title: "Dashboard loading slow",
      priority: "Medium",
      status: "In Progress",
      created: "2024-02-22",
      description: "Main dashboard taking >10s to load for some users",
      assignee: "Jane Smith"
    },
    {
      id: "TICKET-1236",
      title: "Update payment gateway",
      priority: "Low",
      status: "Pending",
      created: "2024-02-21",
      description: "Implement new payment gateway API integration",
      assignee: "Mike Johnson"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-blue-100 text-blue-800"
    };
    return colors[priority];
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: "bg-purple-100 text-purple-800",
      "In Progress": "bg-green-100 text-green-800",
      Pending: "bg-orange-100 text-orange-800",
      Closed: "bg-gray-100 text-gray-800"
    };
    return colors[status];
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-500 mt-1">Manage your support tickets</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Ticket
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                  <span className="text-sm text-gray-500">{ticket.id}</span>
                </div>
                <p className="text-gray-600 text-sm">{ticket.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {ticket.assignee}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {ticket.created}
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;