import mongoose from "mongoose";
import QueryBuilder from "../../helpers/Query-builder";

import Room from "./Room";

export default new Room(mongoose, QueryBuilder);
