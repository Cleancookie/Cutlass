const hbjs = require('handbrake-js');
const path = require('path');
const fs = require('fs');

module.exports.transcodeVideo = async (fileName) => {
    // https://handbrake.fr/docs/en/latest/cli/command-line-reference.html
    const options = { 
        input: path.resolve(__dirname, '..', 'unprocessed', fileName), 
        output: path.resolve(__dirname, '..', 'processed', `${fileName}.mp4`) ,
        format: `av_mp4`,
        optimize: true,
        turbo: true,
        vb: 400,
        height: 480
    };

    const transcoder = hbjs.spawn(options);
    transcoder.on('error', err => {console.log(err)})
    transcoder.on('progress', progress => { console.log(`Percent complete: ${progress.percentComplete}, ETA: ${progress.eta}`) });
    transcoder.on('complete', () => {console.log(`Transcode Complete}`)});

    return options;
}

module.exports.getProcessed = async () => {
    const fullPath = path.join(__dirname, '..' ,'processed');
    let folder = fs.readdirSync(fullPath);

    // Get rid of hidden files
    folder = folder.filter(fileName => {
        return !fileName.startsWith('.');
    }).map(fileName => {
        return `/processed/${fileName}`;
    });

    return folder;
}

module.exports.getUnprocessed = async () => {
    const fullPath = path.join(__dirname, '..', 'unprocessed');
    let folder = fs.readdirSync(fullPath);

    // Get rid of hidden files
    folder = folder.filter(fileName => {
        return !fileName.startsWith('.');
    });

    return folder;
}