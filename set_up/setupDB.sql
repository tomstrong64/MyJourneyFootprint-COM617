CREATE TYPE vehicle_activity AS ENUM ('Car (by market segment)', 'Car (by size)', 'Motorbike', 'Van', 'HGV', 'HGV (refridgerated)');

CREATE TYPE vehicle_type AS ENUM (
    'Mini', 'Supermini', 'Lower medium', 'Upper medium', 'Executive', 'Luxury', 
    'Sports', 'Dual purpose 4X4', 'MPV', 'Small', 'Medium', 'Large', 'Average',
    'Class I (up to 1.305 tonnes)', 'Class II (1.305 to 1.74 tonnes)', 
    'Class III (1.74 to 3.5 tonnes)', 'Rigid (>3.5 - 7.5 tonnes)', 
    'Rigid (>7.5 tonnes-17 tonnes)', 'Rigid (>17 tonnes)', 'All rigids', 
    'Articulated (>3.5 - 33t)', 'Articulated (>33t)', 'All artics', 'All HGVs'
);

CREATE TYPE vehicle_fuel AS ENUM (
    'Diesel', 'Petrol', 'Hybrid', 'CNG', 'LPG', 'Unknown', 
    'Plug-in Hybrid Electric Vehicle', 'Battery Electric Vehicle'
);

CREATE TYPE vehicle_laden AS ENUM (
    '0% Laden', '50% Laden', '100% Laden', 'Average laden', 'Not Applicable'
);

CREATE TYPE VEHICLE AS (
    activity vehicle_activity,
    type vehicle_type,
    fuel vehicle_fuel,
    laden vehicle_laden
);

CREATE TYPE LATLNG AS (
    lat DECIMAL(9,6),
    lng DECIMAL(9,6)
);


CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Emissions (
    id SERIAL PRIMARY KEY,
    vehicle VEHICLE NOT NULL,
    emission FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS Trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    emission_id INTEGER NOT NULL,
    trip_start LATLNG NOT NULL,
    trip_end LATLNG NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (emission_id) REFERENCES Emissions(id)
);
