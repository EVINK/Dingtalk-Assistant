import Vue from "../../node_modules/vue/types/index"
// import { sendMessage, StorageArea } from "./utils"

interface MessageHubData {
    id: number
    data: any
}

class MessageHub {
    static map = {} as { [key: number]: (data?: MessageHubData) => void }

    static seed = 0

    static getMsgId() {
        if (this.seed > 1000 * 1000) {
            this.seed = 0
        }
        this.seed++
        return this.seed
    }

    static sendMessage(id: number, message: { [key: string]: any }, fn?: (data?: MessageHubData) => void) {
        if (id in this.map) {
            throw Error('MessageHub id conflict')
        }
        this.map[id] = fn
        window.top.postMessage({ ...message, id }, '*')
    }
}

window.addEventListener('message', function (event) {
    const data = event.data as MessageHubData
    const fn = MessageHub.map[data.id]
    if (fn) {
        fn(data)
    }
    delete MessageHub.map[data.id]
})

class StorageArea {
    static set(data: object) {
        return new Promise((resolve) =>
            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'storageSet', data }, () => resolve(null))
        )
    }

    static get(key: string) {
        return new Promise((resolve) =>
            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'storageGet', key }, (data) => resolve(data.data))
        )
    }
}

function sendMessage(msg: object, cb?: () => {}) {
    return new Promise((resolve) =>
        MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'sendMessage', msg, cb })
    )
}

function getManifestData() {
    return new Promise((resolve, reject) => {
        const id = MessageHub.getMsgId()
        MessageHub.sendMessage(id, { fn: 'getManifestData' }, (data) => {
            resolve(data.data)
        })
    })
}

new Vue({
    el: '#app',
    data: {
        fullScreen: true,
        loginStatusPersistence: true,
        fsSwitchAnimation: false,
        lspSwitchAnimation: false,
        menuOn: false,
        menuClicked: false,
        version: undefined,
        snapshotShortcut: ['Ctrl', 'Alt', 'A'],
        theme: 'original',
    },
    methods: {
        onFullScreen() {
            this.fullScreen = true
            this.fsSwitchAnimation = true
            StorageArea.set({ fullScreen: true })
            sendMessage({ fullScreen: true })
        },
        offFullScreen() {
            this.fullScreen = false
            this.fsSwitchAnimation = true
            StorageArea.set({ fullScreen: false })
            sendMessage({ fullScreen: false })
        },
        keepLoginStatus() {
            this.loginStatusPersistence = true
            this.lspSwitchAnimation = true
            StorageArea.set({ loginStatusPersistence: true })
            sendMessage({ bubble: '设置完成' })
            sendMessage({ checkLSPStatus: true })
        },
        notKeepLoginStatus() {
            this.loginStatusPersistence = false
            this.lspSwitchAnimation = true
            StorageArea.set({ loginStatusPersistence: false })
            sendMessage({ bubble: '设置完成，下次重新登陆后将生效' })
        },
        clickMenu() {
            this.menuOn = !this.menuOn
            this.menuClicked = true
        },
        snapshot() {
            // 截图 (当前网页)
            // return chrome.tabs.captureVisibleTab(null, {}, function (image) {
            //     sendMessage({ snapshot: image })
            // })

            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'snapshot' })

            // 录屏
            // const thisPage = await getCurrentPage()
            // chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], thisPage, (streamId) => {
            //     console.log(streamId)
            // })
        },
        openSettingPage() {
            // chrome.tabs.create({ url: chrome.extension.getURL('setting.html') })
            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'openPage', url: "settings-wrapper.html" })
        },
        themeChanged() {
            sendMessage({ theme: this.theme })
            StorageArea.set({ theme: this.theme })
            if (this.theme === 'original') sendMessage({ bubble: '请刷新网页钉钉' })
        },
    },
    async mounted() {
        // const manifestData = chrome.runtime.getManifest()
        const manifestData = await getManifestData() as chrome.runtime.Manifest
        this.version = manifestData.version
        this.fullScreen = await StorageArea.get('fullScreen') || false
        this.loginStatusPersistence = await StorageArea.get('loginStatusPersistence') || false
        const settings: Settings = await StorageArea.get('settings') as Settings | null
        if (settings) {
            if (settings.banSnapshotShortcut) this.snapshotShortcut = []
            else this.snapshotShortcut = settings.snapshotShortcut
        }
        this.theme = await StorageArea.get('theme') as string | null || 'original'
    }
})

