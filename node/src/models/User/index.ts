import mongoose from "mongoose"
import QueryBuilder from "../../helpers/Query-builder"

import User from "./User"

export default new User(mongoose, QueryBuilder);