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

module.exports.download = async (botNick, packId) => {
    const client = await XdccClient.create(ircOptions);
    await client.addTransfer({ botNick: botNick, packId: packId })
    client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(`Downloading ${transfer.fileName} - (${transfer.progress})`) })
    client.on(XdccEvents.xdccError, (error) => { console.log(error) })
    client.on(XdccEvents.xdccCompleted, (transfer) => { console.log(`Completed ${transfer.fileName}`) })

    return { botNick: botNick, packId: packId };
}