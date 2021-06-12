const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();
//-----------------------------
const routes = require('./routs.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  const bookSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    author: String,
    description: String,
    cover: String
  });

  const Books = mongoose.models.Books || mongoose.model('Books', bookSchema);

  // routes(Books);

  app.use(cors());
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/api/list-books', async function (req, res) {

    let page = 0;
    const books = await Books.countDocuments({}).exec();
    const pages = Math.ceil(books / 15);

    if (req.query.p) {
      if (Number(req.query.p) >= 1 && Number(req.query.p) <= pages) {
        page = Number(req.query.p);
      } else {
        return res.status(400).json({ message: 'Incorrect paging parameter or page does not exist' });
      }
    } else {
      page = 1;
    }

    await Books.find({}, null, { sort: { title: 'asc' }, skip: (page - 1) * 15, limit: 15 }, function (err, docs) {
      if (err) res.status(500).json({ message: 'Internal error' });

      res.status(200).json({
        meta: { page: page, pages: pages, booksInPage: docs.length, books: books },
        books: docs
      })

    })

  })

  app.post('/api/insert-book', async function (req, res) {

    const book = new Books(req.body);

    await book.save(function (err, data) {
      if (err) return res.status(500).json({ message: 'Internal error' });
      res.status(200).json({ message: 'Book added!' })
    });

  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

});