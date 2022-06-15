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
function sendMessage(msg, cb) {
    return new Promise((resolve) => MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'sendMessage', msg, cb }));
}
function getManifestData() {
    return new Promise((resolve, reject) => {
        const id = MessageHub.getMsgId();
        MessageHub.sendMessage(id, { fn: 'getManifestData' }, (data) => {
            resolve(data.data);
        });
    });
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
            this.fullScreen = true;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: true });
            sendMessage({ fullScreen: true });
        },
        offFullScreen() {
            this.fullScreen = false;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: false });
            sendMessage({ fullScreen: false });
        },
        keepLoginStatus() {
            this.loginStatusPersistence = true;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: true });
            sendMessage({ bubble: '设置完成' });
            sendMessage({ checkLSPStatus: true });
        },
        notKeepLoginStatus() {
            this.loginStatusPersistence = false;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: false });
            sendMessage({ bubble: '设置完成，下次重新登陆后将生效' });
        },
        clickMenu() {
            this.menuOn = !this.menuOn;
            this.menuClicked = true;
        },
        snapshot() {
            // 截图 (当前网页)
            // return chrome.tabs.captureVisibleTab(null, {}, function (image) {
            //     sendMessage({ snapshot: image })
            // })
            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'snapshot' });
            // 录屏
            // const thisPage = await getCurrentPage()
            // chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], thisPage, (streamId) => {
            //     console.log(streamId)
            // })
        },
        openSettingPage() {
            // chrome.tabs.create({ url: chrome.extension.getURL('setting.html') })
            MessageHub.sendMessage(MessageHub.getMsgId(), { fn: 'openPage', url: "settings-wrapper.html" });
        },
        themeChanged() {
            sendMessage({ theme: this.theme });
            StorageArea.set({ theme: this.theme });
            if (this.theme === 'original')
                sendMessage({ bubble: '请刷新网页钉钉' });
        },
    },
    mounted() {
        return __awaiter(this, void 0, void 0, function* () {
            // const manifestData = chrome.runtime.getManifest()
            const manifestData = yield getManifestData();
            this.version = manifestData.version;
            this.fullScreen = (yield StorageArea.get('fullScreen')) || false;
            this.loginStatusPersistence = (yield StorageArea.get('loginStatusPersistence')) || false;
            const settings = yield StorageArea.get('settings');
            if (settings) {
                if (settings.banSnapshotShortcut)
                    this.snapshotShortcut = [];
                else
                    this.snapshotShortcut = settings.snapshotShortcut;
            }
            this.theme = (yield StorageArea.get('theme')) || 'original';
        });
    }
});
