const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const audioRoute = require("./routes/audio");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_DB)
  .then(() => {
    console.log(">>> Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error(">>> Error connecting to MongoDB:", error);
  });

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/audio", audioRoute);

app.listen(8000, () => {
  console.log(">>> Server running on port 8000!");
});
