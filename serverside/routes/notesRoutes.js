const express = require('express');
const router = express.Router();
const Notes = require('../model/notesModel');

router.post('/add-notes', async(req, res) => {
    try {
        const newNote = new Notes(req.body);
        const saveNote = await newNote.save();
        res.send({
            success: true,
            message: 'Note added successfully..!',
            data: saveNote
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


router.get('/get-notes', async(req, res) => {
    try {
        const notes = await Notes.find({});
        res.send({
            success: true,
            message: 'Fetched all notes successfully..!',
            data: notes
        }) 
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;