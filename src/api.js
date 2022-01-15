const express = require("express");
const cors = require("cors");
const data = require("./data");
const app = express();
const bcrypt = require("bcrypt");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const port = 3100;

app.get("/api/items", async (request, response) => {
  const items = await data.getAllItems();

  response.status(200).json(items);
});

app.post("/api/items", async (request, response) => {
  const item = {
    task: request.body.task,
  };

  await data.addNewItem(item);

  response.status(201).send(`Item added with task: ${item.task}`);
});

app.post("/api/items/markdone", async (request, response) => {
  const item = {
    task: request.body.task,
  };
  await data.markDone(item);

  response.status(201).send(`Item updated with task: ${item.task}`);
});

app.post("/api/items/undo", async (req, res) => {
  const item = {
    task: req.body.task,
  };
  await data.markUndo(item);
  res.status(201).send(`item updated with task ${item.task}`);
});

app.post("/api/items/delete", async (req, res) => {
  await data.deleteItem(req.body.task);
  res.status(201).send(`item with task ${req.body.task} deleted`);
});

app.post("/api/user", async (request, response) => {
  const user = request.body.user;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await data.addNewUser(user.username, hashedPassword);

  response.status(201).send(`user added with name: ${user.username}`);
});

app.post("/api/user/auth", async (req, res) => {
  const user = req.body.user;
  const checkUser = await data.getUser(user.username, user.password);
  if (checkUser) {
    res.status(201).send(`authorized user`);
  } else {
    res.status(404).send(`un authorized user`);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
