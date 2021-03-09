const Task = require('../Schema/taskSchema');

const taskController = {

  getAll(req, res) {
    Task.find((error, tasks) => {
      if (error) {
        res.status(500).json({ ok: false, message: 'Can not get data' });
      }
      if (tasks) {
        res.status(200).json({ ok: true, tasks });
      }
    }).exec();
  },
  // check if its needed
  getOne(req, res) {
    res.json({ mesage: 'get one route' });
  },

  async updateTask(req, res) {
    const { id } = req.params;
    const { body } = req;
    const options = { new: true };

    try {
      const result = await Task.findByIdAndUpdate(id, body, options);
      res.status(200).json({ ok: true, result });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },

  addTask(req, res) {
    const { body } = req;

    const task = new Task({
      column_id: body.column_id,
      title: body.title,
      description: body.description,
      person: body.person,
      color: body.color,
      column_title: body.column_title,
    });
    task.save((err, taskSaved) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      } else {
        res.status(200).json({
          ok: true,
          taskSaved,
        });
      }
    });
  },

  async deleteTask(req, res) {
    const { id } = req.params;
    Task.findByIdAndRemove(id, (err, taskDeleted) => {
      if (err) {
        res.json({ ok: false, message: 'Can not delete task' });
      }
      if (taskDeleted) {
        res.status(200).json({ ok: true, taskDeleted });
      }
    });
  },

};

module.exports = taskController;
