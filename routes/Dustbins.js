const express = require("express");
const dustbinsRouter = express.Router();

const mongoose = require("mongoose");
const keys=require("../config/keys")


mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const Dustbin = require("../models/Dustbins");

var conn = mongoose.connection;

// dustbinsRouter.get("/", (req, res) => {
//   console.log("RESS");
// });

dustbinsRouter.get('/dustbin/:lat.:long', (req, res) => {
  Dustbin.find({
   locations:
     { $near :
        {
          $geometry: { type: "Point",  coordinates: [ req.params.long, req.params.lat ] },
          $minDistance: 0.5,
          $maxDistance: 1000
        }
     }
 })
      .then((data) => {
          // res.status(200).json({
          //     message: "All Dustbins Data is fetched Successfully",
          //     dustbins: data
          // });
      })
      .catch(() => {
          res.status(401).json({
              message: "Dustbins Data cannot be fetched!"
          });
      });
});

// Add Dustbin by Regional Admin
dustbinsRouter.post('/dustbin/add', (req, res) => {
  
  
  
  // Dustbin.findOne({ id: req.body.dustbinId })
  //     .then((dustbin) => {
  //         if (dustbin) {
  //             return res.json({
  //                 message: "Dustbin Already Exist"
  //             });
  //         }
  //     })
conn.on("connected",function(){
    console.log("Connection successfully");
});

conn.on("disconnected", function(){
    console.log("disconnected connection");
});

conn.on("error", console.error.bind(console, 'connection error:'));

  const dBin = new Dustbin({
      dustbin_id: 123,
      capacity: 70,
      capacity_filled: 50,
      location: {
        "type": "Point",
        "coordinates": [
          25.1973,//latitude
          55.2793 //longitude
        ]
      }
  });
  conn.once('open', function() {
      dBin.save(function(err, res){

           if(err) throw error;
            console.log(res);
            conn.close();
        });
    });

 });




module.exports = dustbinsRouter;
