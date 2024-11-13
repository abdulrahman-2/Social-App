"use server";

import { api } from "./api";

export const getPosts = async (page: number) => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=10`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};
