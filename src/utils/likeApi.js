import { api } from "./api";

const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query: ({ token, postId }) => ({
        url: `/post/like/${postId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteLike: builder.mutation({
      query: ({ token, postId }) => ({
        url: `/post/like/${postId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation } = likeApi;
