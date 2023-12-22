import express from "express";
import userRouter from "./src/modules/users/user.routes.js";
import { dbConnection } from "./databases/dbConnections.js";
import productRouter from "./src/modules/products/product.routes.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(userRouter)
app.use(productRouter)



dbConnection();






// app.get("/", async (req, res) => {
//   // await userModel.insertMany({name:"hassan",email:"hassan@gmail.com",age:19,password:"123"})
//   // let users = await userModel.find()
//   // let users = await userModel.find().select('name password')
//   // let users = await userModel.find({},{name:1})
//   // await userModel.findByIdAndUpdate({_id:"657c6e1839f80f15f87bb5a2"},{email:"ahmed@gmail.com"})
//   // await userModel.findByIdAndDelete({_id:"657c6e1839f80f15f87bb5a2"})
//   res.json({ message: "success" });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
