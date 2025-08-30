const Sermon = require('../models/Sermon');


const getAllSermons = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const perPage = parseInt(req.query._perPage) || 10;
    const sortField = req.query._sort || 'createdAt';
    const sortOrder = req.query._order === 'DESC' ? -1 : 1;

    const total = await Sermon.countDocuments();
    const sermons = await Sermon.find()
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean(); 

    const formatted = sermons.map((sermon) => ({
      ...sermon,
      id: sermon._id,
    }));

    res.setHeader('Content-Range', `sermons 0-${sermons.length}/${total}`);
    res.status(200).json(formatted)
  } catch (err) {
    console.error('Error fetching sermons:', err);
    res.status(500).json({ error: 'Failed to fetch sermons' });
  }
};

const getSermonById = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    
    res.status(200).json({ ...sermon.toObject(), id: sermon._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createSermon = async (req, res) => {
  try {
    const newSermon = new Sermon(req.body);
    const saved = await newSermon.save();
    res.status(201).json({ ...saved.toObject(), id: saved._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create sermon' });
  }
};

const updateSermon = async (req, res) => {
  try {
    const updated = await Sermon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    res.status(200).json({ ...updated.toObject(), id: updated._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update sermon' });
  }
};

const deleteSermon = async (req, res) => {
  try {
    const result = await Sermon.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllSermons, getSermonById, createSermon, updateSermon, deleteSermon };