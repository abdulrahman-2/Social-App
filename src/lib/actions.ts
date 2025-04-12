"use server";

import { UserData } from "@/types/types";
import { api } from "./api";
import { revalidatePath } from "next/cache";

// User Login
export const login = async (formData: FormData): Promise<UserData> => {
  try {
    const response = await api.post("/login", formData);
    revalidatePath("/");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// User Registration
export const Register = async (formData: FormData): Promise<void> => {
  try {
    await api.post("/register", formData);
  } catch (error: any) {
    console.error("Error registering user:", error);
    throw new Error(
      error.response?.data?.message || "Failed to register. Please try again."
    );
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
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to create post. Please try again."
    );
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
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to update post. Please try again."
    );
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
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete post. Please try again."
    );
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
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to create comment. Please try again."
    );
  }
};
