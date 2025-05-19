const mongoose = require('mongoose');
//mongoose.Schema: A Mongoose class used to define the structure (schema) of documents in a MongoDB collection.
// Mongoose will automatically create and manage two fields:createdAt,updatedAt
const taskSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:String,
    deadline:Date,
    completed:{type:Boolean, default:false},
} ,{timestamps:true});

//mongoose.model('Task', taskSchema):
//Creates a Mongoose model named 'Task' using the defined taskSchema.
//This model will interact with the tasks collection in MongoDB (Mongoose auto-pluralizes it).
module.exports = mongoose.model('Task', taskSchema);
