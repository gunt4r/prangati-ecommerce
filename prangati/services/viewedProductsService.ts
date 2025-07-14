/* eslint-disable no-console */
import { api } from "@/api/api";
export const addViewedProduct = async (userUuid: string, productId: string) => {
  try {
    await api.post(`/viewed-products/add-or-update`, {
      userUuid,
      productId,
    });
  } catch (error) {
    console.error(`Error adding viewed product:`, error);
  }
};

export const getRecentViewedProducts = async (userUuid: string) => {
  try {
    const response = await api.get(`/viewed-products/recent`, {
      params: { userUuid },
    });
    const viewedProducts = response.data;

    return viewedProducts;
  } catch (error) {
    console.error(`Error fetching recent viewed products:`, error);
  }
};
