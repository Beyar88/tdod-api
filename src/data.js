const { Client } = require("pg");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE not set");
}
const client = new Client(config);

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

const getDataBase = async () => {
  const query = "SELECT * FROM items";
  const { rows } = await client.query(query);
};
exports.getDataBase = getDataBase;
exports.getAllItems = getAllItems;
exports.addNewItem = addNewItem;
exports.markDone = markDone;
exports.markUndo = markUndo;
exports.deleteItem = deleteItem;
exports.db = client;
