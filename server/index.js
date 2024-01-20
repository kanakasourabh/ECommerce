import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(8000, () => console.log("port is listening on port 8000"));
