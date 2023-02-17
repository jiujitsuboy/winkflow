const userRepo = require("../../repositories/users");

const getUser = async (id) => {
  return userRepo.getUser(id);
};

const getUserByName = async (name) => {
  return userRepo.getUserByName(name);
};

const createUser = async (name) => {
  return userRepo.createUser(name);
};

module.exports = { getUser, getUserByName, createUser };
