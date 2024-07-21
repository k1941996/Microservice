import Product from "#models/productModel.js";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

const getAdminDetails = async (accountid) => {
  const { data: adminDetails } = await axios.get("/checkadmin", {
    data: { accountid },
  });
  return adminDetails;
};

export const checkIfAdmin = async (req, res, next) => {
  const accountid = req.headers.accountid;
  try {
    const adminDetails = await getAdminDetails(accountid);

    if (adminDetails.isAdmin) {
      req.adminDetails = adminDetails;
      next();
    } else {
      res.status(401).send({ message: "Unauthorized line 15" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized line 17" });
  }
};

export const checkIfCreatedBySameAdmin = async (req, res, next) => {
  const product_id = req.params.product_id;
  const accountid = req.headers.accountid;

  try {
    const adminDetails = await getAdminDetails(accountid);
    const product = (await Product.findById(product_id));
    if (
      adminDetails.isAdmin &&
      product?.createdBy.toString() === adminDetails.adminId
    ) {
      next();
    }
    else {
      return res
      .status(401)
      .send({ message: "Unauthorized" });  
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong while validating admin." });
  }
};
