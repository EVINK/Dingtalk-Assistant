import Vue from "../../node_modules/vue/types/index"
// import { StorageArea, sendMessage, getCurrentPage } from './utils'

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

new Vue({
    el: '#app',
    data: {
        page: 'general',
        notificationLock: false,
        settings: {},
        bubbleWin: document.createElement('div') as HTMLDivElement,
        versionCheck: true,
    },
    methods: {
        routeTo(page: string, clearData?: boolean) {
            this.page = page
            if (clearData) {
                this.syncData()
            }
        },
        async syncData() {
            const settings: Settings = await StorageArea.get('settings') as Settings | null
            if (settings) {
                this.settings = settings
            } else {
                this.settings = {
                    banGlobalStyle: true,
                    banSnapshotShortcut: true,
                    snapshotShortcut: ['Ctrl', 'Alt', 'a'],
                    msgClickedAction: 'focus',
                }
            }
            this.notificationLock = await StorageArea.get('notificationLock') as boolean | null
            // const versionCheck = (await StorageArea.get('versionCheck') as boolean | null)
            // if (typeof versionCheck !== 'boolean') this.versionCheck = true
            // else this.versionCheck = versionCheck
        },
        saveSettings() {
            // 禁止全局样式
            this.settings.banGlobalStyle = true
            // 禁止截图快捷键（截图现在太粗糙了，等稍微做好点在放出来，但保留了手动按钮）
            this.settings.banSnapshotShortcut = true
            // if (!this.settings.banSnapshotShortcut && this.settings.snapshotShortcut.length <= 0) {
            //     this.genBubbleMsg('设置未保存')
            //     setTimeout(() => this.genBubbleMsg('截图快捷键不是一个合法值'), 300)
            //     setTimeout(() => this.genBubbleMsg('如无需使用快捷键，建议直接禁用'), 600)
            //     return
            // }
            StorageArea.set({ settings: this.settings })
            StorageArea.set({ notificationLock: this.notificationLock })
            // StorageArea.set({versionCheck: this.versionCheck})
            // if (this.versionCheck) chrome.runtime.sendMessage({versionCheck: true})
            this.genBubbleMsg('设置已保存')
        },
        cancelSettings() {
            this.syncData()
        },
        genBubbleMsg(msg: string) {
            const bubble = document.createElement('div') as HTMLDivElement
            bubble.classList.add('bubble-EvinK')
            const bubbleChild = document.createElement('p') as HTMLParagraphElement
            bubble.appendChild(bubbleChild)
            this.bubbleWin.appendChild(bubble)

            setTimeout(() => {
                bubble.remove()
            }, 5000)
            const bubbleOnClass = 'bubble-on'
            const bubbleLength = this.bubbleWin.querySelectorAll(`.${bubbleOnClass}`).length
            bubble.style.top = `${bubbleLength * 65}px`
            bubbleChild.innerText = `通知: ${msg}`
            bubble.classList.add(bubbleOnClass)
        },
        setSnapshotShortcut(e: Event) {
            if (this.settings.banSnapshotShortcut) return
            this.settings.snapshotShortcut = [];
            // tslint:disable-next-line:no-shadowed-variable
            (e.target as HTMLElement).onkeydown = (e) => {
                e.preventDefault()
                if (!e.key.trim()) return
                if (this.settings.snapshotShortcut.indexOf(e.key.trim()) >= 0) return
                this.settings.snapshotShortcut.push(e.key.trim())
            }
        },
    },
    async mounted() {
        this.syncData()
        this.bubbleWin.id = 'bubbleWin-EvinK'
        document.body.appendChild(this.bubbleWin)
    }
})

function fixBg() {
    const widht = document.body.clientWidth
    const height = document.body.clientHeight
    const WHRate = 3840 / 2160
    if (widht / height > WHRate) document.body.style.backgroundSize = '100vw auto'
    else document.body.style.backgroundSize = 'auto 100vh'
}

fixBg()

window.onresize = () => {
    fixBg()
}
