CREATE TYPE vehicle_activity AS ENUM ('Cars (by market segment)', 'Cars (by size)', 'Motorbike', 'Vans', 'HGV (all diesel)', 'HGVs refrigerated (all diesel)');

CREATE TYPE vehicle_type AS ENUM (
    'Mini', 'Supermini', 'Lower medium', 'Upper medium', 'Executive', 'Luxury', 
    'Sports', 'Dual purpose 4X4', 'MPV', 'Small', 'Medium', 'Large car','Large', 'Average car',
    'Class I (up to 1.305 tonnes)', 'Class II (1.305 to 1.74 tonnes)', 
    'Class III (1.74 to 3.5 tonnes)', 'Rigid (>3.5 - 7.5 tonnes)', 
    'Rigid (>7.5 tonnes-17 tonnes)', 'Rigid (>17 tonnes)', 'All rigids', 
    'Articulated (>3.5 - 33t)', 'Articulated (>33t)', 'All artics', 'All HGVs',
    'Average', 'Average (up to 3.5 tonnes)','Medium car','Small car'
);

CREATE TYPE vehicle_fuel AS ENUM (
    'Diesel', 'Petrol', 'Hybrid', 'CNG', 'LPG', 'Unknown', 
    'Plug-in Hybrid Electric Vehicle', 'Battery Electric Vehicle'
);

CREATE TYPE vehicle_laden AS ENUM (
    '0% Laden', '50% Laden', '100% Laden', 'Average laden', 'Not Applicable'
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
    vehicle_activity vehicle_activity NOT NULL,
    vehicle_type vehicle_type NOT NULL,
    vehicle_fuel vehicle_fuel NOT NULL,
    vehicle_laden vehicle_laden NOT NULL,
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
