# trail-catalog

## database

docker: postgreSQL + postGIS + pgRouting
run database in docker `sudo docker-compose up`

```sql
CREATE EXTENSION "postgis-3"
CREATE EXTENSION "pgrouting"
```

## Pgrouting

Example - get the closest connection between two nodes

- `SELECT * FROM pgr_dijkstra('SELECT id,source,target,dist as cost FROM edges', 210, 216, directed:=false);`

## data

### <node />

### <way />

tags:

- tracktype
- smoothness
- highway

### <relation />

tags:

- hiking
