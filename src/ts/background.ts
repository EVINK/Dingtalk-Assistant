import { sendMessage, StorageArea } from "./utils"

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await StorageArea.get('dtId')
    const theme = await StorageArea.get('theme') as string | null || 'original'
    if (dtId === activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
        sendMessage({checkLSPStatus: true})
        sendMessage({theme})
    }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.storeDtId) {
        StorageArea.set({dtId: sender.tab.id})
        chrome.windows.getCurrent({}, (window) => {
            StorageArea.set({dtWindowId: window.id})
        })
    } else if (message.snapshot) {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendMessage({snapshot: image})
        })
    } else if (message.chromeNotification) {
        Notify.sendChromeNotification(message.chromeNotification)
        StorageArea.set({lastMsgSender: message.sender})
    }

    sendResponse({
        result: 'success'
    })
})


class Notify {
    private static lastNotificationId: string = undefined

    constructor() {
        this.event()
    }

    public static async sendChromeNotification(data: chromeNotificationOptions): Promise<string> {
        if (Notify.lastNotificationId) await this.clearChromeNotification()
        if (!data.type) data.type = 'basic'
        if (!data.iconUrl) data.iconUrl = chrome.extension.getURL('icon.png')
        return new Promise((resolve) => {
            chrome.notifications.create(null, {...data,}, (nid: string) => {
                if (chrome.runtime.lastError)
                    return console.log(chrome.runtime.lastError.message)
                Notify.lastNotificationId = nid
                resolve(nid)
            })
        })
    }

    private static clearChromeNotification() {
        return new Promise((resolve) => {
            chrome.notifications.clear(Notify.lastNotificationId, async (wasCleared: boolean) => {
                resolve(wasCleared)
            })
        })
    }

    private event() {
        chrome.notifications.onClicked.addListener(async (notificationId) => {
            const settings: Settings = await StorageArea.get('settings') as Settings | null
            if(settings && settings.msgClickedAction === 'close') {
                return Notify.clearChromeNotification()
            }
            const dtId = await StorageArea.get('dtId') as number
            const windowId = await StorageArea.get('dtWindowId') as number
            if (!dtId || !windowId) return
            chrome.windows.update(windowId, {focused: true},)
            chrome.tabs.update(dtId, {active: true});
            sendMessage({clickNotification: true})
        })
    }
}

new Notify()



