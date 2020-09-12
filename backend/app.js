const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.listen(port, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})
