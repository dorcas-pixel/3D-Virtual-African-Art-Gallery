import Artwork from "../models/Artwork";
import User from "../models/User";

import v from "../helpers/Validation";
import { makeId } from "../helpers/String";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

export default class ArtWorkServices {
  static async getNotReadyOrMakeNew(
    user: Types.ObjectId | string,
    kind: string
  ) {
    let artwork = await Artwork.getNotReadyByUser(user, kind);

    if (!artwork) {
      artwork = await Artwork.add({
        user,
        kind
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

  static async getAllByUsername(
    body: IAny
  ): Promise<IResponse> {
    const { kind, username } = body;

    try {
      this['works'] = [];

      const user = await User.getByUsername(username);

      if (!user) return this as unknown as IResponse;;

      if (!kind) this['works'] = await Artwork.getAllReadyByUser(user._id);
      else
        this['works'] = await Artwork.getAllReadyByUserAndKind(
          user._id,
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

  static async removeById(body: IAny): Promise<IResponse> {
    try {
      await Artwork.delete(body.artworkId);

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
