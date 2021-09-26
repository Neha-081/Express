const express = require ("express");
const router = express.Router()
const Student= require("../models/student.model")
const crudController = require("./crud.controller")



router.post("",crudController.post(Student))
// router.get("",crudController.get(Student))
router.get("",async(req,res)=>{
    const students = await Student.find().sort({marks:-1}).limit(1).populate("user_id").lean().exec();
    return res.status(200).send({students});
})

router.get("/:id",crudController.getOne(Student))
router.patch("/:id",crudController.updateOne(Student))
router.delete("/:id",crudController.deleteOne(Student))


module.exports=router;