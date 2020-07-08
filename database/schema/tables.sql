create extension
if not exists "uuid-ossp";

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
  node_from uuid,
  node_to uuid,
  hiking text,
  tracktype text,
  smoothness text,
  cost_from text,
  cost_to text,
  dist text
);