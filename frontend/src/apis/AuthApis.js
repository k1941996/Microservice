import Ecomm from "$apis/EcommApi.js";

export const loginUser = (loginData) => Ecomm.post(`/login`, loginData);
