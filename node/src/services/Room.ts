import Artwork from "../models/Artwork";
import Room from "../models/Room";
import Pedestal from "../models/Pedestal";

import v from "../helpers/Validation";
import { makeId } from "../helpers/String";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

export default class RoomServices {
  static async createDefaultRoom() {
    try {
      if (await Room.exists({ name: "Genesis" })) return;

      const room = await Room.add({
        name: "Genesis",
        uniqueId: "0x-Gene",
      });

      RoomServices.addPedestalsToRoom(room._id);
    } catch (e) {
      throw e;
    }
  }

  static async createRoom(): Promise<any> {
    try {
      if (await Room.exists({ name: "Genesis" })) return;

      const uniqueId = makeId(6);

      const room = await Room.add({
        name: `Room ${uniqueId}`,
        uniqueId,
      });

      RoomServices.addPedestalsToRoom(room._id);

      return room;
    } catch (e) {
      throw e;
    }
  }

  static async addPedestalsToRoom(roomId: string | Types.ObjectId) {
    try {
      const positions = [
        [-3, 0, -7],
        [-1, 0, -7],
        [1, 0, -7],
        [3, 0, -7],
      ];

      for (let i = 0; i < positions.length; i++) {
        const [x, y, z] = positions[i];

        await Pedestal.add({
          position: {
            x,
            y,
            z,
          },
          room: roomId,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async updatePedestalModel(wrapRes: IResponse, body: IAny) {
    try {
      Pedestal.updateDetails(body.pedestalId, {
        model: body.modelId,
        hasModel: true,
      });

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async getRoomIdOrDefault(
    roomUniqueId: string | null
  ): Promise<string> {
    if (!roomUniqueId) roomUniqueId = "0x-Gene";

    return (await Room.getByUniqueId(roomUniqueId))._id as string;
  }

  static async getPedestalsByRoom(
    wrapRes: IResponse,
    body: IAny
  ): Promise<IResponse> {
    try {
      wrapRes.pedestals = await Pedestal.getByRoom(
        await RoomServices.getRoomIdOrDefault(body.uniqueId)
      );
      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async prepareRoom() {
    try {
    } catch (error) {}
  }
}
