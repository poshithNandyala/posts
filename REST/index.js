const express = require("express");
let methodOverride = require('method-override')
const app = express();

const path = require("path");
const { v4: uuidv4 } = require('uuid');


const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
let posts = [
   {
      id: uuidv4(),
      username: "poshith",
      content: "hi i am from iiitl"
   },
   {
      id: uuidv4(),
      username: "sarah",
      content: "hello from New York"
   },
   {
      id: uuidv4(),
      username: "alex",
      content: "greetings from London"
   },
   {
      id: uuidv4(),
      username: "maria",
      content: "hola from Barcelona"
   }
];



app.get("/posts", (req, res) => {
   res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
   res.render("new.ejs");
})

app.post("/posts", (req, res) => {
   let { username, content } = req.body;
   let id =  uuidv4();
   posts.push({ id, username, content });
   res.redirect('/posts');
});

app.get("/posts/:id", (req, res) => {
   let { id } = req.params;
   let post = posts.find((p) => id === p.id);
   if (post) {
      res.render("post.ejs", { post });
   } else {
      res.status(404).send('Post not found');
   }
});

app.get("/posts/:id/edit", (req, res) => {
   let { id } = req.params;
   let post = posts.find((p) => id === p.id);
   if (post) {
      res.render("edit.ejs", { post });
   } else {
      res.status(404).send('Post not found');
   }
});
app.patch("/posts/:id", (req, res) => {
   let { id } = req.params;
   let { content } = req.body; // Updated this line
   let post = posts.find((p) => id === p.id);
   if (post) {
      post.content = content; // Updated this line
      res.redirect('/posts');
   } else {
      res.status(404).send('Post not found');
   }
});

app.delete('/posts/:id', (req, res) => {
   let { id } = req.params;
   posts = posts.filter((p) => {
      return id !== p.id;
   })
   res.redirect('/posts');
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
