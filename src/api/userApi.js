import axios from "axios";
import { useToast } from "vue-toastification";
import { BASE_URL } from "../constants/url";

const toast = useToast();
export const fetchRegister = async (payload) => {
  try {
    const data = await axios.post(`${BASE_URL}seeker/register`, payload);
    toast.success("Register successfull");
    return data;
  } catch (error) {
    toast.warning("This email already exists");
    console.log(error);
  }
};

export const fetchLogin = async (user) => {
  try {
    const data = await axios.post(`${BASE_URL}seeker/login`, user);
    toast.success("Login successfull");
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.warning("Account or password is incorrect");
    }
    console.log(error);
  }
};

export const getInforMe = async (token) => {
  try {
    const data = await axios.get(`${BASE_URL}seeker/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogout = async (token) => {
  try {
    const data = await axios.post(`${BASE_URL}seeker/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Logout successfull");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchEditProfile = async (profile, token) => {
  try {
    console.log("bên này", profile);
    const data = await axios.post(`${BASE_URL}seeker/profile`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "multipart/form-data",
      },
      credentials: "same-origin",
    });
    toast.success("Update information successfull");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchGetRecommend = async (token) => {
  try {
    const data = await axios.get(`${BASE_URL}seeker/recommend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchCreateRecommend = async (payload, token) => {
  try {
    const data = await axios.post(`${BASE_URL}seeker/job/recommend`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Update successfull");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUpdateRecommend = async (idRecommend, payload, token) => {
  try {
    const data = await axios.post(
      `${BASE_URL}seeker/job/recommend/${idRecommend}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Update successfull");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetPostRecommend = async (token) => {
  try {
    const data = await axios.get(`${BASE_URL}seeker/recommend/job`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchForgotPassword = async (email) => {
  try {
    const data = await axios.post(`${BASE_URL}password/email`, email);
    toast.success("Please check your email!");
    return data;
  } catch (error) {
    console.log(error);
  }
};
