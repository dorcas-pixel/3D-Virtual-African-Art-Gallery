import Artwork from "../models/Artwork";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";
import ArtWorkServices from "./Artwork";

export default class PortraitServices {
  static async addPortrait(body: IAny, req: IAny): Promise<void> {
    try {
      if (!req.files[0]) throw "Please upload proper thumbnail";

      const artwork = await ArtWorkServices.getNotReadyOrMakeNew(
        req.store.userInfo._id,
        "portrait"
      );

      artwork.image = req.files[0].filename;
      artwork.hasImage = true;
      artwork.save();

      req.success = true;
      req.portrait = req.files[0].filename;
    } catch (e) {
      throw e;
    }
  }

  static async addPortraitDetails(
    body: IAny,
    userInfo: IAny
  ): Promise<IResponse> {
    try {
      const { name, description } = body;

      const artwork = await ArtWorkServices.getNotReadyOrMakeNew(
        userInfo._id,
        "portrait"
      );

      if (!artwork.hasImage) throw "Please upload a portrait first";

      artwork.name = name;
      artwork.description = description;
      artwork.isReady = true;

      artwork.save();

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
