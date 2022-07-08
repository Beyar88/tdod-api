const express = require("express");
const cors = require("cors");
const data = require("./data");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const port = 3100;

app.get("/api/items/:id", async (request, response) => {
  const items = await data.getAllItems(request.params.id);

  response.status(200).json(items);
});

app.post("/api/items", async (request, response) => {
  const item = request.body;
  await data.addNewItem(item);

  response.status(201).send(`Item added with task: ${item.taskValue}`);
});

app.post("/api/items/markdone", async (request, response) => {
  const item = request.body;
  await data.markDone(item);

  response.status(201).send(`Item updated with task: ${item.Description}`);
});

app.post("/api/items/undo", async (req, res) => {
  const item = req.body;
  await data.markUndo(item);
  res.status(201).send(`item updated with task ${item.Description}`);
});

app.post("/api/items/delete", async (req, res) => {
  const item = req.body;
  await data.deleteItem(item);
  res.status(201).send(`item with task ${item.Description} deleted`);
});

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
