import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import { FRONTEND_URL, PORT } from "./config/index.js";

const app = express();
const port = PORT || 10000;

await connectDB();
await connectCloudinary();

const allowedOrigins = (FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  allowedOrigins.push(
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://greencart-8d9l.onrender.com",
  );
}

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => res.send("API is Working"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on https://greencart-backend-9axs.onrender.com`);
});
