import Cart from "../models/Cart";

import { IAny, IResponse } from "../interfaces";

export default class CartServices {
  static async getAllByUser(
    _: IAny,
    userInfo: IAny
  ): Promise<IResponse> {
    try {
      this['works'] = [];

      if (!userInfo) return this as unknown as IResponse;

      this['works'] = await Cart.getByUser(userInfo._id);
      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async add(body: IAny, userInfo: IAny): Promise<IResponse>  {
    const { artworkId } = body;

    try {
      await Cart.add({
        user: userInfo._id,
        artwork: artworkId
      })

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async removeItem(body: IAny, userInfo: IAny): Promise<IResponse> {
    const { itemId } = body;

    try {
      await Cart.removeItem(itemId)

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }

  static async removeAllItems(body: IAny, userInfo: IAny): Promise<IResponse>{
    try {
      await Cart.removeAllByUser(userInfo._id)

      this['successful'] = true;

      return this as unknown as IResponse;
    } catch (e) {
      throw e;
    }
  }
}
