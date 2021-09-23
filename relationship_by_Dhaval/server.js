const express = require ("express");
const mongoose= require("mongoose");

const connect =()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/web11",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
   
//BLOGS:-FACEBOOK POSTS
//posts,comments,tags,user
   
}
//create schema(step1)
const userSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    first_name:{type:String,reqired:true},
    last_name:{type:String,reqired:false},
    email:{type:String,reqired:true},
    gender:{type:String,reqired:true},
})
//connect schema to user collection(step2)
const User=mongoose.model("user",userSchema) //users

//stepfb1-create the schema for posts
const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:"tag",required:true}]
},{
    versionKey:false, //_v
    timestamps:true // createAt,updateAt
})
//stepfb2-create the schema to post collection
const Post = mongoose.model("post",postSchema) //posts
//stepfb3-create the schema for comments
const commentSchema= new mongoose.Schema({
    body:{type:String,required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"post",required:true}
},{
    versionKey:false, //_v
    timestamps:true
})
//stepfb4-connwct schema to comment collection
const Comment = mongoose.model("comment",commentSchema)
//stepfb5-create the schema for tags
const tagSchema = new mongoose.Schema({
    name:{type:String,required:true},
  
},{
    versionKey:false, //_v
    timestamps:true
})
//stepfb6-connect schema to tag collection
const Tag = mongoose.model("tag",tagSchema)

const app=express();
app.use(express.json())

//---------CRUD APIS for users----------
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

//get all posts of a user
app.get("/users/:id/posts",async(req,res)=>{
    const posts = await Post.find({author:req.params.id}).lean().exec();
    const author = await User.findById(req.params.id).lean().exec();
    return res.status(200).send({posts,author});
})

//----------CRUD APIS FOR POST---------
app.post("/posts",async (req,res)=>{
    const post = await Post.create(req.body);

    return res.status(201).send({post});
})
//getting all posts
app.get("/posts",async(req,res)=>{
    const posts = await Post.find().populate({
        path:'author',
        select:'first_name'
    }).populate("tags").lean().exec();
    return res.status(200).send({posts});
})
//getting single post
app.get("/posts/:id",async(req,res)=>{
    const posts = await Post.findById(req.params.id).lean().exec();
    return res.status(200).send({posts});
})
//update a single post
app.patch("/posts/:id",async(req,res)=>{
    const posts = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({posts});
})
//delete a single post
app.delete("/posts/:id",async(req,res)=>{
    const posts = await Post.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({posts});
})



//------------CRUD APIS for comments----------------
//create a singel comment
app.post("/comments",async (req,res)=>{
    const comment = await Comment.create(req.body);
    return res.status(201).send({comment});
})
//getting all tags
app.get("/comments",async(req,res)=>{
    const comment = await Comment.find().lean().exec();
    return res.status(200).send({comment});
})
//getting single tags
app.get("/comments/:id",async(req,res)=>{
    const comment = await Comment.findById(req.params.id).lean().exec();
    return res.status(200).send({comment});
})
//update a single tags
app.patch("/comments/:id",async(req,res)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({comment});
})
//delete a single tags
app.delete("/comments/:id",async(req,res)=>{
    const comment = await Comment.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec();
    return res.status(200).send({comment});
})

//--------CRUD APIS for tags------
//create a singel tags
//post
app.post("/tags",async(req,res)=>{
    const tag=await Tag.create(req.body) //db.tags.insert
 
    return res.status(201).send({tag});
})

//get
app.get("/tags",async(req,res)=>{
    const tag=await Tag.find().sort({id:-1}).lean().exec() //db.tags.find,exec will convert half promise(thennable)to full promise


    return res.status(200).send({tag})
})

//patch
app.patch("/tags/:id",async(req,res)=>{                //mongoid
             const tag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
             return res.status(200).send({tag})
    //db.tags.update({_id:""},{$set:{}})
}) 

//delete
app.delete("/tags/:id",async (req,res)=>{
    const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec(); //db.tags.remove({_id:""})

    return res.status(200).send({tag});
    //delete=>delete single bar
})

//get a single user
app.get("/tags/:id",async(req,res)=>{
    const tag=await Tag.findById(req.params.id).lean().exec();
    return res.status(200).send({tag});
})







app.listen(2345,async function(){
    await connect();
    console.log("listening on port 2345");
})



