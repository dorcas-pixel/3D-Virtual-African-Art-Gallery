import Frame from "../models/Frame";
import Artwork from "../models/Artwork";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

import roomServices from "./Room";

export default class FrameServices {
  static async addFrameToRoom(roomId: string | Types.ObjectId) {
    try {
      const frames = [
        {
          pos: {
            x: 2,
            y: 1,
            z: -8,
          },
        },
        {
          pos: {
            x: 0,
            y: 1,
            z: -8,
          },
        },
        {
          pos: {
            x: -2,
            y: 1,
            z: -8,
          },
        },
        {
          rotation: 90,
          pos: {
            x: -4,
            y: 1,
            z: -6,
          },
        },
        {
          rotation: 90,
          pos: {
            x: -4,
            y: 1,
            z: -2,
          },
        },
        {
          rotation: 90,
          pos: {
            x: -4,
            y: 1,
            z: 2,
          },
        },
        {
          rotation: 90,
          pos: {
            x: -4,
            y: 1,
            z: 6,
          },
        },
        {
          rotation: -90,
          pos: {
            x: 4,
            y: 1,
            z: -6,
          },
        },
        {
          rotation: -90,
          pos: {
            x: 4,
            y: 1,
            z: -2,
          },
        },
        {
          rotation: -90,
          pos: {
            x: 4,
            y: 1,
            z: 2,
          },
        },
        {
          rotation: -90,
          pos: {
            x: 4,
            y: 1,
            z: 6,
          },
        },
      ];

      for (let i = 0; i < frames.length; i++) {
        const { x, y, z } = frames[i].pos;

        await Frame.add({
          position: {
            x,
            y,
            z,
          },
          rotation: frames[i].rotation,
          room: roomId,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async getFramesByRoom(
    body: IAny
  ): Promise<IResponse> {
    try {
      (this as unknown as IResponse).frames = await Frame.getByRoom(
        await roomServices.getRoomIdOrDefault(body.uniqueId)
      );
      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async setFramePortrait(
    body: IAny
  ): Promise<IResponse> {
    try {

      const frame = await Frame.getById(body.frameId);

      frame.portrait = body.portraitId;
      frame.hasPortrait = true

      const portrait = await Artwork.getById(body.portraitId);
      portrait.room = frame.room;

      frame.save();
      portrait.save();

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
