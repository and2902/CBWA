# Table of contents


## 1- Project details
## 2- Set Ups
## 3- Technologies used
## 4- Example Usage
## 5- Changelogs
## 6- Roadmap
## 7- Author

## **Project details**

*The project is to track the bug/issue related to the any project. A user created and the he create the project and there come some issue in that project and the other user create an issue and also comment on that issue against that project*

## **Set up**

*Very simple setup*
*1- Install node on your machine*
*2- Inside root directory run the command `npm install`*
*3- After installing the npm dependencies just run `node APP.js`*
**Your app is working**

## Technologies

**1- Node**
**2- Express**
**3- mongoDB**

## Example Usage

**From Postman Hit the urls and add the body if required**

*Create User*
 
 **URL ==> http://localhost:4000/users**
 **Method ==> POST**
 ## Body ===> {
 ##   "name":"test teser",
 ##  "email":"test_1121@mailinator.com",
 ##  "role":"User",
 ##  "password":"test1234"
 ## }

 *Get User*

 ## URL ==> http://localhost:4000/users
 ## Method ==> GET*

## Changelogs

**CBWA V1.0**
*Only create the routes and model for the user *

**CBWA V1.1**
*Only create the routes and model for the project and link between the user and project*

**CBWA V1.2**
*Only create the routes and model for the Issues and link between the Issues and project **

**CBWA V1.3**
*Only create the routes and model for the Comments and link between the comments and user and Project**

## Roadmap

*On First Step I Setup the local server using the express app in file App.js.Then I code the models in models write the schema of mongodb collections, and then make the routes and configure the models with the routes.*

## Author

*Anderson de castro*
