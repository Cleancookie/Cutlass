const express = require('express');
const path = require('path');
const app = express();

// controllers
const XdccService = require('./services/XdccService');
const TranscodeService = require('./services/TranscodeService');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Expose processed videos
app.use('/processed', express.static(path.resolve(__dirname, 'processed')));

app.get('/', async (req, res) => {
    res.json({
        'message': 'hello'
    });
});

app.get('/unprocessed', XdccService.getListing);
app.post('/xdcc', XdccService.download);
app.post('/transcode', TranscodeService.transcodeVideo)
app.get('/processed', TranscodeService.getListing);

app.listen(3000);