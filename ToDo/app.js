const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/todo', (req, res) => {
    res.render('todo', { tasks });
});

app.post('/todo', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/todo');
});

app.post('/delete', (req, res) => {
    const taskToDelete = req.body.taskToDelete;
    tasks = tasks.filter(task => task !== taskToDelete);
    res.redirect('/todo');
});

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }    
    else{
        console.log(`Listening to port ${PORT}`)

    }
})