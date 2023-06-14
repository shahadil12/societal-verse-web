import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      }),
    }),
    logout: builder.query({
      query: (token) => ({
        url: "/auth/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          full_name: name,
          email: email,
          password: password,
        },
      }),
    }),
  }),
});

export const { useLazyGetLoginQuery, useLazyLogoutQuery, useRegisterMutation } =
  authApi;
