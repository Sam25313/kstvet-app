const express = require('express');

const {
  getAllSermons,
  getSermonById,
  createSermon,
  updateSermon,
  deleteSermon,
} = require("../controllers/sermonsController");

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.get('/sermons', getAllSermons);
router.get('/sermons/:id', getSermonById);
router.post('/sermons',verifyToken,  createSermon);
router.put('/sermons/:id',verifyToken, updateSermon);
router.delete('/sermons/:id',verifyToken, deleteSermon);

module.exports = router;