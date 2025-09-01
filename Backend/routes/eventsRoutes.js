const express = require('express');

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsController");

const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);
router.post('/events',verifyToken,  createEvent);
router.put('/events/:id',verifyToken, updateEvent);
router.delete('/events/:id',verifyToken, deleteEvent);

module.exports = router;