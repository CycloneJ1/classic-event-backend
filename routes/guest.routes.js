const router = require("express").Router();

const mongoose = require("mongoose");

const Event = require("../models/Event.model");
const Guest = require("../models/Guest.model");

router.post("/guests/create", (req, res, next) => {
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

// GET /api/guests-  Retrieves all of the guests
router.get("/guests", (req, res, next) => {
  Guest.find()
    .then((guests) => res.json(guests))
    .catch((err) => {
      console.error("Error getting list of guests...", err);
      res.status(500).json({
        message: "Error getting list of guests",
        error: err,
      });
    });
});

//  GET /guests/:guestId  Retrieve details of a single guest by their ID.
router.get("/guests/:guestId", (req, res, next) => {
  const { guestId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(guestId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Guest.findById(guestId)
    .then((guest) => {
      if (!guest) {
        res.status(404).json({ message: "Guest not found" });
      } else {
        res.json(guest);
      }
    })
    .catch((err) => {
      console.error("Error getting guest details...", err);
      res.status(500).json({
        message: "Error getting guest details",
        error: err,
      });
    });
});

router.put("/guests/:guestId", (req, res, next) => {
  const { guestId } = req.params;
  const { name, description, imageUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(guestId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = { name, description, imageUrl };

  Guest.findByIdAndUpdate(guestId, newDetails, { new: true })
    .then((updatedGuest) => {
      if (!updatedGuest) {
        res.status(404).json({ message: "Guest not found" });
      } else {
        res.json(updatedGuest);
      }
    })
    .catch((err) => {
      console.error("Error updating guest...", err);
      res.status(500).json({
        message: "Error updating guest",
        error: err,
      });
    });
});

// DELETE /guests/:guestId Delete a guest by their ID.
router.delete("/guests/:guestId", (req, res, next) => {
    const { guestId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Guest.findByIdAndRemove(guestId)
      .then((deletedGuest) => {
        if (!deletedGuest) {
          res.status(404).json({ message: "Guest not found" });
        } else {
          res.json({ message: "Guest deleted successfully" });
        }
      })
      .catch((err) => {
        console.error("Error deleting guest...", err);
        res.status(500).json({
          message: "Error deleting guest",
          error: err,
        });
      });
  });
  
module.exports = router;
