const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "trailcatalog",
  port: 5435,
});

(async () => {
  await client.connect();

  await client.query("DROP TABLE IF EXISTS nodes");
  await client.query("DROP TABLE IF EXISTS edges");
  console.log("tables dropped");

  await client.query(`CREATE TABLE nodes(
    id uuid PRIMARY KEY,
    x float,
    y float
  )`);
  await client.query(`CREATE TABLE edges(
    id uuid PRIMARY KEY,
    node_from uuid,
    node_to uuid,
    dist float
  )`);
  console.log("tables recreated");

  await client.end();
})();
