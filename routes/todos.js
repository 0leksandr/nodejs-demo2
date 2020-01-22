'use strict';

const {Router} = require('express');
const Todo     = require('../models/todo');
const mongoose = require('mongoose');
const router   = Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find({});

    res.render('index', {
        title  : "TODOs list",
        current: "/",
        todos,
    });
});
router.get('/create', (req, res) => {
    res.render('create', {
        title  : "Create TODO",
        current: "/create",
    });
});
router.post('/create', async (req, res) => {
    const todo = new Todo({title: req.body.title});
    await todo.save();
    res.redirect('/');
});
router.post('/save', async (req, res) => {
    // const todo = await Todo.findById(req.body.id);
    const todo     = await mongoose.model('Todo').findById(req.body.id);
    todo.completed = req.body.completed === 'on';
    await todo.save();
    res.redirect('/');
});

module.exports = router;
