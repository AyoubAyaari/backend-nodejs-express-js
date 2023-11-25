const express =require('express')
const bodyparser=require("body-parser")
const mydb=require('./config/db')
const rout=require('./routes/router');



const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(rout)



app.listen(3000,()=>{
    console.log("serveur is running");
});