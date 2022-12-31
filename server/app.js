const express = require('express');
const app = express();

require("./conn/db");

app.listen('3000',()=>{
    console.log("On port 3000");
})