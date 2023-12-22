import mongoose from "mongoose";







const dbConnection = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Database connection error:", error));

}

export{

    dbConnection
}