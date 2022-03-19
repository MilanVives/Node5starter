const express = require('express');
const router = express.Router();

//Default route, Website root GET http://localhost:PORT
router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
});

module.exports = router;