import express from "express";
import restaurantRoutes from "./routes/restaurant.route";

export const app = express();

app.use(express.json());

app.use("/restaurants", restaurantRoutes);
