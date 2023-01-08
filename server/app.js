const express = require('express');
const cors = require("cors");
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
app.use("/api/auth/",userRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("DB Connected !!");
})
.catch((err)=>{
    console.log(err);
})


app.listen(process.env.PORT,()=>{
    console.log("On port 3000");
})