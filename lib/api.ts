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

interface JoinTripRequest {
  postId: string
}

interface CreatePostResponse {
  post: Post
  message: string
}

interface UpdatePostRequest {
  title?: string
  destination?: string
  travelDate?: string
  budget?: number
  description?: string
  peopleNeeded?: number
  tags?: string[]
}

interface RespondRequestParams {
  id: string
  status: "accepted" | "rejected"
}

export interface JoinRequest {
  _id: string
  post: {
    _id: string
    title: string
    destination: string
    image: string
  }
  sender: {
    _id: string
    name: string
    avatar: string
  }
  receiver?: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
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
  tagTypes: ["Profile", "Posts", "Requests"],
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
      transformResponse: (res: unknown) => {
        const raw: unknown[] =
          Array.isArray(res)
            ? res
            : (res as { posts?: unknown[] })?.posts || (res as { data?: unknown[] })?.data || []
        return raw.map((p) => {
          const post = (p || {}) as Record<string, unknown>
          return {
            id: (post._id as string) || '',
            title: (post.title as string) || '',
            destination: (post.destination as string) || '',
            travelDate: (post.travelDate as string) || '',
            budget: (post.budget as number) || 0,
            description: (post.description as string) || '',
            peopleNeeded: (post.peopleNeeded as number) || 0,
            createdBy: (post.createdBy as string) || '',
            user: {
              id: ((post.user as Record<string, unknown>)?.id as string) || '',
              name: ((post.user as Record<string, unknown>)?.name as string) || '',
              avatar: ((post.user as Record<string, unknown>)?.avatar as string) || '',
              location: ((post.user as Record<string, unknown>)?.location as string) || '',
            },
            image: (post.image as string) || '',
            tags: Array.isArray(post.tags) ? (post.tags as string[]) : [],
            likes: (post.likes as number) || 0,
            comments: (post.comments as number) || 0,
            createdAt: (post.createdAt as string) || '',
          } as Post
        })
      },
    }),

    joinTrip: builder.mutation<{ message: string }, JoinTripRequest>({
      query: (body) => ({
        url: "/api/join",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (formData) => ({
        url: "/api/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),

    getMyRequests: builder.query<JoinRequest[], void>({
      query: () => "/api/join/my-requests",
      providesTags: ["Requests"],
    }),

    getReceivedRequests: builder.query<JoinRequest[], void>({
      query: () => "/api/join/received-requests",
      providesTags: ["Requests"],
    }),

    respondToRequest: builder.mutation<{ message: string }, RespondRequestParams>({
      query: ({ id, status }) => ({
        url: `/api/join/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Requests", "Posts"],
    }),

    cancelRequest: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/join/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),

    getMyPosts: builder.query<Post[], void>({
      query: () => "/api/posts/my-trips",
      providesTags: ["Posts"],
      transformResponse: (res: unknown) => {
        const raw: unknown[] =
          Array.isArray(res)
            ? res
            : (res as { posts?: unknown[] })?.posts || (res as { data?: unknown[] })?.data || []
        return raw.map((p) => {
          const post = (p || {}) as Record<string, unknown>
          return {
            id: (post._id as string) || '',
            title: (post.title as string) || '',
            destination: (post.destination as string) || '',
            travelDate: (post.travelDate as string) || '',
            budget: (post.budget as number) || 0,
            description: (post.description as string) || '',
            peopleNeeded: (post.peopleNeeded as number) || 0,
            createdBy: (post.createdBy as string) || '',
            user: {
              id: ((post.user as Record<string, unknown>)?.id as string) || '',
              name: ((post.user as Record<string, unknown>)?.name as string) || '',
              avatar: ((post.user as Record<string, unknown>)?.avatar as string) || '',
              location: ((post.user as Record<string, unknown>)?.location as string) || '',
            },
            image: (post.image as string) || '',
            tags: Array.isArray(post.tags) ? (post.tags as string[]) : [],
            likes: (post.likes as number) || 0,
            comments: (post.comments as number) || 0,
            createdAt: (post.createdAt as string) || '',
          } as Post
        })
      },
    }),

    updatePost: builder.mutation<CreatePostResponse, { id: string; body: FormData | UpdatePostRequest }>({
      query: ({ id, body }) => ({
        url: `/api/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),

    getPostRequests: builder.query<JoinRequest[], void>({
      query: () => `/api/join/received-requests`,
      providesTags: ["Requests"],
      transformResponse: (res: unknown) => {
        const raw: unknown[] =
          Array.isArray(res)
            ? res
            : (res as { requests?: unknown[] })?.requests || (res as { data?: unknown[] })?.data || []
        return raw.map((r) => {
          const req = (r || {}) as Record<string, unknown>
          const senderObj = (req.sender || req.userId || req.user || {}) as Record<string, unknown>
          const postObj = (req.post || {}) as Record<string, unknown>
          return {
            _id: (req._id as string) || (req.id as string) || '',
            post: {
              _id: (postObj._id as string) || (postObj.id as string) || '',
              title: (postObj.title as string) || '',
              destination: (postObj.destination as string) || '',
              image: (postObj.image as string) || '',
            },
            sender: {
              _id: (senderObj._id as string) || (senderObj.id as string) || '',
              name: (senderObj.name as string) || '',
              avatar: (senderObj.avatar as string) || '',
            },
            receiver: (req.receiver as string) || '',
            status: (req.status as JoinRequest['status']) || 'pending',
            createdAt: (req.createdAt as string) || '',
          } as JoinRequest
        })
      },
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
  useJoinTripMutation,
  useGetMyRequestsQuery,
  useGetReceivedRequestsQuery,
  useCancelRequestMutation,
  useRespondToRequestMutation,
  useGetMyPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostRequestsQuery,
} = api
