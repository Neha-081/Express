const express = require('express');
const users = require("./express.json")
const app = express();
app.get("/",function(req,res){
res.send("Welcome to Homepage")
});
app.get("/users",function(req,res){
    res.send(users)
})
app.listen(2345,function(){
console.log("listening on port 2345");
})  //2000 to 10000




  