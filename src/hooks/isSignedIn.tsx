import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const useIsSignedIn = () => {
  const { userData } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const getUserfromLocalStorage = localStorage.getItem("@Auth:accessToken")
      ? localStorage.getItem("@Auth:accessToken")
      : null;
    setAccessToken(getUserfromLocalStorage);
  }, []);
  return userData && accessToken ? true : false;
};

export default useIsSignedIn;
