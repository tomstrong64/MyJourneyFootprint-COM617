# MyJourneyFootprint

## How to run

To run the application for development, run the following.
`docker compose up --build -d`

The server will be on port 3000 and the client on port 5173

To stop the application run
`docker compose down`

## Data insertion, how to run

Select directory ./MyJourneyFootprint/set_up
`cd set_up`

Run script data retrieves data from csv files and inserts it into Database
`node transformData.js`
