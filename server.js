const db = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.get('/posts/', (req, res) => {
  res.send(JSON.stringify(db))
});

// API route /posts/:id ===
app.route('/posts/:id')
  .get(function (req, res) {
    const id = parseInt(req.params.id);
    const post = db.find(post => post.id === id);
    res.send(JSON.stringify(post));
  })
  .put(function (req, res) {
    const id = parseInt(req.params.id);
    const ind  = db.findIndex(post => post.id === id);
    db.splice(ind, 1);
    res.send(200);
  })
  .put(function (req, res) {
    const id = parseInt(req.params.id);
    let post = db.find(post => post.id === id);
    if (post) {
      post.userId = req.body.userId;
      post.title = req.body.title;
      post.body = req.body.body;
    } else {
      post = {
        id,
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
      };
      db.push(post)
    }
    res.send(JSON.stringify(post));
  })
  .put(function (req, res) {

  });

app.post('/posts/:id', (req, res) => {
  console.log('request body:', req.body);
  const id = parseInt(req.params.id);
  let post = db.find(post => post.id === id);
  if (post) {
    post.userId = req.body.userId;
    post.title = req.body.title;
    post.body = req.body.body;
  }
  res.send(JSON.stringify(post));
});


app.listen(3000,
  () => console.log('Post API server listening on port 3000!')
);