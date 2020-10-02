const express = require('express');
const mongoose=require('mongoose')
require("dotenv").config();
const useRoutes=require('./routes/user');
//app
const app= express();

//DB
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
}).then(()=> console.log("Database connected"))

//Router
app.use(useRoutes)

const port=process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is up at ${port}`);
});