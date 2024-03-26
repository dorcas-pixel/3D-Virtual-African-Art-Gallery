import Room from "../models/Room";

import v from "../helpers/Validation";
import { makeId } from "../helpers/String";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

import frameServices from "./Frame"

export default class RoomServices {
  static async createRoom(): Promise<any> {
    try {
      const uniqueId = makeId(6);

      const room = await Room.add({
        name: `Room ${uniqueId}`,
        uniqueId,
      });

      frameServices.addFrameToRoom(room._id);

      return room;
    } catch (e) {
      throw e;
    }
  }

  static async getRoom () : Promise<any> {
    let room = await Room.getLatestRoom();

    if (!room || (room && room.count >= 11)) room = RoomServices.createRoom();

    return room;
  }

  static async getRoomIdOrDefault(
    roomUniqueId: string | null
  ): Promise<string> {
    if (!roomUniqueId) {
      let room = await RoomServices.getRoom();

      roomUniqueId = room.uniqueId;
    }

    return (await Room.getByUniqueId(roomUniqueId))._id as string;
  }
}
