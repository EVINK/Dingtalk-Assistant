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
    return new Promise(async (solve, reject) => {
        const thisPage = await getCurrentPage()
        chrome.tabs.sendMessage(thisPage.id, {message: msg}, callback);
    })
}


async function getCurrentPage(): Promise<chrome.tabs.Tab> {
    // @ts-ignore
    return new Promise(resolve =>
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            const tab = tabs[0]
            resolve(tab)
        })
    )

}
