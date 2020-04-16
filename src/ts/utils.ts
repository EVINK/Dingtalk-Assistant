export class StorageArea {

    public static set(data: object) {
        chrome.storage.local.set(data)
    }

    public static get(key: string) {
        return new Promise((resolve) => {
            chrome.storage.local.get(null, (result) => {
                resolve(result[key])
            })
        })
    }
}

// this is sendMessage to current page
export const sendMessage = (msg: object, callback?: () => {}) => {
    return new Promise(async (solve, reject) => {
        const thisPage = await getCurrentPage()
        chrome.tabs.sendMessage(thisPage.id, {message: msg}, callback);
    })
}


export async function getCurrentPage(): Promise<chrome.tabs.Tab> {
    // @ts-ignore
    return new Promise(resolve =>
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            const tab = tabs[0]
            resolve(tab)
        })
    )

}
