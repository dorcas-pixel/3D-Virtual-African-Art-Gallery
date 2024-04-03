import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

import v from "../helpers/Validation";
import Artwork from "../models/Artwork";

import path from "path";
import decompress from "decompress";
import ArtWorkServices from "./Artwork";

export default class ArtModelServices {
  static async addModelThumbnail(body: IAny, req: IAny): Promise<void> {
    try {
      if (!req.files[0]) throw "Please upload proper thumbnail";

      const artwork = await ArtWorkServices.getNotReadyOrMakeNew(
        req.store.userInfo._id,
        "model"
      );

      artwork.image = req.files[0].filename;
      artwork.hasImage = true;
      artwork.save();

      req.success = true;
      req.thumbnail = req.files[0].filename;
    } catch (e) {
      throw e;
    }
  }

  static async addModelFile(body: IAny, req: IAny): Promise<void> {
    try {
      if (!req.files[0]) throw "Please upload proper file";

      // unzip the folder
      const modelsPath = path.join(
        __dirname,
        `../../public/assets/uploads/artwork/models`
      );

      const zipFolder = req.files[0].filename;
      const folder = zipFolder.split(".zip");

      await decompress(
        `${modelsPath}/${zipFolder}`,
        `${modelsPath}/${folder[0]}`
      );

      const artwork = await ArtWorkServices.getNotReadyOrMakeNew(
        req.store.userInfo._id,
        "model"
      );

      if (!artwork.model) artwork.model = {};

      artwork.model.folder = folder[0];

      artwork.hasModel = true;
      artwork.save();

      req.art = artwork.toJSON();

      req.success = true;
    } catch (e) {
      throw e;
    }
  }

  static async addModelDetails(
    body: IAny,
    userInfo: IAny
  ): Promise<IResponse> {
    try {
      v.validate({
        'Name': { value: body.name, min: 3, max: 50 },
        'Description': { value: body.description, min: 3, max: 2000 },
        'Price': { value: body.price, min: 1, max: 8 }
      });

      if (!(/^[0-9]+$/.test(body.price))) throw 'Price must be a number, 0-9';

      const artwork = await ArtWorkServices.getNotReadyOrMakeNew(
        userInfo._id,
        "model"
      );

      // if (!artwork.hasImage) throw 'Please upload a thumbnail first';
      if (!artwork.hasModel) throw "Please upload a model file first";

      // artwork.model.type = "gltf";
      // artwork.model.file = body.fileName;
      artwork.name = body.name;
      artwork.description = body.description;
      artwork.price = body.price;

      artwork.isReady = true;

      artwork.save();

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
