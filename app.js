const express = require("express");
const cors = require("cors");
const http = require("http");
const join = require("path").join;
const resolve = require("path").resolve;
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* React Production build for server */

app.use(express.static(join(__dirname, "../client/build")));

const PORT = process.env.DEV_PORT;
const server = http.createServer(app);

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "build", "index.html"));
});
MongoClient.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return err;
    }
    const db = client.db("Todo");
    // add a new todo
    app.post("/todos", (req, res) => {
      const { task } = req.body;
      db.collection("Todos")
        .insertOne({
          todo: task,
          status: "Not completed",
          isCompleted: false
        })
        .then(() => res.status(200).json("new todo inserted"))
        .catch(err => res.status(400).json(err));
    });

    // get all todos
    app.get("/todos", (req, res) => {
      db.collection("Todos")
        .find()
        .toArray()
        .then(doc => res.status(200).json(doc))
        .catch(err => res.status(400).json(err));
    });

    // update todo
    app.put("/todos/:id", (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const { isCompleted } = req.body;
      db.collection("Todos")
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { status: status, isCompleted: isCompleted } }
        )
        .then(() => res.status(200).json("Todo Updated"))
        .catch(err => res.status(400).json(err));
    });

    // delete todo
    app.delete("/todos/:id", (req, res) => {
      const { id } = req.params;
      db.collection("Todos")
        .findOneAndDelete({ _id: ObjectId(id) })
        .then(() => res.status(200).json("todo deleted"))
        .catch(err => res.status(200).json(err));
    });
  }
);
server.listen(PORT, () => {
  console.log(__dirname);
  console.log(`sever ready on ${PORT}`);
});
