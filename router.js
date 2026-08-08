/*----------------------------------------初期設定----------------------------------------*/
import "dotenv/config";
import express from "express";

const router = express.Router();
/*----------------------------------------ルーティング----------------------------------------*/
let cloudFlareTunnel;

router.post("/search", async (req, res) => {
    try {
        const username = req.body.username;

        const response = await fetch(`${cloudFlareTunnel}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        });

        const json = await response.json();
        return res.status(response.status).json(json);
    } catch (error) {
        console.log(error);
        res.status(503).json({
            message: "service unavailable",
            data: null,
        });
    }
});

router.get("/status/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await fetch(`${cloudFlareTunnel}/api/status/${id}`);
        const json = await response.json();
        res.status(response.status).json(json);
    } catch (error) {
        console.log(error);
        res.status(503).json({
            message: "service unavailable",
            status: null,
            url: null,
        });
    }
});

router.get("/health", (req, res) => {
    console.log("Backend health check received");
    res.send("OK");
});

router.post("/receiveCloudFlareTunnel", (req, res) => {
    cloudFlareTunnel = req.body.cloudFlareTunnel;
    console.log(cloudFlareTunnel);
    res.send("OK");
});

export { router };
