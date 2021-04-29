const JWT = require('jsonwebtoken');
const Column = require('../Schema/columnSchema');

const columnController = {
  addColumn(req, res) {
    const { body } = req;
    const column = new Column({

      user: body.user_id,
      title: body.title,
    });
    column.save((err, docSaved) => {
      if (err) { console.log(err.message); } else { res.status(200).json({ status: true, docSaved }); }
    });
  },
  async getallUserColumn(req, res) {
    const { params } = req;
    Column.find({ user: { _id: params.id } }, (error, columns) => {
      if (error) {
        res.status(500).json({ ok: false, message: 'Can not get data' });
      }
      if (columns) {
        res.status(200).json({ ok: true, columns });
      }
    }).populate('user').exec();
  },

  async updateColum(req, res) {
    const { id } = req.params;
    const { body } = req;
    const options = { new: true };

    try {
      const result = await Column.findByIdAndUpdate(id, body, options);
      res.status(200).json({ status: true, result });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },

  deleteColumn(req, res) {
    const { id } = req.params;
    Column.findByIdAndRemove(id, (err, columnDeleted) => {
      if (err) {
        res.json({ ok: false, message: 'Can not delete Column' });
      }
      if (columnDeleted) {
        res.status(200).json({ ok: true, columnDeleted });
      }
    });
  },

};

module.exports = columnController;
