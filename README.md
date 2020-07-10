# Installation

To run this project you need to have Node installed.

#### To install all the dependencies run in the root folder:
 `npm install` or `yarn install`
 

#### To run the project:
* `npm start` or `yarn start` - production environment
* `npm start:development` or `yarn start:development` - development environment
* `npm test` or `yarn test` -  run tests

## Project configuration
To connect to your mongodb atlas set in `.env` your db credentials :
* `DB_NAME`
* `DB_USER`
* `DB_PASSWORD`

If you need to connect to other mongodb database change file for desired environment from `/config/<environmnet>.js` 

To have a working email service change file for desired environment from `/config/<environmnet>.js` : `email:`

By default email service is using test credentials from `ethereal.email`, 
when an email is sent in `console.log` a preview link will be shown

## API

#### Endpoint `PUT /sensor-data` insert new sensor data, with the
following request body:

    {
        sensorId: string,
        time:     number,
        value:    number,
    }

* Return error 400 if the packet does not contain `sensorId`;
* Return error 400 if the packet does not contain `time`;
* Return error 409 if the packet is a duplicate  - `(sensorId, time)` pairings should
  be unique;
* Return 204 if the packet structure is valid, and the packet was successfully
  stored in the persistent storage.
* If sensor value is above or below the defined threshold for this sensor id, an email warning will be sent

#### Endpoint `DELETE /sensor-data` deletes all data related to a sensor, required query params:

        sensorId: string,


#### Endpoint `GET /sensor-data` returns all sensor data filtered my query params:
        sensorId: string -- filter by sensorId
        until: number -- filter by time that is until
        since: number -- filter by time since
        at: number -- filter by time at
        
* Returns an array of sensor data;

#### Endpoint `POST /threshold` insert new threshold, with the following request body:
     {
        sensorId: string,
        minValue: number,
        maxValue: number,
        email: string, -- where to send an alert when sensorData is above or below the defined values
     }

#### Endpoint `PUT /threshold/:id` update threshold (id - threshold id different from sensorId), with the following request body:
     {
        sensorId: string,
        minValue: number,
        maxValue: number,
        email: string, -- where to send an alert when sensorData is above or below the defined values
     }

#### Endpoint `DELETE /threshold/:id` delete threshold (id - threshold id different from sensorId);


#### Endpoint `GET /threshold` returns a list of thresholds;    
