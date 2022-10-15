import { apiSlice } from "../../../api/apiSlice";
import { User } from "../../../models/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
