"use server";

import { Post, User, UserData } from "@/types/types";
import { api } from "./api";
import { revalidatePath } from "next/cache";
import { AxiosError } from "axios";

// Fetch Posts
export const getPosts = async (page: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=8`);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to fetch posts."
      );
    }
    throw new Error("Failed to fetch posts. Please try again.");
  }
};

// Fetch Single Post
export const getSinglePost = async (id: number): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching post:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to fetch post."
      );
    }
    throw new Error("Failed to fetch post. Please try again later.");
  }
};

// Fetch Single User
export const getSingleUser = async (userId: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to fetch user."
      );
    }
    throw new Error("Failed to fetch user. Please try again later.");
  }
};

// User posts
export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data.data;
  } catch (error: unknown) {
    console.error("Error fetching user posts:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to fetch user posts."
      );
    }
    throw new Error("Failed to fetch user posts. Please try again later.");
  }
};

// User Login
export const login = async (formData: FormData): Promise<UserData> => {
  try {
    const response = await api.post("/login", formData);
    revalidatePath("/");
    return response.data;
  } catch (error: unknown) {
    console.error("Error during login:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to login. Please check your credentials."
      );
    }
    throw new Error("Failed to login. Please check your credentials.");
  }
};

// User Registration
export const Register = async (formData: FormData): Promise<void> => {
  try {
    await api.post("/register", formData);
  } catch (error: unknown) {
    console.error("Error during registration:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to register."
      );
    }
    throw new Error("Failed to register. Please try again.");
  }
};

// Create post
export const createPost = async (
  formData: FormData,
  token: string
): Promise<void> => {
  try {
    await api.post("/posts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    console.error("Error during post creation:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to create post."
      );
    }
    throw new Error("Failed to create post. Please try again.");
  }
};

// Edit post
export const editPost = async (
  postId: number,
  formData: FormData,
  token: string
): Promise<void> => {
  formData.append("_method", "PUT");
  try {
    await api.post(`/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    console.error("Error during post update:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to update post."
      );
    }
    throw new Error("Failed to update post. Please try again.");
  }
};

// Delete post
export const deletePost = async (postId: number, token: string) => {
  try {
    await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    console.error("Error during post deletion:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to delete post."
      );
    }
    throw new Error("Failed to delete post. Please try again.");
  }
};

// Create comment
export const createComment = async (
  postId: number,
  formData: FormData,
  token: string
): Promise<void> => {
  try {
    await api.post(`/posts/${postId}/comments`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath(`/posts/${postId}`);
  } catch (error: unknown) {
    console.error("Error during comment creation:", error);
    if (error instanceof AxiosError && error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.errors ||
          "Failed to create comment."
      );
    }
    throw new Error("Failed to create comment. Please try again.");
  }
};
