import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js"
import LoginRoute from "./routes/LoginRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(ProductRoute);
app.use(LoginRoute);

app.listen(5000, () => console.log("Server is Running..."));
