import Artwork from "../models/Artwork";
import Room from "../models/Room";

import v from "../helpers/Validation";
import { makeId } from "../helpers/String";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";
import RoomServices from "./Room";

export default class ArtWorkServices {
  static async getNotReadyOrMakeNew(
    user: Types.ObjectId | string,
    kind: string
  ) {
    let artwork = await Artwork.getNotReadyByUser(user, kind);

    if (!artwork) {
      let room = await RoomServices.getRoom();

      room.count += 1;

      room.save();

      artwork = await Artwork.add({
        user,
        kind,
        room: room._id,
      });
    }

    return artwork;
  }

  static async getAll(body: IAny): Promise<IResponse> {
    try {
      if (!body.kind) this['works'] = await Artwork.getAllReady();
      else this['works'] = await Artwork.getAllReadyByKind(body.kind);

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async getAllByUser(
    body: IAny,
    userInfo: IAny
  ): Promise<IResponse> {
    const { kind } = body;

    try {
      this['works'] = [];

      if (!userInfo) return this as unknown as IResponse;

      if (!kind) this['works'] = await Artwork.getAllReadyByUser(userInfo._id);
      else
        this['works'] = await Artwork.getAllReadyByUserAndKind(
          userInfo._id,
          kind
        );

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async getFeatured(body: IAny): Promise<IResponse> {
    try {
      this['works'] = await Artwork.getFeatured();
      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async getById(body: IAny): Promise<IResponse> {
    try {
      this['art'] = await Artwork.getById(body.id);

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  // static async updateArtworkScale(wrapRes: IResponse, body: IAny) {
  //   try {
  //     Artwork.updateDetails(body.artworkId, {
  //       "model.scale": body.scale,
  //     });

  //     return wrapRes;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // static async removeById(wrapRes: IResponse, body: IAny): Promise<IResponse> {
  //   try {
  //     wrapRes.art = await Artwork.getById(body.id);

  //     Artwork.delete(body.id);

  //     wrapRes.successful = true;

  //     return wrapRes;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
