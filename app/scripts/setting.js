var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MessageHub {
    static getMsgId() {
        if (this.seed > 1000 * 1000) {
            this.seed = 0;
        }
        this.seed++;
        return this.seed;
    }
    static sendMessage(id, message, fn) {
        if (id in this.map) {
            throw Error('MessageHub id conflict');
        }
        this.map[id] = fn;
        window.top.postMessage(Object.assign(Object.assign({}, message), { id }), '*');
    }
}
MessageHub.map = {};
MessageHub.seed = 0;
window.addEventListener('message', function (event) {
    const data = event.data;
    const fn = MessageHub.map[data.id];
    if (fn) {
        fn(data);
    }
    delete MessageHub.map[data.id];
});
class StorageArea {
    static set(data) {
        return new Promise((resolve) => MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'storageSet', data }, () => resolve(null)));
    }
    static get(key) {
        return new Promise((resolve) => MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'storageGet', key }, (data) => resolve(data.data)));
    }
}
new Vue({
    el: '#app',
    data: {
        page: 'general',
        notificationLock: false,
        settings: {},
        bubbleWin: document.createElement('div'),
        versionCheck: true,
    },
    methods: {
        routeTo(page, clearData) {
            this.page = page;
            if (clearData) {
                this.syncData();
            }
        },
        syncData() {
            return __awaiter(this, void 0, void 0, function* () {
                const settings = yield StorageArea.get('settings');
                if (settings) {
                    this.settings = settings;
                }
                else {
                    this.settings = {
                        banGlobalStyle: true,
                        banSnapshotShortcut: true,
                        snapshotShortcut: ['Ctrl', 'Alt', 'a'],
                        msgClickedAction: 'focus',
                    };
                }
                this.notificationLock = (yield StorageArea.get('notificationLock'));
                // const versionCheck = (await StorageArea.get('versionCheck') as boolean | null)
                // if (typeof versionCheck !== 'boolean') this.versionCheck = true
                // else this.versionCheck = versionCheck
            });
        },
        saveSettings() {
            // 禁止全局样式
            this.settings.banGlobalStyle = true;
            // 禁止截图快捷键（截图现在太粗糙了，等稍微做好点在放出来，但保留了手动按钮）
            this.settings.banSnapshotShortcut = true;
            // if (!this.settings.banSnapshotShortcut && this.settings.snapshotShortcut.length <= 0) {
            //     this.genBubbleMsg('设置未保存')
            //     setTimeout(() => this.genBubbleMsg('截图快捷键不是一个合法值'), 300)
            //     setTimeout(() => this.genBubbleMsg('如无需使用快捷键，建议直接禁用'), 600)
            //     return
            // }
            StorageArea.set({ settings: this.settings });
            StorageArea.set({ notificationLock: this.notificationLock });
            // StorageArea.set({versionCheck: this.versionCheck})
            // if (this.versionCheck) chrome.runtime.sendMessage({versionCheck: true})
            this.genBubbleMsg('设置已保存');
        },
        cancelSettings() {
            this.syncData();
        },
        genBubbleMsg(msg) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble-EvinK');
            const bubbleChild = document.createElement('p');
            bubble.appendChild(bubbleChild);
            this.bubbleWin.appendChild(bubble);
            setTimeout(() => {
                bubble.remove();
            }, 5000);
            const bubbleOnClass = 'bubble-on';
            const bubbleLength = this.bubbleWin.querySelectorAll(`.${bubbleOnClass}`).length;
            bubble.style.top = `${bubbleLength * 65}px`;
            bubbleChild.innerText = `通知: ${msg}`;
            bubble.classList.add(bubbleOnClass);
        },
        setSnapshotShortcut(e) {
            if (this.settings.banSnapshotShortcut)
                return;
            this.settings.snapshotShortcut = [];
            // tslint:disable-next-line:no-shadowed-variable
            e.target.onkeydown = (e) => {
                e.preventDefault();
                if (!e.key.trim())
                    return;
                if (this.settings.snapshotShortcut.indexOf(e.key.trim()) >= 0)
                    return;
                this.settings.snapshotShortcut.push(e.key.trim());
            };
        },
    },
    mounted() {
        return __awaiter(this, void 0, void 0, function* () {
            this.syncData();
            this.bubbleWin.id = 'bubbleWin-EvinK';
            document.body.appendChild(this.bubbleWin);
        });
    }
});
function fixBg() {
    const widht = document.body.clientWidth;
    const height = document.body.clientHeight;
    const WHRate = 3840 / 2160;
    if (widht / height > WHRate)
        document.body.style.backgroundSize = '100vw auto';
    else
        document.body.style.backgroundSize = 'auto 100vh';
}
fixBg();
window.onresize = () => {
    fixBg();
};
