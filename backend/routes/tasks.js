const { Router } = require('express');
const { findById, findByIdAndDelete } = require('../models/task');
const router = Router();
const { unlink } = require('fs-extra')
const path = require('path')

const Task = require('../models/task')

router.get('/', async(req,res) => {
    const task = await Task.find()
    res.json(task);
})

router.post('/', async(req, res) =>{
    const {title, author, isbn} = req.body;
    const imagePath = '/upload/' + req.file.filename;
    const newTask = new Task({title, author, isbn, imagePath})
    await newTask.save()
    res.json({Messase: "Saved"})
})

router.delete('/:id', async (req,res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    unlink(path.resolve('./backend/public/' + task.imagePath))
    res.json({Messase: "Task deleted"})
})

module.exports= router