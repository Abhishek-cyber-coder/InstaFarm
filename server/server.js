const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const handleCommonError = require("./middlewares/commonError");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const creditRoutes = require("./routes/credit");
const paymentRoutes = require("./routes/cashfree");
const invoiceRoutes = require("./routes/invoice");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.json({
    message: "Api is running successfully",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/credit", creditRoutes);
app.use("/api/v1/cashfree", paymentRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

app.use(handleCommonError);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3010;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running at port ${PORT}`);
  }
});
