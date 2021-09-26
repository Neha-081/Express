const express = require ("express");
const router = express.Router()
const Evaluation= require("../models/evaluation.model")
const crudController = require("./crud.controller")



router.post("",crudController.post(Evaluation))

router.get("",async(req,res)=>{
    const evaluations = await Evaluation.find().populate("instructor").lean().exec();
    return res.status(200).send({evaluations});
})

router.get("/:id",crudController.getOne(Evaluation))
router.patch("/:id",crudController.updateOne(Evaluation))
router.delete("/:id",crudController.deleteOne(Evaluation))






module.exports = router;