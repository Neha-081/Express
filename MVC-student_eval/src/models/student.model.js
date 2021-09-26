const mongoose= require("mongoose");


const studentSchema = new mongoose.Schema({
    roll_id:{type:Number,required:true},
    current_batch:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    marks:{type:Number,required:true}
   
},{
    versionKey:false, 
    timestamps:true
})

module.exports = mongoose.model("student",studentSchema)
