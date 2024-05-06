import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `http://localhost:3010/api/v1/auth`;

export const registerUserAPI = async ({
  name,
  mobile,
  email,
  address,
  password,
}) => {
  try {
    const requestUrl = `${backendUrl}/register`;
    debugger;

    const reqPayload = { name, mobile, email, address, password };
    debugger;
    const response = await axios.post(requestUrl, reqPayload);

    toast.success(response?.data?.message);
    console.log(response);
    debugger;
    return response?.data;
  } catch (error) {
    console.log(error);
    debugger;
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const loginUserAPI = async ({ email, password }) => {
  try {
    const requestUrl = `${backendUrl}/login`;
    debugger;

    const reqPayload = { email, password };

    const response = await axios.post(requestUrl, reqPayload);

    toast.success(response?.data?.message);
    debugger;
    return response?.data;
  } catch (error) {
    console.log(error);
    debugger;
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
