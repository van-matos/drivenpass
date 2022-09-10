import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import router from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
});