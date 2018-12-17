const storage = new (class {

    set(data: object) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(data)
        })
    }

    get(key: string) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(null, (result) => {
                resolve(result[key])
            })
        })
    }

})()


const sendMessage = function (msg: object, callback?: () => {}) {
    return new Promise((solve, reject) => {
        chrome.tabs.query({ active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: msg }, callback);
        });
    })
}
