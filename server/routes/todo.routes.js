
const { getTodos, createTodos, updateTodos, deleteTodos } = require("../controllers/todo.controller")

const router = require("express").Router()

router
    .get("/", getTodos)
    .post("/create", createTodos)
    .patch("/modify/:tid", updateTodos)
    .delete("/remove/:tid", deleteTodos)

module.exports = router