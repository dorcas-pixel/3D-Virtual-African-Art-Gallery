import User from "../models/User";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import jwt from "../helpers/Jwt";
import { getResponse } from "../helpers/response-wrap";

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
    v.validate({
      'Full name': { value: body.fullname, min: 3, max: 50 },
      'Username': { value: body.username, min: 3, max: 50 },
      'Email address': { value: body.email, min: 3, max: 50 },
      'Password': { value: body.password, min: 8, max: 50 },
      'Password again': { value: body.passwordAgain, is: ['Password', 'Passwords don\'t match'] }
    });

    if (await User.exists({ username: body.username })) throw 'Username is already in use'
    if (await User.exists({ email: body.email })) throw 'Email address is already in use'

    const newUser = await User.add({
      fullname: body.fullname,
      username: body.username,
      email: body.email,
      password: await hasher.hash(body.password),
    });

    saveSession.call(this, removePassword(newUser.toJSON()));

    this.successful = true;
    this.user = newUser.toObject();
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
    this.user = user.toObject();
  } catch (error) {
    throw error;
  }
  return this;
}

async function updateBasicInfo(body: any, user: any): Promise<IResponse> {
  try {
    const {fullname, username, email} = body;

    v.validate({
      'Full name': { value: fullname, min: 3, max: 50 },
      'Username': { value: username, min: 3, max: 50 },
      'Email address': { value: email, min: 3, max: 50 }
    });

    if (await User.exists({ email, _id: { $ne: user._id } })) throw 'Email address already exists'
    if (await User.exists({ username, _id: { $ne: user._id } })) throw 'Username already exists'

    await User.updateDetails(user._id, {
      fullname,
      username,
      email
    })

    const _user = await User.getById(user._id)

    saveSession.call(this, removePassword(_user.toJSON()));

    this.successful = true;
    this.user = _user.toObject();
  } catch (error) {
    throw error;
  }
  return this;
}

async function updateProfile (body: IAny, req: IAny, res: any): Promise < void> {
  try {
    if(!req.files[0]) throw "Please upload profile photo";

    await User.updateDetails(req.store.userInfo._id, {
      picture: req.files[0].filename
    })

    req.store.userInfo.picture = req.files[0].filename;
    delete req.store.userInfo.iat;
    delete req.store.userInfo.exp;

    saveSession.call(getResponse(res), req.store.userInfo);

    req.success = true;
  } catch(e) {
    throw e;
  }
}

async function getUserSession(_, user: IAny): Promise<IResponse> {
  this.user = user;

  return this;
}

async function getUserByUsername(body: IAny): Promise<IResponse> {
  const user = await User.getByUsername(body.username);

  this.user = user;

  return this;
}

export default { getUserSession, updateBasicInfo, updateProfile, createLocalUserAccount, authLocalUserAccount, getUserByUsername };
