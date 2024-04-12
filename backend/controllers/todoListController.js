const TodoList = require("../models/TodoList");
const createOptions = require("../configs/createOptions");

const todoListController = {
  create: async (req, res) => {
    try {
      const {
        user,
        title,
        description,
        deadline,
      } = req.body;

      const newTodoList = new TodoList({
        user: user,
        title: title,
        description: description,
        deadline: deadline,
        status: 0,
      });
      const data = await newTodoList.save();
      res.status(201).json({message: 'Todo added successfully!', data: data });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  
  changeStatus: async (req, res) => {
    try {
      const todo = await TodoList.findById(req.params.todo_id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      todo.status = !todo.status;
      await todo.save();
      res.status(200).json({message: 'Todo status changed successfully!'});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      await TodoList.findByIdAndDelete(req.params.todo_id);
      res.status(200).json({message: 'Todo deleted successfully!'});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getByUser: async (req, res) => {
    try {
      const options = createOptions(req);
      let result = await TodoList.paginate({user: req.params.id}, options);

      result.docs = await Promise.all(
        result.docs.map(async (todoList) => {
          return todoList;
        })
      );
      res.status(200).json({result});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = todoListController;
