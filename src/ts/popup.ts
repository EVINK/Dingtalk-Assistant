import { sendMessage, StorageArea } from "./utils"
import Vue from "../../node_modules/vue/types/index"

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
            return chrome.tabs.captureVisibleTab(null, {}, function (image) {
                sendMessage({ snapshot: image })
            })

            // 录屏
            // const thisPage = await getCurrentPage()
            // chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], thisPage, (streamId) => {
            //     console.log(streamId)
            // })
        },
        openSettingPage() {
            chrome.tabs.create({ url: chrome.extension.getURL('setting.html') });
        },
        themeChanged() {
            sendMessage({ theme: this.theme })
            StorageArea.set({ theme: this.theme })
            if (this.theme === 'original') sendMessage({ bubble: '请刷新网页钉钉' })
        },
    },
    async mounted() {
        const manifestData = chrome.runtime.getManifest()
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
