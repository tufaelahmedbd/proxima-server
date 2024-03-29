require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projectRoute");
const userRoutes = require("./routes/userRoute");

//express app
const app = express();

//port
const port = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

//mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(port, () => {
      console.log(`Connected to MongoDB & Listen from server on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
