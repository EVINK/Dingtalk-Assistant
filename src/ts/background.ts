chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await StorageArea.get('dtId')
    if (dtId === activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
        sendMessage({checkLSPStatus: true})
    }
})

let lastNotiId = ''

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.storeDtId) {
        StorageArea.set({dtId: sender.tab.id})
    } else if (message.snapshot) {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendMessage({snapshot: image})
        })
    } else if (message.chromeNotification) {
        if (lastNotiId) await clearChromeNotification(lastNotiId)
        lastNotiId = await sendChromeNotification(message.chromeNotification)
    }

    sendResponse({
        result: 'success'
    })
})

// for dev
// chrome.commands.onCommand.addListener((shortcut) => {
//     if (shortcut.includes("+M")) {
//         chrome.runtime.reload();
//     }
// })

interface chromeNotificationOptions {
    title: string,
    message: string,
    type: 'basic' | 'image' | 'list' | 'progress',
    iconUrl: string
}

// chrome notification
async function sendChromeNotification(data: chromeNotificationOptions): Promise<string> {
    data.type = 'basic'
    data.iconUrl = chrome.extension.getURL('icon.png')
    return new Promise((resolve, reject) => {
        chrome.notifications.create(null, {...data,}, (nid: string) => {
            if (chrome.runtime.lastError)
                return console.log(chrome.runtime.lastError.message)
            resolve(nid)
        })
    })
}

async function clearChromeNotification(nid: string) {
    return new Promise((resolve, reject) => {
        chrome.notifications.clear(lastNotiId, async (wasCleared: boolean) => {
            resolve(wasCleared)
        })
    })
}
