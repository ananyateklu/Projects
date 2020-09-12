const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise_model');

//This route gets files from the database
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;