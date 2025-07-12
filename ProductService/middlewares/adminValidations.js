import Product from "#models/productModel.js";
import Admin from "#models/AdminModel.js"; // Local admin model

// Local admin validation - no external service calls
export const checkIfAdmin = async (req, res, next) => {
  const accountid = req.headers.accountid;
  try {
    const admin = await Admin.findOne({ userId: accountid });

    if (admin) {
      req.adminDetails = {
        isAdmin: true,
        adminId: admin._id,
        userId: admin.userId
      };
      next();
    } else {
      res.status(401).send({ message: "Unauthorized - Not an admin" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized - Admin validation failed" });
  }
};

export const checkIfCreatedBySameAdmin = async (req, res, next) => {
  const product_id = req.params.product_id;
  const accountid = req.headers.accountid;

  try {
    const admin = await Admin.findOne({ userId: accountid });
    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(401).send({ message: "Product not found." });
    } else if (
      product &&
      admin &&
      product?.createdBy.toString() === admin._id.toString()
    ) {
      req.adminDetails = {
        isAdmin: true,
        adminId: admin._id,
        userId: admin.userId
      };
      next();
    } else {
      return res
        .status(401)
        .send({ message: "Unauthorized - Not the product creator" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong while validating admin." });
  }
};
