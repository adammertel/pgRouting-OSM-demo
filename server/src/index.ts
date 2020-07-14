import express from "express";

const result = require("dotenv").config({ path: "./env/development.env" });
//console.log(result);

// database
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "trailcatalog",
  port: 5435,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  client.connect();
  console.log("Express server started on port: " + port);
});

// get all points based on the given bbox

// get all edges based on the given bbox

// returns closest route based on the given start and end coordinates
app.get("/path", async (req, res, next) => {
  if (
    req.query &&
    req.query.start &&
    typeof req.query.start === "string" &&
    req.query.end &&
    typeof req.query.end === "string"
  ) {
    console.log("got path req", JSON.stringify(req.query));

    const start = parseCoordinates(req.query.start);
    const end = parseCoordinates(req.query.end);
    console.log("start", start);
    console.log("end", end);

    const closestNodeToStart = await client.query(
      `SELECT 
        id, 
        ST_AsGeoJSON(the_geom), 
        ST_DISTANCE(ST_POINT(${start[0]}, ${start[1]}),the_geom) as dist 
      FROM edges_vertices_pgr 
      ORDER BY dist 
      LIMIT 1`
    );

    const closestNodeToEnd = await client.query(
      `SELECT 
        id, 
        ST_AsGeoJSON(the_geom), 
        ST_DISTANCE(ST_POINT(${end[0]}, ${end[1]}),the_geom) as dist 
      FROM edges_vertices_pgr 
      ORDER BY dist 
      LIMIT 1`
    );

    const closestNodeIdToStart =
      closestNodeToStart.rows && closestNodeToStart.rows.length === 1
        ? closestNodeToStart.rows[0].id
        : false;

    const closestNodeIdToEnd =
      closestNodeToEnd.rows && closestNodeToEnd.rows.length === 1
        ? closestNodeToEnd.rows[0].id
        : false;

    if (closestNodeIdToStart && closestNodeIdToEnd) {
      const closestPath = await client.query(`
        SELECT edge, tracktype, smoothness, ST_ASGeoJSON(geom) FROM pgr_dijkstra(
          'SELECT id,source,target,dist as cost 
            FROM edges', 
          ${closestNodeIdToStart}, 
          ${closestNodeIdToEnd}, 
          directed:=false
        ) JOIN edges as e ON edge = e.id`);

      //res.end(JSON.stringify(closestPath));
      res.end(JSON.stringify(closestPath.rows));
    }

    res.end(
      JSON.stringify(start) +
        "\n" +
        JSON.stringify(end) +
        "\n" +
        JSON.stringify(closestNodeIdToStart) +
        "\n" +
        JSON.stringify(closestNodeIdToEnd)
    );
  } else {
    res.end("invalid parameters");
  }
});

const parseCoordinates = (stringCoordinates: string) => {
  return stringCoordinates.split(",").map((coord) => parseFloat(coord));
};
