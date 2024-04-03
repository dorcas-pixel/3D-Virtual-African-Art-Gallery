import Order from "../models/Order";
import Cart from "../models/Cart";
import User from "../models/User";

import { IAny } from "../interfaces";

async function add (body: IAny, user: IAny) {
  try {
    const { transactionId } = body;
    const items = await Cart.getByUser(user._id);

    const artworks = [];
    const sellers = [];
    let cost = 0;

    items.forEach((item: any) => {
      artworks.push(item.artwork._id);
      sellers.push(item.artwork.user)

      cost += item.artwork.price;
    });

    Order.add({
      buyer: user._id,
      sellers,
      artworks,
      transactionId,
      cost
    })

    return this;
  } catch (e) { throw e }
}

async function finish(body: IAny, user: IAny) {
  try {
    const { transactionId } = body;

    await Order.updateByTransactionId(transactionId, {
      status: 'completed'
    });

    (await Cart.getByUser(user._id)).forEach(async (item: any) => {
      const user = await User.getById(item.artwork.user);

      user.credit += item.artwork.price;

      user.save()
    });

    await Cart.removeAllByUser(user._id);

    return this;
  } catch (e) { throw e }
}

async function getOrdersByUser(body: IAny, user: IAny) {
  try {
    this.orders = await Order.getByBuyer(user._id);

    return this;
  } catch (e) { throw e }
}

export default {
  add,
  finish,
  getOrdersByUser
}