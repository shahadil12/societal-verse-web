import { api } from "./api";

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (token) => ({
        url: "post",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Post"],
    }),
    getUserPost: builder.query({
      query: ({ token, postId }) => ({
        url: `/post/${postId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getSpecificProfilePost: builder.query({
      query: ({ token, userId }) => ({
        url: `/profile/showSpecificProfilePosts`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { userId },
      }),
    }),
    createPost: builder.mutation({
      query: ({ token, caption, picture }) => ({
        url: "/post",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          caption,
          picture,
        },
      }),
    }),
    updatePost: builder.mutation({
      query: ({ token, postId, caption, picture }) => ({
        url: `post/${postId}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          picture: picture,
          caption: caption,
        },
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useLazyGetUserPostQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useLazyGetSpecificProfilePostQuery,
  useGetSpecificProfilePostQuery,
} = postApi;
