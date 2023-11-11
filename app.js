'use strict';

const { createServer } = require('http');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('./controller/user');

const port = process.env.PORT || 4000;

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // if (url === '/register' && method === 'POST') {
  //   createUser(req, res);
  // } else if (url === '/users' && method === 'GET') {
  //   getUsers(req, res);
  // } else if (url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'GET') {
  //   const id = url.split('/')[2];
  //   getUser(req, res, id);
  // } else if (url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'PUT') {
  //   const id = url.split('/')[2];
  //   updateUser(req, res, id);
  // } else if (url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'DELETE') {
  //   const id = url.split('/')[2];
  //   deleteUser(req, res, id);
  // } else {
  //   res.statusCode = 404;
  //   res.end(JSON.stringify({ err: 'Resource not found' }));
  // }

  switch (true) {
    case url === '/register' && method === 'POST':
      createUser(req, res);
      break;

    case url === '/users' && method === 'GET':
      getUsers(req, res);
      break;

    case url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'GET':
      const id = url.split('/')[2];
      getUser(req, res, id);
      break;

    case url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'PUT':
      const uid = url.split('/')[2];
      updateUser(req, res, uid);
      break;

    case url.match(/((\/users\/)[a-z0-9-]{36})/) && method === 'DELETE':
      const did = url.split('/')[2];
      deleteUser(req, res, did);
      break;

    default:
      console.log($id);
      res.statusCode = 404;
      res.end(JSON.stringify({ err: 'Resource not found' }));
      break;
  }
});

server.listen(port, function () {
  console.log(`Server has started, Port: ${port}`);
});
