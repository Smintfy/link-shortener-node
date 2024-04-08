import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes/index.js";
import connectDB from "./core/db.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(routes);

export default app;
