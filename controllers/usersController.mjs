import UserService from "../services/userService.mjs";

export async function createUser(ctx) {
  try {
    const userId = await UserService.createUser.apply(ctx, ctx.request.body);
    ctx.body = { userId };
  }
  catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

export async function deleteUser(ctx) {
  try {
    const result = await UserService.apply(ctx, ctx.request.body);
    ctx.body = { result };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: err.message };
  }
}

export async function updateUser(ctx) {
  try {
    const result = await UserService.updateUser.apply(ctx, ctx.request.body);
    ctx.body = { result };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: err.message };
  }
}

export async function getUserById(ctx) {
  try {
    const user = await UserService.getUserById.apply(ctx, ctx.request.body);
    ctx.body = user;
  }
  catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

export async function getUsers(ctx) {
  try {
    const users = await UserService.getUsers.apply(ctx);
    ctx.body = users;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: err.message };
  }
}

export async function authenticateUser(ctx) {
  try {
    const user = await UserService.authenticateUser.apply(ctx, ctx.request.body);
    ctx.body = user;
  }
  catch (error) {
    ctx.status = 401;
    ctx.body = { error: error.message };
  }
}

export default {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  authenticateUser
};
