import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRefreshMutation } from "../../store/features/auth/authApiSlice";
import { logout, setCredentials } from "../../store/features/auth/authSlice";
import { useAppSelector } from "./useAppSelector";

const useAuthenticatedRoute = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();
  const tryRefreshToken = async () => {
    try {
      const userData = await refresh({ refreshToken }).unwrap();
      dispatch(setCredentials({ ...userData }));
    } catch (error) {
      router.push("/");
      dispatch(logout());
    }
  };
  useEffect(() => {
    try {
      verify(accessToken || "", process.env.NEXT_PUBLIC_JWT_SECRET || "");
      setLoading(false);
    } catch (error: any) {
      const { name } = error;
      if (name === "TokenExpiredError") {
        tryRefreshToken();
        setLoading(false);
      } else {
        router.push("/");
        dispatch(logout());
      }
    }
  }, []);
  return loading;
};

export default useAuthenticatedRoute;
