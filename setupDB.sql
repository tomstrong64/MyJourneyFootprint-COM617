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
CREATE TYPE  car_fuel_by_size AS ENUM ('Diesel', 'Petrol', 'Hybrid', 'CNG', 'LPG', 'Unknown', 'Plug-in Hybrid Electric Vehicle', 'Battery Electric Vehicle');

CREATE TYPE car_by_size AS(
    type car_type_by_size,
    fuel    car_fuel_by_size
)INHERITS (vehicle);

CREATE TYPE motorbike_type AS ENUM ('Small', 'Medium', 'Large', 'Average');

CREATE TYPE motorbike AS(
    type motorbike_type,
)INHERITS (vehicle);

CREATE TYPE van_type AS ENUM('Class I (up to 1.305 tonnes)', 'Class II (1.305 to 1.74 tonnes)', 'Class III (1.74 to 3.5 tonnes)', 'Average (up to 3.5 tonnes)');
CREATE TYPE van_fuel_type AS ENUM ('Diesel', 'Petrol', 'CNG', 'LPG', 'Unknown'. 'Plug-in Hybrid Electric Vehicle', 'Battery Electric Vehicle')

CREATE TYPE van AS(
    type van_type,
    fuel  van_fuel_type
)INHERITS (vehicle);

CREATE TYPE hgv_type AS ENUM ('Rigid (>3.5 - 7.5 tonnes)', 'Rigid (>7.5 tonnes-17 tonnes)', 'Rigid (>17 tonnes)', 'All rigids', 'Articulated (>3.5 - 33t)', 'Articulated (>33t)', 'All artics', 'All HGVs');
CREATE TYPE hgv_laden AS ENUM ('0% Laden', '50% Laden', '100% Laden', 'Average laden');

CREATE TYPE hgv AS(
    type hgv_type,
    laden hgv_laden
)INHERITS (vehicle);

CREATE TYPE hgvs_refrigerated_type AS ENUM ('Rigid (>3.5 - 7.5 tonnes)', 'Rigid (>7.5 tonnes-17 tonnes)', 'Rigid (>17 tonnes)', 'All rigids', 'Articulated (>3.5 - 33t)', 'Articulated (>33t)','All artics', 'All HGVs');
CREATE TYPE hgvs_refrigerated_laden AS ENUM ('0% Laden', '50% Laden', '100% Laden', 'Average laden')


CREATE TYPE hgv_refrigerated AS(
    type hgvs_refrigerated,
    laden hgvs_refrigerated_laden
)INHERITS (vehicle);