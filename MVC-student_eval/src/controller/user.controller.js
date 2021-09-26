const express = require ("express");
const router = express.Router()
const User= require("../models/user.model")
const Post= require("../models/topic.model")
const crudController = require("./crud.controller")

router.post("",crudController.post(User))
router.get("",async(req,res)=>{
    const users=await User.find().sort({id:-1}).lean().exec() //db.users.find,exec will convert half promise(thennable)to full promise


    return res.status(200).send({users})
})

router.patch("/:id",crudController.updateOne(User))
router.delete("/:id",crudController.deleteOne(User))
router.get("/:id",crudController.getOne(User))





module.exports=router;
