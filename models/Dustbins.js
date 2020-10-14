const mongoose = require("mongoose");

const dustbinSchema = new mongoose.Schema({
    dustbin_id:{
        type: Number,
        required:true
    },
    capacity:{
        type: Number,
        required:true
    },
    capacity_filled:{
        type: Number,
        required:true
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

module.exports = mongoose.model("Dustbin", dustbinSchema);