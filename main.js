function shorten_link() {
    input = document.getElementById("link_input").value;
    output = ""

    var attachmentPrefix = "https://cdn.discordapp.com/attachments/"
    var messagePrefix = "https://discord.com/channels/"
    var dmPrefix = "https://discord.com/channels/@me"
   

    var prefix = ""

    // Check which type of link it is

    if (input.indexOf(attachmentPrefix) != -1) {prefix = attachmentPrefix}
        
    if (input.indexOf(messagePrefix) != -1) {prefix = messagePrefix}

    if (input.indexOf(dmPrefix) != -1) {prefix = dmPrefix}

    if (prefix == "") {
        alert("Invalid link!")
        return;
    }


    // Set up then encode link into b64

    var linkInformation = input.substring(prefix.length).split("/")

    console.log(linkInformation);

    var serverID = BigInt(linkInformation[0])
    var channelID = BigInt(linkInformation[1])
    var thirdID = linkInformation[2]

    var serverCode = bnToB64(serverID)
    var channelCode = bnToB64(channelID)
    
    if (prefix == attachmentPrefix) output = `${window.location.origin}/file/${serverCode}/${channelCode}/${thirdID}`
    if (prefix == messagePrefix) output = `${window.location.origin}/msg/${serverCode}/${channelCode}/${bnToB64(BigInt(thirdID))}`
    if (prefix == dmPrefix) output =
    
    
     document.getElementById("link_output").innerText = output

}


function bnToB64(bn) {
    var hex = BigInt(bn).toString(16);
    if (hex.length % 2) { hex = '0' + hex; }

    var bin = [];
    var i = 0;
    var d;
    var b;
    while (i < hex.length) {
        d = parseInt(hex.slice(i, i + 2), 16);
        b = String.fromCharCode(d);
        bin.push(b);
        i += 2;
    }
    
    return btoa(bin.join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');;
}