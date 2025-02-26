import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";
import { loginUser, resetStatus } from "../store/slices/authSlice";

const useAuth = () => {
  const { isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const loginDispatch = useCallback(
    async (credentials) => {
      return await dispatch(loginUser(credentials));
    },
    [dispatch]
  );

  const cleanUpStatusDispatch = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      error,
      loginDispatch,
      cleanUpStatusDispatch,
    }),
    [isAuthenticated, isLoading, error, loginDispatch, cleanUpStatusDispatch]
  );
};

export default useAuth;