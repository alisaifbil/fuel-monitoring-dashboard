import { Schema, model, models } from "mongoose";

const VehicleFuelSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  vehicleName: {
    type: String,
    required: [true, "Vehicle name is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  volume: {
    type: Number,
    required: [true, "Volume is required."],
  },
  currentMileage: {
    type: Number,
    required: [true, "Mileage is required."],
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  petrolStation: {
    type: String,
  },
});

const VehicleFuelDetails = models.VehicleFuelDetails || model("VehicleFuelDetails", VehicleFuelSchema);

export default VehicleFuelDetails;
