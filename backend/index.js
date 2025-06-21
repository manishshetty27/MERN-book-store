import express from "express";
import { PORT, mongoDBurl } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"
const app = express();
app.use(express.json());

app.use(
  cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
)

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Hello World");
});

app.use("/books", bookRoute)

////
mongoose
  .connect(mongoDBurl)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
