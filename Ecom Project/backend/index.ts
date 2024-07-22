import express, { type Request, type Response } from "express";
import { ConnectToMongodb } from "./db/db";
import cors from "cors";
import authrouter from "./routers/authRouter";
import productRouter from "./routers/productRouter";
import categoryRouter from "./routers/categoryRouter";
import cartRouter from "./routers/cartRouter";
import filterRouter from "./routers/FilterRouter";


const app = express();

ConnectToMongodb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authrouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/filter",filterRouter);


const PORT = 7000;

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello From Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
