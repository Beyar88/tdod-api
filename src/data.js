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

const markDone = async (item) => {
  const query = "update items set complete = true where task = $1::text";
  const result = await client.query(query, [item.task]);
};

const markUndo = async (item) => {
  const query = "update items set complete = false where task = $1::text";
  const result = await client.query(query, [item.task]);
};

const deleteItem = async (task) => {
  const query = "delete from items where task = $1::text";
  const result = await client.query(query, [task]);
};

const addNewUser = async (username, password) => {
  const query =
    "insert into users (user_name, user_password) values ($1::text, $2::text);";
  const result = await client.query(query, [username, password]);
};

const getUser = async (username, password) => {
  const query =
    "select * from users where user_name = ($1::text) and user_password = ($2::text);";
  const result = await client.query(query, [username, password]);
  const userData = result.rows[0];
  if (userData != undefined) {
    // console.log(userData);
    return true;
  } else {
    console.log("user does not exist");
  }
};

exports.getAllItems = getAllItems;
exports.addNewItem = addNewItem;
exports.markDone = markDone;
exports.markUndo = markUndo;
exports.deleteItem = deleteItem;
exports.addNewUser = addNewUser;
exports.getUser = getUser;

// let d = async (e, b) => {
//   const s = await getUser(e, b);
//   console.log(s, 'this is d');
// };

// d("B", "m");
