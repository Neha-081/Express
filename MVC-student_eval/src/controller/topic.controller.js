const express = require ("express");
const router = express.Router()
const Student= require("../models/student.model")
const Topic= require("../models/topic.model")
const crudController = require("./crud.controller")





router.post("",crudController.post(Topic))

router.get("",async(req,res)=>{
    const topics = await Topic.find().lean().exec();
    return res.status(200).send({topics});
})

router.get("/:id",crudController.getOne(Topic))

router.patch("/:id",crudController.updateOne(Topic))

router.delete("/:id",crudController.deleteOne(Topic))


router.get("/:id/students",async(req,res)=>{
    const students = await Student.find({topic:req.params.id}).lean().exec();
    const topic= await Post.findById(req.params.id);
    return res.status(200).send({students,topic})
})


module.exports = router;