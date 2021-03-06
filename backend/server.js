const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 4000;

// express: framework for Node
// body parser: Middleware - parsing HTTP link
// CORS: cross origin resource sharing
//mongoose: lets us access mongoose in a OOP way

let Todo = require('./todo.model');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

var mongodb = "mongodb+srv://kat123:kat123@cluster0-bhdxt.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongodb || process.env.MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static(path.join(__dirname, '..', 'build')));


todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else

            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/todos', todoRoutes);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});