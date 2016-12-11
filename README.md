# generate-node-hapi-swagger-rest
[![Build Status](https://travis-ci.org/gunjank/generate-node-hapi-swagger-rest.svg?branch=master)](https://travis-ci.org/gunjank/generate-node-hapi-swagger-rest)

This repo contains initial boilerplate code for a very simple `Hapi server`, with `Swagger Rest API`.

##Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See `Deployment` section below to know how to deploy the project on `Pivotal cloud foundry`.

###Prerequisites
* Install [Node.js] (https://nodejs.org/en/download/) - Runtime for your application.
* [Clone] (https://git-scm.com/docs/git-clone) code to your local pc or development location : `git clone <.git path>` 


###Installing

[Add required dependencies] (https://docs.npmjs.com/getting-started/installing-npm-packages-locally) - `npm install ` from your application root folder.

###Run
From your application root folder `npm start`

Copy and run below url in your browser 
`http://localhost:3000/documentation`

###Swagger Rest api
Application URL/documentation - Look on `src/config/settings.js` file for local port number and cloud url/port settings. 
`http://localhost:3000/documentation`

## Deployment - PCF 

Update name (give your application name) and host (your application host name) in manifest.yml file. 
```
name: generate-node-hapi-swagger-rest
host: generate-node-hapi-swagger-rest
```
[cf push](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html) -f manifest.yml  