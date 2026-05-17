import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")
  }
  return null
}

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  id: string
  name: string
  email: string
}

interface ProfileResponse {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
}

interface UpdateProfileRequest {
  name?: string
  bio?: string
  location?: string
}

export interface Post {
  id: string
  title: string
  destination: string
  travelDate: string
  budget: number
  description: string
  peopleNeeded: number
  createdBy: string
  user: {
    id: string
    name: string
    avatar: string
    location: string
  }
  image: string
  tags: string[]
  likes: number
  comments: number
  createdAt: string
}

interface CreatePostResponse {
  post: Post
  message: string
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Profile", "Posts"],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
    }),

    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/api/user/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/api/user/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    uploadAvatar: builder.mutation<{ avatar: string }, FormData>({
      query: (formData) => ({
        url: "/api/user/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    getPosts: builder.query<Post[], void>({
      query: () => "/api/posts",
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (formData) => ({
        url: "/api/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
})

export const {
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetPostsQuery,
  useCreatePostMutation,
} = api
