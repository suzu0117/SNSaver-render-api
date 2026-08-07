import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./router.js";
import path from "path";

const app = express();
app.use(
    cors({
        origin: "https://snsaver-web.onrender.com",
    }),
);
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
