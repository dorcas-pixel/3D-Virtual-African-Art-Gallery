import mongoose from "mongoose";
import QueryBuilder from "../../helpers/Query-builder";

import Pedestal from "./Pedestal";

export default new Pedestal(mongoose, QueryBuilder);
