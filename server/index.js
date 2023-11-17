const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());
app.use(cors());


const todoList = [
    {
        id: "k12312",
        todo: "test1",
        isCompleted: false
    },

];
//we pass data using two way from front end qurey params|| body params use in post ect...
//for giving data to save in backend we can use body params
//another way is to filter range filter to get on product  app.get("/api/todo/:id",(req,res)=>{ req.params.id res.json(res.params.id)})



app.get("/api/todo", (req, res) => {
    res.json(todoList);
});
app.post("/api/todo", (req, res) => {
    const { todo } = req.body;
    console.log(todo, "todo data")
    //important ! checking
    if (!("todo" in req.body)) {
        res.status(400).json({
            message: `${JSON.stringify(req.body)}:This attribute is not accepted Required attribute :todo`,
        });
        return;
    }

    const todoItem = {
        id: uuidv4(),
        todo: todo,
        isCompleted: false,
    };
    console.log(todoItem, "todo item");

    todoList.push(todoItem);
    console.log(todoList, "updated todoList"); // Add this line
    res.json(todoList);
});
app.put("/api/todo", (req, res) => {
    const { id, todo, isCompleted } = req.body;
    const isExitst = todoList.find((data) => data.id === id);
    if (isExitst) {
        todoList.forEach((todoItem) => {
            if (todoItem.id === id) {
                todoItem.todo = todo;
                todoItem.isCompleted = isCompleted || false;
            }
        });

        return res.json(todoList);
    };
    res.status(404).json({
        message: `item with id:${id} does not exist`
    });


});
app.delete("/api/todo", (req, res) => {
    const { id } = req.body;

    console.log(id, "iddd")
    const todoIndex = todoList.findIndex((item) => item.id === id);
    console.log(todoIndex, "todo index")
    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        return res.json(todoList);
    }
    res.status(404).json({ message: "item dose not exists" });
});



//it will handle all error and not found route
app.all("*", (req, res) => {
    res.status(404).json("This page dose not exist");
});






const PORT = 4005;

app.listen(PORT, () => console.log(`server running on ${PORT}`));