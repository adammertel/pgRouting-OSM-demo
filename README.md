# pgRouting-OSM demo

Minimal working example of PostgreSQL database with PostGIS and PGrouting extensions searching shortest paths in OSM data.
The repository consists of a simple API node server and a web-based demo application written in typescript.

## Reproduce

## 1. Download Data

- download a portion of OSM data by e.g., running `wget -O ndca.osm 'https://api.openstreetmap.org/api/0.6/map?bbox=18.15,48.92,18.20,48.95'` in CLI

## 2. Database

- run docker with postgreSQL + postGIS + pgRouting with `sudo docker-compose up` (or `sudo docker-compose up -d` to run in the background)
- check whether PostGIS and pgRouting is working:
  - connect to the database in docker instance via psql environment `docker exec -it pgrouting-demo psql -U postgres`
  - execute `\c trails;` to switch to the trails database and `select * from edges;` to check the table exists (there are still no data) and `select * from pg_extension` or `\dx` to check whether extensions pgRouting and PostGIS installed correctly

## 3. Import Data to the Database

- go to the /database folder (`cd database`) and install npm dependencies with `npm install`
- run `node import/main.js`
- you can test pgrouting capabilities by running (you need to switch to trails database before doing this) `SELECT * FROM pgr_dijkstra('SELECT id,source,target,dist as cost FROM edges', 210, 216, directed:=false);` in the psql environment or any database workbench; the command should return the shortest path between nodes 210 and 216

## 4. Run the server

- go to /server folder (`cd server`) and install npm dependencies with `npm install` (node an npm is needed)
- run server by `npm run dev`

## 5. Run Client Application

- go to /client folder (`cd client`) and install npm dependencies with `npm install`
- run `npm start` from the /client folder

## 6. Have fun

- open `http://localhost:9000/` in your favorite browser and drag the markers around (note that the region loaded in the database is not large)

https://user-images.githubusercontent.com/12932677/120118450-dea9fb80-c192-11eb-88ff-9156da57b481.mp4
