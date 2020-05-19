const hbjs = require('handbrake-js');
const path = require('path');
const fs = require('fs');

module.exports.transcodeVideo = async (req, res) => {
    const { file } = req.body;

    const hbjsOptions = { 
        input: path.resolve(__dirname, '..', 'unprocessed', file), 
        output: path.resolve(__dirname, '..', 'processed', `${file}.mp4`) ,
        format: `av_mp4`,
        optimize: true,
        turbo: true,
        vb: 5,
        height: 5
    };

    const transcoder = hbjs.spawn(hbjsOptions);
    transcoder.on('error', err => {console.log(err)})
    transcoder.on('progress', progress => {console.log(`Percent complete: ${progress.percentComplete}, ETA: ${progress.eta}`)});

    res.json(hbjsOptions);
}

module.exports.getListing = async (req, res) => {
    const fullPath = path.join(__dirname, '..' ,'processed');
    let folder = fs.readdirSync(fullPath);

    // Get rid of hidden files
    folder = folder.filter(fileName => {
        return !fileName.startsWith('.');
    });

    res.json(folder);
}