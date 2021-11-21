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

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
