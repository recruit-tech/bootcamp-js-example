const express = require('express');
const router = express.Router();
const todoList = [];

router.post('/', (req, res, next) => {
  const id = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
  const item = {
    id: id,
    name: req.body.name,
    done: false
  };
  todoList.push(item);
  return res.status(201).send(item);
});

router.get('/', (req, res, next) => {
  return res.send({ todoList: todoList });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  const todo = todoList.find(todo => todo.id == id);
  const name = req.body.name;
  const done = req.body.done;
  todo.name = name;
  todo.done = done;
  return res.status(201).send(todo);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const index = todoList.findIndex(todo => todo.id == id);
  todoList.splice(index, 1);
  return res.status(204).send('done');
});

module.exports = router;
