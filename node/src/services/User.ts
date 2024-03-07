import User from "../models/User";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import jwt from "../helpers/Jwt";

import { IAny, IResponse } from "../interfaces";

function saveSession(user: any) {
  const tokens = jwt.get_cookie_tokens(user);

  // gallery ression
  this.set_cookie("_gallery_sesh", JSON.stringify(tokens));
}

function removePassword(user: any) {
  delete user.password;

  return user;
}

async function createLocalUserAccount(body: any): Promise<IResponse> {
  try {
    const newUser = await User.add({
      fullname: body.fullname,
      username: body.username,
      email: body.email,
      password: await hasher.hash(body.password),
    });

    saveSession.call(this, removePassword(newUser.toJSON()));

    this.successful = true;
    this.username = body.username;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authLocalUserAccount(body: any): Promise<IResponse> {
  try {
    const user = await User.getByUsernameOrEmail(body.identifier);

    if (!user || (user && !(await hasher.isSame(user.password, body.password))))
      throw "Email address, username, or password is incorrect";
    else if (user.authType != "local")
      throw `Email address, username, already registered with ${user.authType}`;

    saveSession.call(this, removePassword(user.toJSON()));

    this.successful = true;
    this.username = user.username;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getUserSession(_, user: IAny): Promise<IResponse> {
  this.user = user;

  return this;
}

export default { getUserSession, createLocalUserAccount, authLocalUserAccount };
