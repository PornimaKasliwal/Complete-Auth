const Todo = require("../model/Todo");

exports.getTodos = async (req, res) => {
    try {
        const result = await Todo.find({ user: req.loggedin })
        res.json({ message: "get todo success", result })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" })


    }
}

exports.createTodos = async (req, res) => {
    try {
        await Todo.create({ ...req.body, user: req.loggedin })
        res.json({ message: "create todo success" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" })


    }
}

exports.updateTodos = async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.tid, req.body)
        res.json({ message: "update todo success" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" })


    }
}

exports.deleteTodos = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.tid)
        res.json({ message: "delete create success" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong" })


    }
}