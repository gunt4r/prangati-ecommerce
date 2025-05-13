/* eslint-disable no-console */
import axios from "axios";

export const addViewedProduct = async (userUuid: string, productId: string) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}viewed-products/add-or-update`,
      {
        userUuid,
        productId,
      },
    );
  } catch (error) {
    console.error(`Error adding viewed product:`, error);
  }
};

export const getRecentViewedProducts = async (userUuid: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}viewed-products/recent`,
      {
        params: { userUuid },
      },
    );
    const viewedProducts = response.data;

    return viewedProducts;
  } catch (error) {
    console.error(`Error fetching recent viewed products:`, error);
  }
};
