import { api } from "./api";

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ token, postId, comment }) => ({
        url: `/post/comment/${postId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          comment: comment,
        },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ token, commentId }) => ({
        url: `/post/comment/${commentId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentApi;
