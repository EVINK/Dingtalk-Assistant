function fullscreen() {
    chrome.storage.local.get(null, (result) => {
        console.log(result.fullscreen);
        if (result.fullscreen === 'on') {
            sendMsg('on');
        }
    });
    function sendMsg(msg, callback) {
        chrome.tabs.query({ active: true }, function (tabs) {
            console.log(tabs);
            console.log(tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, { message: msg }, callback);
        });
    }
}
chrome.tabs.onCreated.addListener(fullscreen);
chrome.tabs.onUpdated.addListener(fullscreen);
//# sourceMappingURL=background.js.map