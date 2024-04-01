import Stand from "../models/Stand";

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
      Stand.updateDetails(body.standId, {
        model: body.modelId,
        hasModel: true
      });
      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
