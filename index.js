const { XdccClient, XdccEvents } = require('irc-xdcc-2')

async function main() {
    // load irc-xdcc module
    // set options object
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

    try {
        const client = await XdccClient.create(ircOptions);
        console.log('Connected');

        client.on(XdccEvents.ircPm, (nick, to, text, message) => {
            console.log('ircPm');
        })

        await client.addTransfer({ botNick: 'Cookie_', packId: '10604'})
        client.on(XdccEvents.xdccProgressed, (transfer) => { console.log(transfer) })
        client.on(XdccEvents.xdccError, (error) => { console.log(error) })
    } catch (e) {
        console.log(e);
    }
}

main();