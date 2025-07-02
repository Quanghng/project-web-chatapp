// src/lib/api/auth.ts

import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { gql } from "@apollo/client";
import { client } from "@/main";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Ensure BASE_URL is defined and has a default fallback for development
// This check helps prevent errors if the env var isn't loaded correctly
if (!BASE_URL) {
  console.warn("VITE_API_BASE_URL is not set. Falling back to localhost for development.");
  // Provide a fallback for local development if the .env.local file isn't used
  // Or if you run it directly without a build that injects env vars.
  // However, for Vite, it's usually picked up from .env files automatically.
  // For production builds, this should *always* be provided by Render.
  // Consider replacing with an error or a clearer dev URL.
  // For now, let's assume it's correctly provided by Render / Vite.
}

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, { email, password });
    const { accessToken, refreshToken } = res.data;
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const userId = decoded.sub;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("isLoggedIn", "true");

    console.log("Registration successful:", res.data);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Something failed:", axiosError.response?.data || axiosError.message);
    throw error;
  }
}

const GET_USER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

export async function loginUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
    const { accessToken, refreshToken } = res.data;
    const decoded = jwtDecode<{ sub: number }>(accessToken);
    const userId = decoded.sub;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("isLoggedIn", "true");

    const { data } = await client.query({
      query: GET_USER,
      variables: { id: userId },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    const user = data.getUser;
    localStorage.setItem("firstName", user.firstName || "");
    localStorage.setItem("lastName", user.lastName || "");
    localStorage.setItem("email", user.email);

    return res.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
}
