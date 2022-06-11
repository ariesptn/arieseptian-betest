User Service Sample project using NodeJS, Express, JWT, Mongoose (MongoDB), and Redis

To configure the server, rename the `.env-template` file to `.env` and edit the file as needed.

Use the following endpoint to get the token:

`POST /api/users/login` with empty request body

Put the token to the Authorization header to authenticate the following endpoints:

| endpoint                                                         | description                    |
|------------------------------------------------------------------|--------------------------------|
| `GET /api/users/find_all`                                        | get all users                  |
| `GET /api/users/<user_id>`                                       | find a user by id              |
| `GET /api/users/find_by_accnum?account_number=<account_number>`  | find a user by account number  |
| `GET /api/users/find_by_idnum?identity_number=<identity_number>` | find a user by identity number |
| `POST /api/users/`                                               | add a new user                 |
| `PUT /api/users/<user_id>`                                       | update a user                  |
| `DELETE /api/users/<user_id>`                                    | delete a user                  |

POST and PUT endpoints requires the `Content-type: application/json` header and the following request body:
```
{
    "userName": "<user name>",
    "accountNumber": "<account number>",
    "identityNumber": "<identity number",
    "email": "<email>"
}
```
