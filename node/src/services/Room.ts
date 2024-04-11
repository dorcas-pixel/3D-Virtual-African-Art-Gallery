import Room from "../models/Room";
import User from "../models/User";

import v from "../helpers/Validation";
import { makeId } from "../helpers/String";

import { IAny, IResponse } from "../interfaces";
import { Types } from "mongoose";

import frameServices from "./Frame"

export default class RoomServices {
  static async createRoom(body: any, user: any): Promise<IResponse> {
    try {
      const {name} = body;

      const uniqueId = makeId(6);

      const room = await Room.add({
        name: name,
        uniqueId,
        artist: user._id
      });

      frameServices.addFrameToRoom(room._id);

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async getArtistRoomsByUsername(body: any): Promise<IResponse> {
    try {
      const user = await User.getByUsername(body.username);

      const rooms = await Room.getByArtist(user._id);

      this['rooms'] = rooms;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}


// export default class RoomServices {
//   static async createRoom(): Promise<any> {
//     try {
//       const uniqueId = makeId(6);

//       const room = await Room.add({
//         name: `Room ${uniqueId}`,
//         uniqueId,
//       });

//       frameServices.addFrameToRoom(room._id);
//       // standServices.addStandsToRoom(room._id)

//       return room;
//     } catch (e) {
//       throw e;
//     }
//   }

//   static async getRoom (kind?: string) : Promise<any> {
//     let room = await Room.getLatestRoom();

//     if (!room || (room && kind && kind == 'model' && room.modelCount >= 6) || 
//       (room && kind && kind == 'portrait' && room.portraitCount >= 11)) room = RoomServices.createRoom();

//     return room;
//   }

//   static async getRoomIdOrDefault(
//     roomUniqueId: string | null
//   ): Promise<string> {
//     if (!roomUniqueId) {
//       let room = await RoomServices.getRoom();

//       return room._id as string;
//     }

//     return (await Room.getByUniqueId(roomUniqueId))._id as string;
//   }
// }
