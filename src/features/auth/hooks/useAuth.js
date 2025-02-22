import { useSelector, useDispatch } from "react-redux";
import { loginUser, resetStatus } from "../authSlice";

const useAuth = () => {
  const { isSignedIn, isLoading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const loginDispatch = async (credentials) => {
    return await dispatch(loginUser(credentials));
  };


  const cleanUpStatusDispatch = () => {
    dispatch(resetStatus());
  };

  return {
    isSignedIn,
    isLoading,
    error,
    loginDispatch,
    cleanUpStatusDispatch,
  };
};

export default useAuth;
