const hbjs = require('handbrake-js');
const path = require('path');

module.exports.transcodeVideo = async (req, res) => {
    const { file } = req.body;
    console.log(req.body);

    const hbjsOptions = { 
        input: path.resolve(__dirname, '..', 'unprocessed', file), 
        output: path.resolve(__dirname, '..', 'processed', file) ,
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