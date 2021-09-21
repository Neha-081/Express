const express = require ("express");
const mongoose= require("mongoose");

const connect =()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/web11",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
   

   
}
//create schema(step1)
const userSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,reqired:true},
    price:{type:Number,reqired:true},
    size:{type:String,reqired:false},
})
//connect schema to user collection(step2)
const User=mongoose.model("user",userSchema) //users

const app=express();
app.use(express.json())

//---------CRUD APIS----------
//post
app.post("/users",async(req,res)=>{
    const user=await User.create(req.body) //db.users.insert
 
    return res.status(201).send({user});
})

//get
app.get("/users",async(req,res)=>{
    const users=await User.find().sort({id:-1}).lean().exec() //db.users.find,exec will convert half promise(thennable)to full promise


    return res.status(200).send({users})
})

//patch
app.patch("/users/:id",async(req,res)=>{                //mongoid
             const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
             return res.status(200).send({user})
    //db.users.update({_id:""},{$set:{}})
}) 

//delete
app.delete("/users/:id",async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec(); //db.users.remove({_id:""})

    return res.status(200).send({user});
    //delete=>delete single bar
})

//get a single user
app.get("/users/:id",async(req,res)=>{
    const user=await User.findById(req.params.id).lean().exec();
    return res.status(200).send({user});
})

app.listen(2345,async function(){
    await connect();
    console.log("listening on port 2345");
})