# Arief Rohman BE Test
Simple REST Api using [express](https://expressjs.com/), [mongodb](https://www.mongodb.com/) and [redis](https://redis.io/).
> Support Node >= 18

## Installation
- clone this repo
- run `npm install` to install dependencies
- copy `.env.example` file into `.env` file and provide the value with your setup
- run `npm start` to run the server

## Authentication
```
POST /oauth/register

request:
  Content-Type: application/json
  Body: {
    "username": "yourusername"
  }

response:
  201 Created
  Content-Type: application/json
  Body: {
    "token": "access token"
  }

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```

```
POST /oauth/token

request:
  Content-Type: application/json
  Body: {
    "username": "yourusername"
  }

response:
  200 OK
  Content-Type: application/json
  Body: {
    "token": "access token"
  }

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```

## Endpoints
```
GET /ping

response:
  200 OK
  Content-Type: text/plain
  pong
```

```
GET /v1/user/accountNumber/:accountNumber

request:
  Authorization: Bearer <access token>

response:
  200 OK
  Content-Type: application/json
  Body: {
    "userName": "username",
    "accountNumber": "123456",
    "emailAddress": "user@email.com",
    "identityNumber": "654321",
    "id": "userid"
  }

  404 Not Found
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  401 Unauthorized
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```

```
GET /v1/user/identityNumber/:identityNumber

request:
  Authorization: Bearer <access token>

response:
  200 OK
  Content-Type: application/json
  Body: {
    "userName": "username",
    "accountNumber": "123456",
    "emailAddress": "user@email.com",
    "identityNumber": "654321",
    "id": "userid"
  }

  404 Not Found
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  401 Unauthorized
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```

```
POST /v1/user

request:
  Content-Type: application/json
  Authorization: Bearer <access token>
  Body: {
    "userName": "username",
    "accountNumber": "123456",
    "emailAddress": "user@email.com",
    "identityNumber": "654321"
  }

response:
  201 Created
  Content-Type: application/json
  Body: {
    "message": "User created",
    "user": {
      "userName": "username",
      "accountNumber": "123456",
      "emailAddress": "user@email.com",
      "identityNumber": "654321",
      "id": "userid"
    }
  }

  401 Unauthorized
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```

```
PATCH /v1/user/:userId

request:
  Content-Type: application/json
  Authorization: Bearer <access token>
  Body: {
    "userName": "username",
    "emailAddress": "user@email.com"
  }

response:
  200 OK
  Content-Type: application/json
  Body: {"message":"User updated"}

  404 Not Found
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  401 Unauthorized
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```
```
DELETE /v1/user/:userId

request:
  Authorization: Bearer <access token>

response:
  200 OK
  Content-Type: application/json
  Body: {"message":"User deleted"}

  404 Not Found
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  401 Not Authorized
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}

  400 Bad Request
  Content-Type: application/json
  Body: {"message":"error message","errors":["error message"]}
```