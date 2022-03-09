const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "todo_user",
  port: "5432",
  password: "admin",
  database: "todo",
});

// open the db connection
client.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("connected to database!");
});

const getAllItems = async (userID) => {
  const query = "select * from items where user_id = $1::text;";

  const result = await client.query(query, [userID]);

  return result.rows;
};

const addNewItem = async (item) => {
  const query =
    "insert into items (task, complete, created_at, user_id) values ($1::text, false, current_timestamp, $2::text);";

  const result = await client.query(query, [item.taskValue, item.userID]);
};

const markDone = async (item) => {
  const query =
    "update items set complete = true where task = $1::text and user_id = $2::text;";
  const result = await client.query(query, [item.Description, item.UserID]);
};

const markUndo = async (item) => {
  const query =
    "update items set complete = false where task = $1::text and user_id = $2::text;";
  const result = await client.query(query, [item.Description, item.UserID]);
};

const deleteItem = async (item) => {
  const query =
    "delete from items where task = $1::text and user_id = $2::text;";
  const result = await client.query(query, [item.Description, item.UserID]);
};

exports.getAllItems = getAllItems;
exports.addNewItem = addNewItem;
exports.markDone = markDone;
exports.markUndo = markUndo;
exports.deleteItem = deleteItem;
