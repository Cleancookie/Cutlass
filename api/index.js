const {XdccClient, XdccEvents} = require('irc-xdcc-2');
const hbjs = require('handbrake-js')
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
    , closeConnectionOnCompleted: true
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
    const xdccItem = {
        "botNick": req.body.botNick,
        "packId": req.body.packId
    };
    grabXdcc(xdccItem);
    res.json(xdccItem);
    
});

app.post('/transcode', async (req, res) => {
    const { file } = req.body;
    console.log(req.body);

    const hbjsOptions = { 
        input: `./unprocessed/${file}`, 
        output: `./processed/${file}.mp4` ,
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
})
app.listen(3000);

async function grabXdcc({botNick, packId}) {
    const client = await XdccClient.create(ircOptions);
    await client.addTransfer({ botNick: botNick, packId: packId})
    client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(transfer.progress) })
    client.on(XdccEvents.xdccError, (error) => { console.log(error) })
}