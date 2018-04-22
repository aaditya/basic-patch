# BASIC AUTH API

## Introduction

> This API serves as a dummy check for NodeJS based Implementation of JSON Web Tokens and JSON Patch followed by Thumbnail generation of images.

## Installation and Running

### To install dependencies

> npm install

### To start server

> npm start

### To test api(s)

> npm test

## Route Information

S.No | Route | Method | Parameters
--- | --- | --- | ---
1 | /login | POST | username, password
2 | /patch | POST | object, patch(s) separated by ',' (both JSON)
3 | /thumbnail | POST | uri
