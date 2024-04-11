import axios from "axios";
import { getCookieValue } from "./cookies";
import { BASEURL } from "./URL";

const session = new Map();

const headers: any = {
  "Content-Type": "application/json;charset=utf-8",
};

export const post = async (url: string, options: any) => {
  const res = await fetch(`${BASEURL()}${url}`, {
    method: "POST",
    body: JSON.stringify(options.body),
    headers: options.headers,
    credentials: options.credentials ? "include" : undefined,
  });

  return await res.json();
};

export const postWithAuth = async (
  url: string,
  body: any,
  credentials = false
) => {
  const newHeaders = { ...headers };
  newHeaders["Authorization"] = `Bearer ${getCookieValue("_gallery_sesh")}`;

  return post(url, { body, headers: newHeaders, credentials });
};

export const getUserBySession = async () => {
  let user = session.get("user");

  if (!user) {
    const res = await postWithAuth("/user/get/by/session", {});

    session.set("user", res.user);

    user = res.user;
  }

  return user;
};

export const rememberUser = async (user: any) => {
  session.set("user", user);
};

export const getUserByUsername = async (username: string | null | undefined) => {
  if (!username) return false;

  let res: any = await postWithAuth("/user/get/by/username", {
    username,
  });

  return res.user;
};

export const postWithNoAuth = async (
  url: string,
  body: any,
  credentials = false
) => {
  return post(url, { body, headers, credentials });
};

export const postWithAxios = async (url: string, body: any, options?: any) => {
  const res = await axios.post(`${BASEURL()}${url}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookieValue("_gallery_sesh")}`,
    },
    onUploadProgress: options?.progress,
  });

  return res.data;
};
