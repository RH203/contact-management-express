# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "user",
  "password": "password",
  "name": "name"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "user",
    "password": "password"
  }
}
```

Response Body Error:

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "user",
  "password": "password"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error:

```json
{
  "errors": "Username or password wrong!."
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:

- Authorization: token

Request Body:

```json
{
  "name": "name",
  "password": "new-password"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "new-name",
    "password": "new-password"
  }
}
```

Response Body Error:

```json
{
  "errors": "Name length max 100!"
}
```

## Get User API

## Logout User API
