const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "trailcatalog",
  port: 5435,
});

var parser = require("xml2json");
var fs = require("fs");

(async () => {
  await client.connect();

  await client.query("DROP TABLE IF EXISTS nodes");
  await client.query("DROP TABLE IF EXISTS edges");
  console.log("tables dropped");

  await client.query(`CREATE TABLE edges(
    id SERIAL PRIMARY KEY,
    geom GEOMETRY,
    dir CHARACTER varying,
    source BIGINT,
    target BIGINT,
    cost FLOAT,
    dist FLOAT,
    tracktype TEXT,
    smoothness TEXT
  )`);
  console.log("tables recreated");

  const data = fs.readFileSync("./data/ndca.osm");
  const json = JSON.parse(parser.toJson(data));

  const hikingRelations = json.osm.relation.filter((route) =>
    route.tag.find((tag) => tag.k === "route" && tag.v === "hiking")
  );

  const edges = [];

  hikingRelations.map((hikingRoute) => {
    hikingRoute.member
      .filter((member) => member.type === "way")
      .map((memberWay) => {
        const way = json.osm.way.find((w) => w.id === memberWay.ref);
        if (way) {
          const nodes = way.nd.map((wayNode) => {
            const node = json.osm.node.find((n) => n.id === wayNode.ref);
            return {
              id: node.id,
              lat: parseFloat(node.lat),
              lon: parseFloat(node.lon),
            };
          });

          const tracktype =
            way.tag &&
            way.tag.length &&
            way.tag.find((t) => t.k === "tracktype");

          const smoothness =
            way.tag &&
            way.tag.length &&
            way.tag.find((t) => t.k === "smoothness");

          for (var ni = 0; ni < nodes.length - 1; ni++) {
            const thisNode = nodes[ni];
            const nextNode = nodes[ni + 1];

            edges.push({
              from: thisNode,
              to: nextNode,
              smoothness: smoothness ? smoothness.v : false,
              tracktype: tracktype ? tracktype.v : false,
            });
          }

          //console.log(edge);
          //console.log(nodes);
        }
      });
  });

  for (var ei in edges) {
    const edge = edges[ei];

    await client.query(
      `INSERT INTO edges(
        geom,dir,dist,tracktype,smoothness
      ) VALUES (
        st_makeline(
          st_point(${edge.from.lon}, ${edge.from.lat}), 
          st_point(${edge.to.lon}, ${edge.to.lat})
        ),
        'B',
        st_distance(
          st_point(${edge.from.lon}, ${edge.from.lat}), 
          st_point(${edge.to.lon}, ${edge.to.lat})
        ),
        '${edge.smoothness}', 
        '${edge.tracktype}'
      )`
    );
  }
  await client.query(`SELECT pgr_createTopology('edges',0.001, 'geom', 'id');`);
  await client.end();
})();
