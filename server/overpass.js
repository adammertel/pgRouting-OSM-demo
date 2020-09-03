var query_overpass = require("query-overpass");

const [xmin, xmax] = [48.9, 48.95];
const [ymin, ymax] = [18.15, 18.2];

const query = `
[out:json][timeout:25];
  relation[route="hiking"]
  (${xmin},${ymin},${xmax},${ymax});
out;
>;
out skel qt;
`;

console.log(query);

query_overpass(query, (err, data) => {
  if (err) {
    console.log("err");
    console.log(err);
  } else {
    console.log("data");
    console.log(data);
    console.log(data.features);
  }
});
