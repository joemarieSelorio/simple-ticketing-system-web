import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useUsers from "../../hooks/useUsers";
import useTickets from "../../hooks/useTicket";
import { ClipLoader } from "react-spinners";

const TicketForm = ({ onClose, onTicketCreated  }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "open",
    createdDate: new Date().toISOString().split("T")[0],
  });

  const [assignError, setAssignError] = useState(false);
  const { userList, getUserListDispatch } = useUsers();
  const {
    createTicketDispatch,
    createTicketError,
    isLoading,
    successMessage,
    cleanUpStatusDispatch,
  } = useTickets();

  useEffect(() => {
    const fetchData = async () => {
      await getUserListDispatch("admin");
    };
    fetchData();
  }, [getUserListDispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "assignee") {
      setAssignError(false);
    }
  };

  const submitTicket = async (ticketData) => {
    try {
      await createTicketDispatch(ticketData);
      setFormData({
        title: "",
        description: "",
        assignee: "",
      });
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  const handleDraft = async () => {
    const draftTicket = {
      ...formData,
      status: "created",
    };
    delete draftTicket.assignee;
    try {
      // Submit draft without assignee validation
      await submitTicket(draftTicket);
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.assignee) {
      setAssignError(true);
      return;
    }

    const submittedTicket = {
      ...formData,
      status: "submitted",
    };
    await submitTicket(submittedTicket);
    onTicketCreated(); 
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      cleanUpStatusDispatch();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded relative mt-1"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {createTicketError && (
          <div
            className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative mt-1"
            role="alert"
          >
            <span className="block sm:inline">{createTicketError}</span>
          </div>
        )}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Assign To{" "}
              {formData.status !== "created" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="" disabled hidden>
                Select an admin user
              </option>
              {userList.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
            {assignError && (
              <p className="text-red-500 text-sm mt-1">Please select an assignee.</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-6 space-x-3">
            <button
              type="button"
              onClick={handleDraft}
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              {isLoading ? (
                <ClipLoader size={24} color={"#ffffff"} loading={isLoading} />
              ) : (
                "Save as draft"
              )}
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              {isLoading ? (
                <ClipLoader size={24} color={"#ffffff"} loading={isLoading} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

TicketForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onTicketCreated: PropTypes.func.isRequired,
};

export default TicketForm;
