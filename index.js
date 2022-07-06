// require the appropriate modules
const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const Task = require('./models/task')

// initializing the app
const app = express();

// setting up of view engine to access ejs template files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded());

app.get('/', function(req, res){

    // fetching the tasks from the database
    Task.find({}, function(err, tasks){
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }

        return res.render('home', {
            title: 'TODO APP',
            tasklist: tasks
        });
    });

});

app.post('/add-task', function(req, res){
    // pushing into database
    Task.create({
        taskName: req.body.taskName,
        deadline: req.body.deadline,
        category: req.body.category
    }, function(err, newTask){
        if(err){
            console.log("Error in adding a task");
            return;
        }
        console.log("#######", newTask);
        return res.redirect('back');
    });

});

app.get('/delete-task/', function(req, res){
    //get the id from the query in the url
    let id = req.query.id;
    console.log(id);

    //find the contact in the database using the id and delete it
    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting an object from database");
        }
    });
    return res.redirect('back');
});

// listening the appropriate port number to start the server
app.listen(port, function(err){
    if(err){
        console.log("Error running the server");
        return;
    }
    console.log("Server running at port:", port);
    return;
})