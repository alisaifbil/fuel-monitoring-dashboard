import { Schema, model, models } from "mongoose";

const LOVSchema = new Schema({
  name: {
    type: String,
  },
  values: {
    type: Array,
  },
});

const LOVs = models.LOVs || model("LOVs", LOVSchema);

export default LOVs;
