require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const campaignRoutes = require("./routes/campaignRoute");
const donationRoutes = require("./routes/donationRoute");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/campaign", campaignRoutes);
app.use("/api/donation", donationRoutes);



// connect to db
mongoose.connect(process.env.MONGO_URL) // #3
 .then(() => {
      //  listen for requests
      app.listen(process.env.PORT, () => {
        console.log("Connected to the db $ listening to port", process.env.PORT);
      });
    })
    .catch((err) => {
        console.log(err)
    })
