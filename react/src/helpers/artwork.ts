import { getQuery } from "./URL";
import { postWithAuth } from "./http";

export interface Model {
  path: string;
  position: Array<number>;
  scale?: Array<number>;
  rotation?: Array<number>;
}

export async function getArtwork() {
  return await postWithAuth("/works/get/one", {
    id: getQuery("art"),
  });
}

export async function getArtistWorks(kind: string | null = null) {
  return await postWithAuth("/works/get/all/by/artist", {
    kind,
  });
}

export async function getFramesByRoom() {
  return await postWithAuth("/frames/get/by/room", {
    uniqueId: getQuery("room"),
  });
}

export async function getStandsByRoom() {
  return await postWithAuth("/stands/get/by/room", {
    uniqueId: getQuery("room"),
  });
}

export function setStandModel(standId: string, modelId: string) {
  postWithAuth("/stands/update/model", {
    standId,
    modelId,
  });
}

export function setFramePortrait(frameId: string, portraitId: string) {
  postWithAuth("/frames/update/portrait", {
    frameId,
    portraitId,
  });
}

export function updateArtworkScale(standId: string, scale: number) {
  postWithAuth("/stands/update/model/scale", {
    standId,
    scale,
  });
}

export function updateArtworkPosition(standId: string, position: any) {
  postWithAuth("/stands/update/model/position", {
    standId,
    x: position.x,
    y: position.y,
    z: position.z,
  });
}
