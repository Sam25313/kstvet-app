const Ministry = require('../models/Ministry.js');

const getAllMinistries = async (req, res) => {
  try {
    const page = parseInt(req.query._page) || 1;
    const perPage = parseInt(req.query._perPage) || 10;
    const sortField = req.query._sort || 'createdAt';
    const sortOrder = req.query._order === 'DESC' ? -1 : 1;

    const total = await Ministry.countDocuments();
    const ministries = await Ministry.find()
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean(); 

    const formatted = ministries.map((ministry) => ({
      ...ministry,
      id: ministry._id,
    }));

     res.setHeader('Content-Range', `ministries 0-${ministries.length}/${total}`);
    res.status(200).json(formatted)
  } catch (err) {
    console.error('Error fetching ministries:', err);
    res.status(500).json({ error: 'Failed to fetch ministries' });
  }
};

const getMinistryById = async (req, res) => {
  try {
    const ministry = await Ministry.findById(req.params.id);
    if (!ministry) {
      return res.status(404).json({ message: 'Ministry not found' });
    }
   
    res.status(200).json({ ...ministry.toObject(), id: ministry._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createMinistry = async (req, res) => {
  try {
    const newMinistry = new Ministry(req.body);
    const saved = await newMinistry.save();
    res.status(201).json({ ...saved.toObject(), id: saved._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create ministry' });
  }
};

const updateMinistry = async (req, res) => {
  try {
    const updated = await Ministry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Ministry not found' });
    }
    res.status(200).json({ ...updated.toObject(), id: updated._id });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update ministry' });
  }
};

const deleteMinistry = async (req, res) => {
  try {
    const result = await Ministry.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Ministry not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllMinistries, getMinistryById, createMinistry, updateMinistry, deleteMinistry };