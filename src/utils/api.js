import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
});

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, headers, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        headers,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (token) => ({
        url: "post",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const { useGetPostQuery } = api;
