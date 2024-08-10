import connectDB from "#config/dbConfig.js";
import express from "express";
import dotenv from "dotenv";
import orderRoutes from "#routes/orderRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000;
connectDB(DATABASE_URL)

app.get("/hello", (_, res) => {
  res.status(200).send({message:"Hello from order service."})
});

app.use(orderRoutes)


app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})