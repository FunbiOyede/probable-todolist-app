const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
const server = http.createServer(app);
MongoClient.connect(
  `mongodb://localhost:${process.env.MONGO_PORT}`,
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
          status: "Not completed"
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
      db.collection("Todos")
        .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { status: status } })
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
  console.log(`sever ready on ${PORT}`);
});
