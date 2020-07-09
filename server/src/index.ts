import express from "express";

const result = require("dotenv").config({ path: "./env/development.env" });
console.log(result);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
