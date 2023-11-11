const User = require('../model/User');

function createUser(req, res) {
  let body;

  req.on('data', chunk => {
    const data = chunk.toString();
    body = JSON.parse(data);
  });

  req.on('end', async () => {
    res.statusCode = 201;

    try {
      const newUser = await User.create(body);

      res.end(JSON.stringify({ success: true, data: newUser }));
    } catch (error) {
      console.log(error);
    }
  });
}

async function getUsers(req, res) {
  res.statusCode = 200;

  try {
    const users = await User.findAll();

    res.end(JSON.stringify({ success: true, data: users[0], number: users[1] }));
  } catch (error) {
    console.log(error);
  }
}

async function getUser(req, res, id) {
  res.statusCode = 200;

  try {
    const user = await User.findById(id);

    res.end(JSON.stringify({ success: true, data: user }));
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req, res, id) {
  let body;

  req.on('data', chunk => {
    data = chunk.toString();
    body = JSON.parse(data);
  });

  req.on('end', async () => {
    try {
      res.statusCode = 201;

      const newUser = await User.updateById(id, { ...body });
      res.end(JSON.stringify({ success: true, newUser }));
    } catch (error) {
      res.statusCode = 400;

      res.end(JSON.stringify({ success: false, error: error }));
    }
  });
}

async function deleteUser(req, res, id) {
  try {
    res.statusCode = 200;

    const response = await User.removeById(id)

    res.end(JSON.stringify({ success: true, msg: response }));
  } catch (error) {
    console.log("Something went wrong");
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
