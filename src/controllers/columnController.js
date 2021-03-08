const Column = require('../Schema/columnSchema');

const columnController = {
  addColumn(req, res) {
    const { body } = req;
    const column = new Column({
      column_id: body.column_id,
      title: body.title,
    });
    column.save((err, docSaved) => {
      if (err) { console.log(err.message); } else { res.status(200).json({ docSaved }); }
    });
  },
  async getallColumn(req, res) {
    Column.find((error, columns) => {
      if (error) {
        res.status(500).json({ ok: false, message: 'Can not get data' });
      }
      if (columns) {
        res.status(200).json({ ok: true, columns });
      }
    }).exec();
  },

  async updateColum(req, res) {
    const { id } = req.params;
    const { body } = req;
    const options = { new: true };

    try {
      const result = await Column.findByIdAndUpdate(id, body, options);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },

  deleteColumn(req, res) {
    const { id } = req.params;
    Column.findByIdAndRemove(id, (err, columnDeleted) => {
      if (err) {
        res.json({ ok: false, message: 'Can not delete task' });
      }
      if (columnDeleted) {
        res.status(200).json({ ok: true, columnDeleted });
      }
    });
  },

};

module.exports = columnController;
