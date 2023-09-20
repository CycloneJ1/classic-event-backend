const router = require("express").Router();

const mongoose = require("mongoose");

const Event = require("../models/Event.model");
const Guest = require("../models/Guest.model");

router.post("/guests", (req, res, next) => {
  const { name, description, imageUrl, eventId } = req.body;

  const newGuest = {
    name,
    description,
    imageUrl,
    event: eventId,
  };

  Guest.create(newGuest)
    .then((newGuest) => {
      return Event.findByIdAndUpdate(eventId, {
        $push: { guests: newGuest._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error creating new guest...", err);
      res.status(500).json({
        message: "Error creating a new guest",
        error: err,
      });
    });
});

module.exports = router;
