const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  videoQueue: Array,
});

module.exports = mongoose.model("Room", RoomSchema);
