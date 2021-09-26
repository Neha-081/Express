const express = require ("express");


const connect = require("./configs/db")

const userController = require("./controller/user.controller")
const topicController = require("./controller/topic.controller")
const evaluationController = require("./controller/evaluation.controller")
const studentController = require("./controller/student.controller")



const app=express();
app.use(express.json())

app.use("/users",userController)
app.use("/topics",topicController)
app.use("/evaluations",evaluationController)
app.use("/students",studentController)

app.listen(2325,async function(){
    await connect();
    console.log("listening on port 2325");
})



