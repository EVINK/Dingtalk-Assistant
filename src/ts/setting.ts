import Vue from 'vue'
import { StorageArea, sendMessage, getCurrentPage } from './utils'


// tslint:disable-next-line:no-unused-expression
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
                    banSnapshotShortcut: false,
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
            if (!this.settings.banSnapshotShortcut && this.settings.snapshotShortcut.length <= 0) {
                this.genBubbleMsg('设置未保存')
                setTimeout(() => this.genBubbleMsg('截图快捷键不是一个合法值'), 300)
                setTimeout(() => this.genBubbleMsg('如无需使用快捷键，建议直接禁用'), 600)
                return
            }
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
