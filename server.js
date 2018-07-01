const db = require('./db');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/about', (req, res) => res.send(`
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
    <button onclick="test()">Test me</button>
    <script>
      function test() {
        putData('/posts/10', {
          userId: 42,
          title: 'who is moshe?'
        })
        .then(data => console.log(data)) // JSON from \`response.json()\` call
        .catch(error => console.error(error))
      }
      
      function putData(url, data) {
        // Default options are marked with *
        return fetch(url, {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            'content-type': 'application/json'
          },
          method: 'PUT',  // *GET, POST, PUT, DELETE, etc.
          mode: 'cors'    // no-cors, cors, *same-origin
        })
        .then(response => response.json()) // parses response to JSON
      }
    </script>  
  </body>
  </html>
`));

app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.get('/posts/', (req, res) => {
  res.send(JSON.stringify(db))
});

app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = db.find(post => post.id === id);
  res.send(JSON.stringify(post));
});


app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let post = db.find(post => post.id === id);
  if (post) {

  } else {
    post = {
      id,
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body
    };
    db.push(post);
  }
  res.send(JSON.stringify(post));
});

app.listen(3000,
  () => console.log('Post API server listening on port 3000!')
);