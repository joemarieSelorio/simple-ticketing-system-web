import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  createTicket,
  resetStatus,
  getUserSubmittedTickets,
  setLimit,
  setPage,
} from "../store/slices/ticketSlice";

const useTickets = () => {
  const {
    tickets,
    totalItems,
    limit,
    getTicketListError,
    createTicketError,
    isLoading,
    successMessage,
  } = useSelector((state) => state.tickets);

  const dispatch = useDispatch();

  const createTicketDispatch = useCallback(
    async (ticketData) => {
      try {
        await dispatch(createTicket(ticketData)).unwrap();
      } catch (err) {
        return err;
      }
    },
    [dispatch]
  );

  // Function to create a ticket
  const getTicketListDispatch = useCallback(
    async ({ page: currentPage, limit }) => {
      try {
        dispatch(getUserSubmittedTickets({ page: currentPage, limit }));
      } catch (err) {
        return err;
      }
    },
    [dispatch]
  );

  const cleanUpStatusDispatch = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  // Function to change page
  const changePage = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
    },
    [dispatch]
  );

  // Function to change limit per page
  const changeLimit = useCallback(
    (newLimit) => {
      dispatch(setLimit(newLimit));
    },
    [dispatch]
  );

  return {
    isLoading,
    getTicketListError,
    createTicketError,
    successMessage,
    createTicketDispatch,
    cleanUpStatusDispatch,
    getTicketListDispatch,
    changePage,
    changeLimit,
    tickets,
    totalItems,
    limit,
  };
};

export default useTickets;
