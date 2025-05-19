const express=require('express');
const router = express.Router();
const Task = require('../Models/Task');

router.get('/',async(req,res)=>{
    const tasks =await Task.find();
    res.json(tasks);
});

router.post('/',async(req,res)=>{
    //{ title, description }: Destructuring — extracts title and description from req.body.
    //req.body: The JSON body sent by the client (e.g., { title: "Task 1", description: "Details" })
    const {title,description,deadline}=req.body;
    //e creates a new MongoDB document using the Task model.
    const newTask = new Task({title,description,deadline});
    await newTask.save();
    res.status(201).json(newTask)
});

router.put('/:id', async (req, res) => {
    // Mongoose method that:Finds a document in the MongoDB database by its ID (req.params.id).Updates it with the data provided in req.body (usually coming from the client).
    //This option tells Mongoose to return the updated document (rather than the original, unmodified one).
    const updatedTask =await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedTask);
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:'Task deleted'});
})

module.exports=router;