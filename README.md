# Exam Call 2

The structure of this repository is the following:
  - "Client" contains the code of the REACT client implementation;
  - "Mosquitto Configuration" contains the Eclipse Mosquitto configuration file;
  - "REST APIs Design" contains the OpenAPI document describing the design of the REST APIs;
  - "Server" contains the code of the Film Manager service application;
  - "Server/json_schemas" contains the design of the JSON Schemas.

# MQTT

## Design

#### Retention

Since each time the user refresh the data he gets the latest information from the server and the rate of the updates are not high for each film/review it was decided to not use the retention for this project

#### QoS

Because it is king of important to notify the users about the updates but receiving multiple messages won't cause any problem it is decided to use QoS of `1` 

## MQTT topics:

### Film

* **film/\$filmId/activate**
This topic is updated whenever activate/un-activate a film for reviewing which the id of the film is `$filmId`.
The related schema file: `mqttFilmActiveModel.schema.json`

* **film/\$filmId/review**
This topic is updated when a new review is published for the film with the id of `$filmId`.
The related schema file: `mqttReviewModel.schema.json`

### review

* **review**
Whenever a film is created, updated or deleted the data of the film is published in this topic.
The related schema file: `mqttReviewModel.schema.json`

* **review/\$reviewId/rating**
When the rating of the review with the id of `$reviewId` is updated the changes are sent in this topic
The related schema file: `mqttUpdateModel.schema.json`

* **review/\$reviewId/review**
When the text of the review with the id of `$reviewId` is updated the changes are sent in this topic
The related schema file: `mqttUpdateModel.schema.json`

* **review/\$reviewId/date**
When the date of the review with the id of `$reviewId` is updated the changes are sent in this topic
The related schema file: `mqttUpdateModel.schema.json`


### default users

**user 1:**
username: user1@gmail.com
password: 123456789

**user 2:**
username: user2@gmail.com
password: 123456789

**user 3:**
username: user3@gmail.com
password: 123456789