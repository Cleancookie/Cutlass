const fs = require('fs');
const path = require('path');
const {XdccClient, XdccEvents} = require('irc-xdcc-2');

const ircOptions = {
    server: 'irc.rizon.net'
    , nick: 'Cookie_____'
    , userName: 'Cookie_____'
    , realName: 'Clean Cookie'
    , port: 6697
    , autoRejoin: true
    , autoConnect: true
    , channels: ['#NIBL']
    , secure: true
    , selfSigned: true
    , certExpired: true
    , stripColors: true
    , encoding: 'UTF-8'
    // xdcc specific options
    , progressInterval: 1
    , destPath: './unprocessed'
    , resume: false
    , acceptUnpooled: true
    , closeConnectionOnCompleted: true
};

module.exports.getListing = async (req, res) => {
    const fullPath = path.join(__dirname, '..' ,'unprocessed');
    let folder = fs.readdirSync(fullPath);

    // Get rid of hidden files
    folder = folder.filter(fileName => {
        return !fileName.startsWith('.');
    });

    res.json(folder);
}

module.exports.download = async (req, res) => {
    const xdccItem = {
        "botNick": req.body.botNick,
        "packId": req.body.packId
    };
    grabXdcc(xdccItem);
    res.json(xdccItem);
}

async function grabXdcc({botNick, packId}) {
    const client = await XdccClient.create(ircOptions);
    await client.addTransfer({ botNick: botNick, packId: packId})
    client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(transfer.progress) })
    client.on(XdccEvents.xdccError, (error) => { console.log(error) })
}