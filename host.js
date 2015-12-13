
/* Sending */

var packetList = [];

function sendData(packetName, str) {
    if (!channel) return;
    packetList.push({packetName: packetName, str: str, index: 0, sending: false, sent: false});
    startSendDatas();
}

var sending;

function startSendDatas() {
    if (sending) return;
    setInterval(function() {
        if (packetList.length == 0) return;

        var packet = packetList[0];

        if (packet.str.length < 8000) {
            sendOnChannel(true, {packetName: packet.packetName, str: packet.str, singleSend: true});
            packetList.shift();
            return
        }

        if (!packet.sending) {
            sendOnChannel(true, {packetName: packet.packetName});
            packet.sending = true;
            return;
        }
        if (packet.sent) {
            sendOnChannel(true, {sent: true});
            packetList.shift();
            return;
        }

        var str = packet.str.substring(packet.index, packet.index + 8000);
        packet.index += 8000;

        sendOnChannel(true, {str: str});

        if (packet.index >= packet.str.length) {
            packet.sent = true;
        }
    }, 500);
}

/* Decoding */

function decodeData(data) {
    packetName = data.packetName;
    strIn = data.str;
    callPackMan(packetName, strIn);
}

/* PackMan */

function callPackMan(packetName, strIn) {
    switch (packetName) {
        case "linkClicked":
            linkClicked(strIn);
            break;
    }
}

function linkClicked(href) {
    window.location.href = href;
}