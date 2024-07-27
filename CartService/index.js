import express from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/dbConfig.js";
import cartRouter from "#routes/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

const PORT = process.env.PORT || 4000;

// app.get("/hello", (_, res) => {
//   res.status(200).send("Hello from cart");
// });
app.use(cartRouter);

app.listen(PORT, () => {
  console.log(`Cart Service running on http://localhost:${PORT}`);
});
