const express = require('express');


const { getAllMinistries,
  getMinistryById,
  createMinistry,
  updateMinistry,
  deleteMinistry,} = require('../controllers/ministriesController.js');

const verifyToken = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.get('/ministries', getAllMinistries);
router.get('/ministries/:id', getMinistryById);
router.post('/ministries',verifyToken,  createMinistry);
router.put('/ministries/:id',verifyToken, updateMinistry);
router.delete('/ministries/:id',verifyToken, deleteMinistry);



module.exports =  router;
