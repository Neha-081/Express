const mongoose= require("mongoose");

//stepfb1-create the schema for topics
const topicSchema = new mongoose.Schema({
    title:{type:String,required:true},
    name_of_topic:{type:String,required:true},
},{
    versionKey:false, //_v
    timestamps:true // createAt,updateAt
})
//stepfb2-create the schema to topic collection
module.exports = mongoose.model("topic",topicSchema) //topics