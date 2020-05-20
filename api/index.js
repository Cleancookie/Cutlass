const express = require('express');
const path = require('path');
const app = express();

// controllers
const VideoController = require('api/controllers/VideoController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Expose processed videos
app.use('/processed', express.static(path.resolve(__dirname, 'processed')));

app.get('/', async (req, res) => {
    res.json({
        'message': 'hello'
    });
});

app.post('/xdcc', VideoController.download);
app.post('/transcode', VideoController.transcodeVideo)
app.get('/processed', VideoController.getProcessed);
app.get('/unprocessed', VideoController.getUnprocessed);

app.listen(3000);