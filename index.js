const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const cors = require("cors")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection succesful")).catch((err)=>{console.log(err)});

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

