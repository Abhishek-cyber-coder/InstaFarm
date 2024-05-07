import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorageData } from "../utils/helper";

const backendUrl = `http://localhost:3010/api/v1/invoice`;
const token = getLocalStorageData("token");

export const addInvoiceApi = async ({ items, orderTotal }) => {
  try {
    const requestUrl = `${backendUrl}/`;
    const reqPayload = {
      items,
      orderTotal,
    };

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.post(requestUrl, reqPayload);

    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const fetchInvoicesApi = async () => {
  try {
    const requestUrl = `${backendUrl}/detailAll`;
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.get(requestUrl);

    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const fetchInvoiceByIdApi = async (invoiceId) => {
  try {
    const requestUrl = `${backendUrl}/detail/${invoiceId}`;

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.get(requestUrl);

    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
