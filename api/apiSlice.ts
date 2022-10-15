import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthState } from "../models/authState";
import { RootState } from "../store";
import { setCredentials, logout } from "../store/features/auth/authSlice";
import { BASE_URL } from "./apis";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  //credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    //const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refreshToken: (api.getState() as RootState).auth.refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...(refreshResult.data as AuthState) }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
