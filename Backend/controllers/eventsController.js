const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const perPage = parseInt(req.query._perPage) || 10;
    const sortField = req.query._sort || 'createdAt';
    const sortOrder = req.query._order === 'DESC' ? -1 : 1;

    const total = await Event.countDocuments();
    const events = await Event.find()
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean(); 

    const formatted = events.map((event) => ({
      ...event,
      id: event._id,
    }));

    res.setHeader('Content-Range', `events 0-${events.length}/${total}`);
    res.status(200).json(formatted)
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
   
    res.status(200).json({ ...event.toObject(), id: event._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    res.status(201).json({ ...saved.toObject(), id: saved._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ ...updated.toObject(), id: updated._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await Event.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };