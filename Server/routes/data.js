// // routes/auth.js
// const express = require("express");
// const { getLocations, getProperties } = require("../Controller/dataController")

// const router = express.Router();

// // Register a new user
// router.get('/api/locations', getLocations);

// // Login a user
// router.get('/api/properties', getProperties);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { getCities, getDistricts, getStates } = require('../Controller/dataController');

router.get('/states', getStates);
router.get('/districts', getDistricts);
router.get('/cities', getCities);

module.exports = router;
