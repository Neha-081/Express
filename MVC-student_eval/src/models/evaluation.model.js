const mongoose= require("mongoose");

//stepfb3-create the schema for evaluations
const evaluationSchema= new mongoose.Schema({
    date_of_evaluation:{type:String,required:true},
    instructor:[{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}],
    topic:{type:mongoose.Schema.Types.ObjectId,ref:"topic",required:true},


},{
    versionKey:false, //_v
    timestamps:true
})
//stepfb4-connwct schema to evaluation collection
module.exports = mongoose.model("evaluation",evaluationSchema)