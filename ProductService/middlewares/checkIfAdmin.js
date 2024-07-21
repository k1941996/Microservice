import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

export const checkIfAdmin = async (req, res, next) => {
  const accountid = req.headers.accountid;
  try {
    const adminDetails = await axios.get("/checkadmin", {
      data: { accountid },
    });
    if (adminDetails.data.isAdmin) {
      req.adminDetails = adminDetails.data;
      next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
