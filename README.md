# pgrouting-demo

Demo repository to show capabilities of PGSQL database with PostGIS and PGrouting extensions to search shortest paths in OSM data.
A simple demo application written in ts and node is provided.

## Reproduce

## 1. Download Data

- Download a portion of osm data by e.g., running `wget -O ndca.osm 'https://api.openstreetmap.org/api/0.6/map?bbox=18.15,48.92,18.20,48.95'` in CLI

## 2. Database

Run docker with postgreSQL + postGIS + pgRouting

- run docker `sudo docker-compose up`
- check whether POSTGIS is working
  - connect to the database in docker instance via psql environment `docker exec -it pgrouting-demo psql -U postgres`
  - execute `\c trails;` to switch to the trails database and `select * from edges;` to check the table exists and `select * from pg_extension` or `\dx` to check whether extensions pgrouting and postGIS were installed

## 3. Import Data to the Database

- go to the /database folder `cd database` and install npm dependencies with `npm install`
- run `node import/main.js`
- you can test pgrouting capabilities by running `SELECT * FROM pgr_dijkstra('SELECT id,source,target,dist as cost FROM edges', 210, 216, directed:=false);` in the psql environment

## 4. Run Derver

- go to /server folder `cd server` and install npm dependencies with `npm install`
- run server by `npm run dev`

## 5. Run Client Application

- go to /client folder `cd client` an install npm dependencies with `npm install`
- `npm start`

## 6. Have fun

- open `http://localhost:8081/` in the browser an drag the markers around (just a small region is included in the demo)
