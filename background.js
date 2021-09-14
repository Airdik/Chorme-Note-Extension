/**
 * @author Airdik <eshrestha961@gmail.com>
 * Github: https://github.com/Airdik
 */

// Does not do anything as of now, just a proof of concept

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function () {
            
            console.log("popup has been closed");
        });

        port.onMessage.addListener((msg) => {
            console.log('Received in background.js through general port:', msg);
        });
    }
});


chrome.runtime.onMessage.addListener(function (req, sender, res) {
    console.log(req)
});