CREATE TYPE activity AS ENUM ('Car (by market segment)', 'Car (by size)', 'Motorbike', 'Van', 'HGV', 'HGV (refridgerated)');

CREATE TYPE vehicle AS (
    activity activity,
    type VARCHAR(50),
    fuel VARCHAR(50),
);

CREATE TYPE car_type_by_market AS ENUM ('Mini', 'Supermini', 'Lower medium', 'Upper medium', 'Executive', 'Luxury', 'Sports', 'Dual purpose 4X4', 'MPV');
CREATE TYPE car_fuel_by_market AS ENUM ('Diesel', 'Petrol', 'Unknown', 'Plug-in Hybrid', 'Battery Electric')

CREATE TYPE car_by_market AS (
    type car_type_by_market,
    fuel car_fuel_by_market
) INHERITS (vehicle);

CREATE TYPE car_type_by_size AS ENUM ('Small', 'Medium', 'Large', 'Average');