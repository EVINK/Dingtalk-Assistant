chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await StorageArea.get('dtId')
    if (dtId === activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
        sendMessage({checkLSPStatus: true})
    }
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.storeDtId) {
        StorageArea.set({dtId: sender.tab.id})
    } else if (message.snapshot) {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendMessage({snapshot: image})
        })
    } else if (message.chromeNotification) {
        await Notify.sendChromeNotification(message.chromeNotification)
    } else if (message.versionCheck) {
        new VersionCheck()
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
    type?: 'basic' | 'image' | 'list' | 'progress',
    iconUrl?: string
}

class Notify {
    private static lastNotificationId: string = undefined

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
}


class VersionCheck {
    private static alarmName = 'versionCheckAlarm'
    private static endpoint = 'https://api.evink.cn/dt/version'

    constructor() {
        VersionCheck.create()
        VersionCheck.event()
    }

    private static create() {
        chrome.alarms.get(VersionCheck.alarmName, (alarm) => {
            if (!alarm)
                chrome.alarms.create(VersionCheck.alarmName, {when: Date.now() + 60, periodInMinutes: 180,})
        })
    }

    private static clear() {
        chrome.alarms.clear(VersionCheck.alarmName, (wasCleared => {
            if (wasCleared) console.log('alarm was removed')
        }))
    }

    private static async getLatestVersion() {
        const data = await fetch(VersionCheck.endpoint)
        const newVersion: string = await data.text()
        const versionAlarmed = await StorageArea.get('versionAlarmed')
        if (versionAlarmed === newVersion) return
        const version = chrome.runtime.getManifest().version
        if (version !== newVersion) {
            Notify.sendChromeNotification({
                title: `钉钉助手有可用的新版本-v${newVersion}`,
                message: '可前往设置页禁用新版本检查',
            })
            StorageArea.set({versionAlarmed: newVersion})
        }
    }

    private static event() {
        // period task
        chrome.alarms.onAlarm.addListener(async (alarm) => {
            if (alarm.name === VersionCheck.alarmName) {
                let versionCheck = await StorageArea.get('versionCheck') as boolean | null
                if (typeof versionCheck !== 'boolean') versionCheck = true
                if (!versionCheck) return VersionCheck.clear()
                VersionCheck.getLatestVersion()
            }
        })
    }
}

new VersionCheck()


