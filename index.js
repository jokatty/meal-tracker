import pg from 'pg';

const { Client } = pg;

const pgConnectionConfigs = {
  user: 'jyotikattani',
  host: 'localhost',
  database: 'jyotikattani',
  port: 5432,
};
const client = new Client(pgConnectionConfigs);
client.connect();

function whenQueryDone(err, result) {
  if (err) {
    throw err;
  }
  // console.log(`${result.rows[0].type} - ${result.rows[0].description} `);
  console.log(result);

  client.end();
}

const appCmd = process.argv[2];

const type = process.argv[3];
const description = process.argv[4];
const alcohol = process.argv[5];
const hungry = process.argv[6];
const date = new Date();

let sqlQuery = '';
if (appCmd === 'log') {
  sqlQuery = `INSERT INTO meal_tracker (type, description, amount_of_alcohol, was_hungry_before_eating, created_at) VALUES ('${type}', '${description}', '${alcohol}', '${hungry}', '${date}')`;
}
else if (appCmd === 'report') {
  sqlQuery = 'SELECT * FROM meal_tracker';
  if (process.argv[3]) {
    const filterBy = process.argv[3];
    sqlQuery = `SELECT * FROM meal_tracker WHERE type = '${filterBy}'`;
  }
}

else if (appCmd === 'edit') {
  const key = process.argv[3];
  console.log(key);
  const value = process.argv[4];
  console.log(value);
  const id = process.argv[5];
  console.log(id);

  sqlQuery = `UPDATE meal_tracker SET ${key}='${value}' WHERE id = ${id}`;
}

client.query(sqlQuery, whenQueryDone);
