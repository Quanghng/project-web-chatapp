// src/lib/api/auth.ts

import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { gql } from "@apollo/client";
import { client } from "@/main";

const BASE_URL = "http://localhost:3333";

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signup`, { email, password });
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
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, { email, password });
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
