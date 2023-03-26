import { useSelector } from "react-redux";

const useAuth = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  if (!accessToken && !user) {
    return false;
  } else {
    return true;
  }
};

export default useAuth;
