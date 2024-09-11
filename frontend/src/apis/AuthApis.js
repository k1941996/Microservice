import Ecomm from "$apis/EcommApiInterceptor";

export const loginUser = (loginData) => Ecomm.post(`/login`, loginData);
export const forgotPassword = (email) => Ecomm.post("/forgotPassword", { email });
export const signUp = (type, values) => Ecomm.post(`/signup/${type}`, values);
export const resetPassword = ({ accountId, token, password, confirm_password }) =>
  Ecomm.post(`/resetPassword/${accountId}/${token}`, {
    password,
    confirm_password,
  });
