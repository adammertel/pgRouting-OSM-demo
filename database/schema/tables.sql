create extension
if not exists "uuid-ossp";

create extension postgis;
create extension pgrouting;

--
-- Tables
--

create table nodes
(
  id uuid primary key default uuid_generate_v4(),
  x float,
  y float
);

create table edges
(
  id uuid primary key default uuid_generate_v4(),
  geom GEOMETRY,
  dir CHARACTER varying,
  source BIGINT,
  target BIGINT,
  cost FLOAT,
  dist FLOAT,
  tracktype TEXT,
  smoothness TEXT
);