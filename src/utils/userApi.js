import { api } from "./api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (token) => ({
        url: "/profile",
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSpecificProfile: builder.query({
      query: ({ token, userId }) => ({
        url: `/profile/${userId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getFollwingProfile: builder.query({
      query: (token) => ({
        url: "/user/followingProfile",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getSessionId: builder.query({
      query: ({ token, userId }) => ({
        url: "/user/sessionId",
        method: "POST",
        headers: { Authorization: `Brearer ${token}` },
        body: { userId },
      }),
    }),
    getMessages: builder.query({
      query: ({ token, userId }) => ({
        url: "/user/messages",
        method: "GET",
        headers: { Authorization: `Brearer ${token}` },
        body: { userId },
      }),
    }),
    follow: builder.mutation({
      query: ({ token, userId }) => ({
        url: `/user/follow/${userId}`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    unfollow: builder.mutation({
      query: (token) => ({
        url: "/user/follow",
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    createProfile: builder.mutation({
      query: ({
        token,
        firstName,
        lastName,
        userName,
        bio,
        gender,
        profilePicture,
        dob,
      }) => ({
        url: "/profile",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          first_name: firstName,
          last_name: lastName,
          user_name: userName,
          bio: bio,
          gender: gender,
          profile_picture: profilePicture,
          dob: dob,
        },
        maxBodyLength: 6000000,
        maxContentLength: 6000000,
      }),
    }),
    updateProfile: builder.mutation({
      query: ({
        token,
        firstName,
        lastName,
        userName,
        bio,
        gender,
        profilePicture,
        dob,
      }) => ({
        url: "/profile",
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          first_name: firstName,
          last_name: lastName,
          user_name: userName,
          bio: bio,
          gender: gender,
          profile_picture: profilePicture,
          dob: dob,
        },
        maxBodyLength: 6000000,
        maxContentLength: 6000000,
      }),
    }),
  }),
});

export const {
  useLazyGetProfileQuery,
  useCreateProfileMutation,
  useGetSessionIdQuery,
  useGetFollwingProfileQuery,
  useLazyGetSpecificProfileQuery,
  useGetSpecificProfileQuery,
  useUpdateProfileMutation,
  useFollowMutation,
  useUnfollowMutation,
} = userApi;
