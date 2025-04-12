import { Post, User } from "@/types/types";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
  headers: {
    Accept: "application/json",
  },
});

// Fetch Posts
export const getPosts = async (page: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=8`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch posts.");
  }
};

// Fetch Single Post
export const getSinglePost = async (id: number): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching post:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch post.");
  }
};

// Fetch Single User
export const getSingleUser = async (userId: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching user:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user.");
  }
};

// User Posts
export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user posts."
    );
  }
};
