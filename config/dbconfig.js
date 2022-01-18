const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


module.exports.connect=async ()=>{
    mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("mongoDb connected"))
    .catch((error)=>
    {
        console.log(error.message);
        process.exit();
    });
    return mongoose.connection;
}