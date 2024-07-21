import express from "express";
import dotenv from "dotenv";
import { checkIfAdmin } from "./middleware/checkIfAdmin.js";
import { createProduct } from "./controllers/AdminController/CreateProduct.js";
const app = express();

const PORT = process.env.PORT || 10180;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from product service", req });
});

app.post("/create", checkIfAdmin, createProduct);

app.listen(PORT, () => {
  console.log(`Product service started on port: http://localhost:${PORT}`);
});
