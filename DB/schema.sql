drop database if exists benbar;
create database benbar;
use benbar;

create table recipes(
  id int not null auto_increment,
  name varchar(100),
  instructions varchar(500),
  ingredients varchar(300),
  measurements varchar(300),
  imageUrl varchar(100),
  primary key (id),
  unique key (name)
);

create table ingredients(
  id int not null auto_increment,
  name varchar(100),
  primary key (id)
);

-- insert into recipes () values ();

-- recipe data should come back like 
-- {
-- id: 100, name: 'Tequila Sunrise', 
-- instructions: 'Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Do not stir. Garnish and serve.', 
-- ingredients: 'tequila, orange juice, grenadine syrup',
-- measurements: '1.5 oz, 3 oz, 0.5 oz'
-- imageUrl: 'https://cdn.averiecooks.com/wp-content/uploads/2015/08/tequilasunrise-9-650x975.jpg'
-- }

-- insert into ingredients () values ();