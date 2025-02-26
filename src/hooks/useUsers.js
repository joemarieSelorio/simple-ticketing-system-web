import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { getUsers, resetStatus } from "../store/slices/userSlice";

const useUsers = () => {
  const { error, isLoading, userList} = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const getUserListDispatch = useCallback(
    async (role) => {
      return await dispatch(getUsers({ role }));
    },
    [dispatch]
  );
  const cleanUpStatusDispatch = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return {
    isLoading,
    error,
    userList,
    getUserListDispatch,
    cleanUpStatusDispatch,
  };
};

export default useUsers;
