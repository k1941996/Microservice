import express from "express";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 10180;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.status(200).send("Hello from product service");
});

app.listen(PORT, () => {
  console.log(`Product service started on port: http://localhost:${PORT}`);
});
