const {XdccClient, XdccEvents} = require('irc-xdcc-2');
const express = require('express');
const app = express();

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
    , closeConnectionOnCompleted: false
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.json({
        'message': 'hello'
    });
});

app.post('/xdcc', async (req, res) => {
    console.log(req.body);
    const aneem = {
        "botNick": req.body.botNick,
        "packId": req.body.packId
    };
    grabXdcc(aneem);
    res.json(aneem);
    
});
app.listen(3000);

async function main() {
    try {
        const client = await XdccClient.create(ircOptions);
        console.log('Connected');

        client.on(XdccEvents.ircPm, ircPmHandler);

    } catch (e) {
        console.log(e);
    }
}

async function grabXdcc({botNick, packId}) {
    const client = await XdccClient.create(ircOptions);
    await client.addTransfer({ botNick: botNick, packId: packId})
    client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(transfer.progress) })
    client.on(XdccEvents.xdccError, (error) => { console.log(error) })
}

/**
 * @param {string} nick Nickname of sender
 * @param {string} text Message received
 * @param {XdccMessage} message Message object received
 */
async function ircPmHandler(nick, text, message) {
    console.log('ircPm');
    console.log(nick);
    console.log(text);
    console.log(message);
    // await client.addTransfer({ botNick: 'Cookie_', packId: '10604'})
    // client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(transfer) })
    // client.on(XdccEvents.xdccError, (error) => { console.log(error) })
}

// main();