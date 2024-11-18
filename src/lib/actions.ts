"use server";

import { AxiosError } from "axios";
import { Post, UserData } from "@/types/types";
import { api } from "./api";
import { revalidatePath } from "next/cache";

// Fetch Posts
export const getPosts = async (page: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=8`);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
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
    if (error instanceof AxiosError) {
      console.error(
        "Error fetching post:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch post. Please try again later.");
  }
};

// User Login
export const login = async (formData: FormData): Promise<UserData> => {
  try {
    const response = await api.post("/login", formData);
    revalidatePath("/");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to login. Please check your credentials.");
  }
};

// User Registration
export const Register = async (formData: FormData): Promise<void> => {
  try {
    await api.post("/register", formData);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to register. Please try again.");
  }
};

// create post
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
    if (error instanceof AxiosError) {
      console.error(
        "Error during post creation:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to create post. Please try again.");
  }
};

// edit post
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
    if (error instanceof AxiosError) {
      console.error(
        "Error during post update:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to update post. Please try again.");
  }
};

// delete post
export const deletePost = async (postId: number, token: string) => {
  try {
    await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Error during post deletion:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to delete post. Please try again.");
  }
};

// create comment
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
    if (error instanceof AxiosError) {
      console.error(
        "Error during comment creation:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", error);
    }
  }
};
