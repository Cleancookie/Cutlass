const express = require('express');
const app = express();

// controllers
const XdccService = require('./services/XdccService');
const TranscodeService = require('./services/TranscodeService');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.json({
        'message': 'hello'
    });
});

app.get('/unprocessed', XdccService.getListing);
app.post('/xdcc', XdccService.download);
app.post('/transcode', TranscodeService.transcodeVideo)

app.listen(3000);