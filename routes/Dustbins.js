const express = require("express");
const dustbinsRouter = express.Router();

const Dustbin = require("../models/Dustbins");

dustbinsRouter.get("/nearest", (req, res) => {
  console.log(typeof parseInt(req.query.long));
  Dustbin.find({
    location: {
      $near: {
        $geometry: {
          type: "point",
          coordinates: [parseInt(req.query.lat), parseInt(req.query.long)],
        },
      },
    },
  })
    .then((data) => {
      res.status(200).json({
        message: "All Dustbins Data is fetched Successfully",
        dustbins: data,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Dustbins Data cannot be fetched!",
        error: err,
      });
    });
});

// Add Dustbin by Regional Admin
dustbinsRouter.post("/add", (req, res) => {
  console.log("HITTING ADD DUSTBIN ROUTE");
  const { dustbin_id, capacity, capacity_filled, location } = req.body;
  Dustbin.findOne({ dustbin_id }, (err, dustbin) => {
    if (err)
      return res
        .status(500)
        .json({ message: { msgBody: "An error occured.", msgError: true } });
    if (dustbin)
      return res.status(400).json({
        message: { msgBody: "Dustbin id already taken.", msgError: true },
      });
    else {
      console.log("CREATING NEW DUSTBIN");
      const newDustbin = new Dustbin({
        dustbin_id,
        capacity,
        capacity_filled,
        location,
      });
      newDustbin.save((err) => {
        if (err)
          return res.status(500).json({
            message: {
              msgBody: "Error occured while saving details to DB. Try Again!",
              msgError: true,
            },
          });
        else
          return res.status(201).json({
            message: {
              msgBody: "Dustbin succesfully created.",
              msgError: false,
            },
          });
      });
    }
  });
});

module.exports = dustbinsRouter;
