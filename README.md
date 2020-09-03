# trail-catalog

## 1. Data

### <node />

position

### <way />

tags:

- tracktype
- smoothness
- highway

### <relation />

tags:

- hiking

## 2. Database

docker: postgreSQL + postGIS + pgRouting
run database in docker `sudo docker-compose up`

```sql
CREATE EXTENSION "postgis-3"
CREATE EXTENSION "pgrouting"
```

### PostGIS

### Pgrouting

Example - get the closest connection between two nodes

- `SELECT * FROM pgr_dijkstra('SELECT id,source,target,dist as cost FROM edges', 210, 216, directed:=false);`

### PgAdmin

- http://127.0.0.1:42661/browser/

## 3. Data parsing

### import script

- `/database/import/main.js` or `npm run import --prefix database`

### output data

- **edges** table
- **edges_vertices_pgr** table

## 4. Server

- node + express +
