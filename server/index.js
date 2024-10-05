const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const AuthRoutes = require('./Routes/AuthRoute')
const AdminProductRouter = require('./Routes/AdminRoutes/AdminProductRoute')
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
dotenv.config();

app.use(cookieparser()); 
app.use(express.json());
app.use('/api/auth',AuthRoutes)
app.use('/api/admin/products',AdminProductRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("server connected to database");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
