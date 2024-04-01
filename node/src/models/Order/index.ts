import mongoose from "mongoose";
import QueryBuilder from "../../helpers/Query-builder";

import Order from "./Order";

export default new Order(mongoose, QueryBuilder);
