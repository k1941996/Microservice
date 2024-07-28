export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setAccountId = (accountid) => {
  localStorage.setItem("accountid", accountid);
};

export const getAccountId = () => {
  return localStorage.getItem("accountid");
};
