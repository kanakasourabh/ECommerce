import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import authRouter from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(8000, () => console.log("port is listening on port 8000"));
