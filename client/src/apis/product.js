import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backendUrl = `http://localhost:3010/api/v1/products`;

export const getAllProductsApi = async () => {
  try {
    const requestUrl = `${backendUrl}/`;
    const response = await axios.get(requestUrl);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const getProductByIdApi = async (productId) => {
  try {
    const requestUrl = `${backendUrl}/${productId}`;

    const response = await axios.get(requestUrl);
    console.log(response);
    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
