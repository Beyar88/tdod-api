const { db } = require("./src/data");

const seed = () => {
  return db.query(`
      CREATE TABLE items (
        item_id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        task VARCHAR(255) NOT NULL,
        complete BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL
      );`);
};

seed().then(() => {
  console.log("database seeded");
  db.end();
});
