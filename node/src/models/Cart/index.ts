import mongoose from "mongoose"
import QueryBuilder from "../../helpers/Query-builder"

import Cart from "./Cart"

export default new Cart(mongoose, QueryBuilder);