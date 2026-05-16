import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation } = api
