const XdccService = require('api/services/XdccService');
const TranscodeService = require('api/services/TranscodeService');

/**
 * Starts an Xdcc transfer 
 * 
 * @param {Request} req Body requires { botNick, packId }
 * @param {Response} res 
 */
module.exports.download = async (req, res) => {
    const { botNick, packId } = req.body;
    XdccService.download(botNick, packId);

    res.json({botNick, packId});
}

module.exports.transcodeVideo = async (req, res) => {
    const { fileName } = req.body;
    const job = TranscodeService.transcodeVideo(fileName);

    res.json(job);
}

module.exports.getProcessed = async (req, res) => {
    const listing = await TranscodeService.getProcessed();

    res.json(listing);
}

module.exports.getUnprocessed = async (req, res) => {
    const listing = await TranscodeService.getUnprocessed();

    res.json(listing);
}