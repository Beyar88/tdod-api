const { db } = require("./src/data");

async function seedData() {
  await db.query(`insert into items (task, complete, created_at,user_id) values
    ('deploy-front-end', false, current_timestamp, 'beyar'),
    ('polish-repo', false, current_timestamp, 'beyar'),
    ('create-test-files', false, current_timestamp, 'test')`);
}

seedData()
  .then(() => {
    console.log("test data has been inserted");
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });
