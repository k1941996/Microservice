import express from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/dbConfig.js";
import productRouter from "#routes/productRoutes.js";

const app = express();

const PORT = process.env.PORT || 10180;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from product service" });
});

app.use(productRouter);
app.listen(PORT, () => {
  console.log(`Product service started on port: http://localhost:${PORT}`);
});
