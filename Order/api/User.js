import UserService from "#services/UserService.js";

const getShippingAddressFromShippingId = ({ headers, addressId }) => {
  delete headers["content-length"];
  try {
    return UserService.get(`/address/${addressId}`, { headers });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { getShippingAddressFromShippingId };
