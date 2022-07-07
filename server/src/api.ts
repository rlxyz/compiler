import express from "express";
import cors from "cors";
import {
  PinataStorageService,
  S3StorageService,
  StorageService,
} from "./storage";
import { environs } from "./env";

// let storageService: StorageService;
// if (environs.storageService === "s3") {
//   storageService = new S3StorageService();
// } else {
//   storageService = new PinataStorageService();
// }

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/collection/create/:name", async (req, res) => {
  const { name } = req.params;
});

app.get("/gm", (_, res) => {
  res.status(200).end(`May the force be with you!`);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
