import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "../api";

import { Category } from "@/types/categories";
import { REACT_QUERY_CATEGORIES_KEY } from "@/config/const";
export function useCategories() {
  return useQuery<Category[]>({
    queryKey: [REACT_QUERY_CATEGORIES_KEY],
    queryFn: async () => {
      try {
        const response = await api.get<Category[]>(`/categories`);

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response data");
        }
        if (response.data.length === 0) {
          throw new Error("No categories found");
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useGetCategoryById(id: string) {
  return useQuery<Category>({
    queryKey: [REACT_QUERY_CATEGORIES_KEY, id],
    queryFn: async () => {
      try {
        const response = await api.get<Category>(`/categories/${id}`);

        if (!response.data) {
          throw new Error("Category not found");
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function usePostCategory() {
  return useMutation<Category, Error, FormData>({
    mutationKey: [REACT_QUERY_CATEGORIES_KEY],
    mutationFn: async (formData: FormData) => {
      try {
        const response = await api.post<Category>(`/categories`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.data) {
          throw new Error("Failed to create category");
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useUpdateCategoryById(id: string) {
  return useMutation<Category, Error, { formData: FormData }>({
    mutationKey: [REACT_QUERY_CATEGORIES_KEY, id],
    mutationFn: async ({ formData }) => {
      try {
        const response = await api.patch<Category>(
          `/categories/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (!response.data) {
          throw new Error("Failed to update category");
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useDeleteCategoryById(id: string) {
  return useMutation<void, Error>({
    mutationKey: [REACT_QUERY_CATEGORIES_KEY, id],
    mutationFn: async () => {
      try {
        const response = await api.delete<void>(`/categories/${id}`);

        console.log(response);
        // if (response.status !== 204) {
        //   throw new Error("Failed to delete category");
        // }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}

export function useDeleteAllCategories() {
  return useMutation<void, Error>({
    mutationKey: [REACT_QUERY_CATEGORIES_KEY],
    mutationFn: async () => {
      try {
        const response = await api.delete<void>(`/categories/remove-all`);

        console.log(response);
        // if (response.status !== 204) {
        //   throw new Error("Failed to delete all categories");
        // }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
}
