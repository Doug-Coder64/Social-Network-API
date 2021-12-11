# Social Network API

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

A noSQL social Network API using Mongoose and Express.js

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)

## Installation

To install run `npm i`.

## Usage

To use the project run `npm start`. This will start the server on your local machine. Once it is started you can send requests to it.

## Requests

### <u>Users</u>

##### See All Users `GET` http://{YourURL}/api/users/

##### See User by ID `GET` http://{YourURL}/api/users/:userId

##### Create User `POST` http://{YourURL}/api/users/

```json
{
	// Username and Email must be unique
	"username": "test5",
	"email": "test5@gmail.com"
}
```

##### Update User `PUT` `http://{YourURL}/api/users/:userId`

##### Delete User `DELETE` `http://{YourURL}/api/users/:userId`

##### Add Friend `POST` `http://{YourURL}/api/users/:userId/friends/:friendId`

##### Delete Friend `DELETE` `http://{YourURL}/api/users/:userId/:friendsId`

### <u>Thoughts</u>

##### See All Thoughts `GET` `http://{YourURL}/api/thoughts/`

##### See Thought by ID `GET` `http://{YourURL}/api/thoughts/:thoughtId`

##### Create Thought `POST` `http://{YourURL}/api/thoughts/`

```json
{
	"thoughtText": "Here's another cool thought... but...",
	"username": "test1",
	"userId": "61b4f86302f7f22f43d63e9d"
}
```

##### Update thought `PUT` `http://{YourURL}/api/thoughts/:thoughtId`

##### Delete thought `DELETE` `http://{YourURL}/api/thoughts/:userId`

##### Add reaction `POST` `http://{YourURL}/api/thoughts/:thoughtId/reactions/:reactionId`

```json
{
	"username": "test2",
	"ReactionBody": "Love this thought"
}
```

##### Delete reaction `DELETE` `http://{YourURL}/api/users/:thought/:reactionId`

## Contributing

Think this projects missing something? Email or message me on GitHub!

## License

This Project is covered under the MIT

## Questions

Questions about the project?
Reach out:

- [douglaspeterson6@gmail.com](mailto:douglaspeterson6@gmail.com)
- [Doug-Coder64](https://github.com/Doug-Coder64)
