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

const getAllItems = async () => {
  const query = "select * from items order by created_at desc;";

  const result = await client.query(query);

  return result.rows;
};

const addNewItem = async (item) => {
  const query =
    "insert into items (task, complete, created_at) values ($1::text, false, current_timestamp);";

  const result = await client.query(query, [item.task]);
};

exports.getAllItems = getAllItems;
exports.addNewItem = addNewItem;
