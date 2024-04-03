import Stand from "../models/Stand";
import Artwork from "../models/Artwork";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

import roomServices from "./Room";

export default class StandServices {
  static async addStandsToRoom(roomId: string | Types.ObjectId) {
    const stands = [
      {
        position: {
          x: -3.4,
          y: 0,
          z: 4
        }
      },
      {
        position: {
          x: -3.4,
          y: 0,
          z: 0
        }
      },
      {
        position: {
          x: -3.4,
          y: 0,
          z: -4
        }
      },
      {
        position: {
          x: 3.4,
          y: 0,
          z: 4
        }
      },
      {
        position: {
          x: 3.4,
          y: 0,
          z: 0
        }
      },
      {
        position: {
          x: 3.4,
          y: 0,
          z: -4
        }
      },
    ];

    try {
      for (let i = 0; i < stands.length; i++) {
        const { x, y, z } = stands[i].position;

        await Stand.add({
          position: {
            x,
            y,
            z,
          },
          room: roomId,
        });
      }
    } catch (e) { throw e; }
  }
  static async getStandsByRoom(
    body: IAny
  ): Promise<IResponse> {
    try {
      (this as unknown as IResponse).stands = await Stand.getByRoom(
        await roomServices.getRoomIdOrDefault(body.uniqueId)
      );
      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async setStandModel(
    body: IAny
  ): Promise<IResponse> {
    try {
      const stand = await Stand.getById(body.standId);

      stand.model = body.modelId;
      stand.hasModel = true

      const model = await Artwork.getById(body.modelId);
      model.room = stand.room;

      stand.save();
      model.save();
      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async adjustModelScale(
    body: IAny
  ): Promise<IResponse> {
    try {
      const { standId, scale } = body;

      await Stand.updateDetails(standId, {
        'modelScale': scale
      })

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async adjustModelPosition(
    body: IAny
  ): Promise<IResponse> {
    try {
      const { standId, x, y, z } = body;

      await Stand.updateDetails(standId, {
        'modelPosition': {
          x,
          y,
          z
        }
      })

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
