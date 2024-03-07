import mongoose from "mongoose"
import QueryBuilder from "../../helpers/Query-builder"

import Artwork from "./Artwork"

export default new Artwork(mongoose, QueryBuilder);